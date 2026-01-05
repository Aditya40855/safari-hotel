require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sharp = require('sharp'); 
const compression = require('compression');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const { 
  sendNotification, 
  generateBookingEmail, // Add this here
  generateWelcomeEmail,
  generateFinalConfirmationEmail
} = require('./services/mailer');

// backend is updating automatic done haha


const db = require("./db"); 

const app = express();
app.use(cors({
  origin: [
    'https://jawaiunfiltered.com', 
    'https://www.jawaiunfiltered.com', 
    'http://localhost:5173'
  ],
  // Add PATCH to this array explicitly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(compression()); 

// Update your options handler as well to be safe
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    // Ensure PATCH is included here
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});// Forces the "HTTP OK" status browsers need


// Add this IMMEDIATELY after the cors middleware above
// This specifically handles the "Preflight" check that was failing
app.options('*', cors());
app.use(express.json());

// --- SITEMAP ROUTE ADDED HERE ---
app.use(require('./routes/sitemap'));

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// --- MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
  }
});
const upload = multer({ storage: storage });

function slugify(text = "") {
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"); 
}

// --- DB MIGRATION CHECK ---
async function ensureSchema() {
  console.log("🔧 Checking Database Schema...");
  try {
    // 1. Check Bookings Table Columns
    const bookingCols = [
      { name: "user_id", type: "INTEGER REFERENCES users(id)" },
      { name: "contact", type: "TEXT" },
      { name: "name", type: "TEXT" }, 
      { name: "email", type: "TEXT" },
      { name: "status", type: "TEXT DEFAULT 'pending'" },
      { name: "time_slot", type: "TEXT" }
    ];
    for (const col of bookingCols) {
      const res = await db.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name='bookings' AND column_name=$1
      `, [col.name]);
      if (!res.rows || res.rows.length === 0) {
        console.log(`⚠️ Missing column '${col.name}' in bookings. Adding it...`);
        await db.query(`ALTER TABLE bookings ADD COLUMN ${col.name} ${col.type}`);
        console.log(`✅ Added '${col.name}'.`);
      }
    }

    // 2. Check Reviews Table
    const reviewsCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'reviews'
      )
    `);
    if (!reviewsCheck.rows[0].exists) {
      console.log("⚠️ Table 'reviews' missing. Creating it...");
      await db.query(`
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          item_id INTEGER NOT NULL,
          item_type TEXT NOT NULL,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          images TEXT[],
          created_at TIMESTAMP DEFAULT now()
        )
      `);
      console.log("✅ Created 'reviews' table.");
    }

    console.log("✅ Database Schema check complete.");
  } catch (err) {
    console.error("❌ DB Migration check failed:", err);
  }
}
ensureSchema();

// --- MIDDLEWARE ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user; 
    next();
  });
}


function requireAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user && req.user.isAdmin) next();
    else res.status(403).json({ error: "Access denied. Admins only." });
  });
}

// --- ROUTES ---

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.post("/api/upload", upload.single("photo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const originalPath = req.file.path;
    // We create a new filename ending in .webp
    const webpFilename = `opt-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const outputPath = path.join(UPLOAD_DIR, webpFilename);

    // Process: Resize to 1200px max width, convert to WebP at 80% quality
    await sharp(originalPath)
      .resize(1200, null, { withoutEnlargement: true }) 
      .webp({ quality: 80 }) 
      .toFile(outputPath);

    // IMPORTANT: Delete the original heavy file to save server space
    if (fs.existsSync(originalPath)) {
      fs.unlinkSync(originalPath);
    }

    // Return the new optimized URL to the admin panel
    res.json({ url: `/uploads/${webpFilename}` });
  } catch (err) {
    console.error("❌ Image optimization failed:", err);
    res.status(500).json({ error: "Failed to process image" });
  }
});
// This route specifically handles the /api link to show all available endpoints
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the Jawai Unfiltered API",
    available_endpoints: {
      hotels: "/api/hotels",
      safaris: "/api/safaris",
      cities: "/api/cities",
      health_check: "/health"
    }
  });
});
// Auth
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user exists... (Keep your existing check logic)
    const hash = await bcrypt.hash(password, 10);
    const r = await db.query(
        "INSERT INTO users (name, email, phone, password_hash, is_admin) VALUES ($1, $2, $3, $4, false) RETURNING id, name, email",
        [name, email, phone, hash]
    );
    
    const user = r.rows[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    // --- NEW EMAIL LOGIC ---
    try {
      const welcomeHtml = generateWelcomeEmail(user.name);
      // We use 'await' to ensure Resend accepts the mail
      await sendNotification(user.email, "Welcome to Jawai Unfiltered", welcomeHtml);
    } catch (mailErr) {
      console.error("Welcome email failed but signup succeeded:", mailErr.message);
    }

    res.status(201).json({ user, token });
  } catch (err) { 
    res.status(500).json({ error: "Signup failed" }); 
  }
});
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (r.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });
    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: "7d" });
    delete user.password_hash;
    res.json({ user, token });
  } catch (err) { res.status(500).json({ error: "Login failed" }); }
});

// Data
app.get("/api/cities", async (req, res) => {
  const r = await db.query("SELECT name, slug FROM cities ORDER BY name");
  res.json(r.rows);
});


// --- HOTELS (Smart Route: ID or Slug) ---
app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();
    
    // 1. Define a unique key for this specific request
    const cacheKey = `hotels_${city || 'all'}`;
    
    // 2. Check if we already have this data in memory
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
      console.log(`⚡ Serving HOTELS from Cache for: ${city || 'all'}`);
      return res.json(cachedData); // Return instantly
    }

    // 3. If NOT in cache, run the database query
    console.log(`🔎 Cache Miss. Fetching from DB for: '${city}'`);
    let q = "SELECT * FROM hotels"; 
    const params = [];
    if (city) {
      q += " WHERE LOWER(city_slug) = $1";
      params.push(city);
    }
    q += " ORDER BY created_at DESC"; 
    
    const r = await db.query(q, params);
    
    // 4. Save the result in cache for future requests
    myCache.set(cacheKey, r.rows); 
    console.log(`✅ Cached ${r.rows.length} HOTELS.`);
    
    res.json(r.rows);
  } catch (err) {
    console.error("❌ ERROR FETCHING HOTELS:", err);
    res.status(500).json({ error: "db error" });
  }
});
// ✅ UPDATED: Get Hotel by ID OR Slug
app.get("/api/hotels/:identifier", async (req, res) => {
  const { identifier } = req.params;
  let q, param;

  // If identifier is a number, assume ID. Otherwise, assume Slug.
  if (!isNaN(identifier)) {
    q = "SELECT * FROM hotels WHERE id = $1";
    param = identifier;
  } else {
    q = "SELECT * FROM hotels WHERE slug = $1";
    param = identifier;
  }

  try {
    const r = await db.query(q, [param]);
    if (!r.rows.length) return res.status(404).json({ error: "Hotel not found" });
    res.json(r.rows[0]);
  } catch (err) {
    console.error("Error fetching hotel:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// --- SAFARIS (Smart Route: ID or Slug) ---
app.get("/api/safaris", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();
    
    // 1. Create a unique cache key for safaris
    const cacheKey = `safaris_${city || 'all'}`;
    
    // 2. Try to get data from memory
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
      console.log(`⚡ Serving SAFARIS from Cache for: ${city || 'all'}`);
      return res.json(cachedData); 
    }

    // 3. Cache miss - Query the database
    console.log(`🔎 Cache Miss. Fetching SAFARIS from DB for: '${city}'`);
    let q = "SELECT * FROM safaris";
    const params = [];
    if (city) { 
      q += " WHERE LOWER(city_slug) = $1"; 
      params.push(city); 
    }
    q += " ORDER BY name";

    const r = await db.query(q, params);
    
    // 4. Save to cache for 10 minutes
    myCache.set(cacheKey, r.rows); 
    
    res.json(r.rows);
  } catch (err) {
    console.error("❌ SAFARI FETCH ERROR:", err);
    res.status(500).json({ error: "db error" });
  }
});

// ✅ UPDATED: Get Safari by ID OR Slug
app.get("/api/safaris/:identifier", async (req, res) => {
  const { identifier } = req.params;
  let q, param;

  if (!isNaN(identifier)) {
    q = "SELECT * FROM safaris WHERE id = $1";
    param = identifier;
  } else {
    // Note: This assumes you added a 'slug' column to your safaris table!
    q = "SELECT * FROM safaris WHERE slug = $1";
    param = identifier;
  }

  try {
    const r = await db.query(q, [param]);
    if (!r.rows.length) return res.status(404).json({ error: "Safari not found" });
    res.json(r.rows[0]);
  } catch (err) {
    console.error("Error fetching safari:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Bookings
app.get("/api/bookings", authenticateToken, async (req, res) => {
  try {
    // We select ALL columns (including user_type)
    let q = "SELECT * FROM bookings";
    let params = [];

    // Security Logic: Admins see everything, users see only theirs
    if (!req.user.isAdmin) {
      q += " WHERE user_id = $1";
      params.push(req.user.id);
    }

    q += " ORDER BY created_at DESC";

    const r = await db.query(q, params);
    
    // Each row now contains 'user_type' ('guest' or 'member')
    res.json(r.rows);
  } catch (err) { 
    console.error("Fetch bookings error:", err);
    res.status(500).json({ error: "db error" }); 
  }
});

// --- UPDATED BOOKING ROUTE (Allows Guest Bookings) ---
app.post("/api/bookings", async (req, res) => {
  try {
    let userId = null;
    let userEmail = null;
    let userName = null;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
            const userLookup = await db.query("SELECT email, name FROM users WHERE id = $1", [userId]);
            if (userLookup.rows.length > 0) {
                userEmail = userLookup.rows[0].email;
                userName = userLookup.rows[0].name;
            }
        } catch (e) { /* Guest fallback */ }
    }

    const { booking_type, item_id, start_date, end_date, guests, contact, name, email, time_slot } = req.body;
    
    const finalEmail = email || userEmail;
    const finalName = name || userName;

    if (!booking_type || !item_id || !start_date || !finalEmail) {
        return res.status(400).json({ error: "Missing required fields: Email is mandatory." });
    }

    const userType = userId ? 'member' : 'guest';

    const q = `
      INSERT INTO bookings 
      (booking_type, item_id, start_date, end_date, guests, contact, name, email, status, user_id, time_slot, created_at, user_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9, $10, now(), $11)
      RETURNING *
    `;
    const values = [
      booking_type, item_id, start_date, end_date, guests || 1, 
      contact, finalName, finalEmail, userId, time_slot || null,
      userType 
    ];

    const r = await db.query(q, values);
    const booking = r.rows[0];

    // --- ENHANCED PRODUCTION MAILER LOGIC ---
    if (finalEmail) {
        try {
            const subject = `Booking Request Received: ${booking_type.toUpperCase()}`;
            const emailHtml = generateBookingEmail(finalName, booking_type, start_date, contact, guests || 1);

            // 1. Mandatory await for User Email
            const userMailSent = await sendNotification(finalEmail, subject, emailHtml);
            if (userMailSent) console.log(`✅ User notification dispatched to ${finalEmail}`);

            // 2. Mandatory await for Admin Alert
            const adminAlertBody = `
                <h3>New Booking Alert</h3>
                <p><b>Name:</b> ${finalName}</p>
                <p><b>Email:</b> ${finalEmail}</p>
                <p><b>Type:</b> ${booking_type}</p>
                <p><b>Platform:</b> Deployed Web</p>
            `;
            await sendNotification("info@jawaiunfiltered.com", "ADMIN ALERT: NEW BOOKING", adminAlertBody);
            console.log(`✅ Admin alert dispatched to info@jawaiunfiltered.com`);

        } catch (mailError) {
            // Logs to stderr.log in cPanel
            console.error("❌ PRODUCTION MAILER ERROR:", mailError.message);
        }
    }

    // Response is sent ONLY after the mail functions are awaited
    res.status(201).json(booking);

  } catch (err) {
    console.error("❌ CRITICAL BOOKING ERROR:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});
app.patch("/api/bookings/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body; 
    const bookingId = req.params.id;

    // 1. Update status in DB and return all columns
    const r = await db.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *", 
      [status, bookingId]
    );
    
    if (!r.rows.length) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = r.rows[0];

    // 2. Trigger Email if status is 'confirmed'
    if (status === 'confirmed' && booking.email) {
      try {
        const formattedDate = new Date(booking.start_date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Use the new function from your mailer.js
        const emailHtml = generateFinalConfirmationEmail(
          booking.name, 
          booking.booking_type, 
          formattedDate, 
          booking.guests, 
          booking.price || 'Amount Pending' // Ensure price column exists or use fallback
        );

        await sendNotification(
          booking.email, 
          `CONFIRMED: Your ${booking.booking_type.toUpperCase()} at Jawai`, 
          emailHtml
        );
        
        console.log(`✅ Final confirmation email sent to ${booking.email}`);
      } catch (mailError) {
        console.error("❌ Confirmation mailer failed:", mailError.message);
      }
    }

    res.json(booking);
  } catch (err) { 
    console.error("ADMIN PATCH ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});
app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
  try {
    let q = "DELETE FROM bookings WHERE id = $1";
    const params = [req.params.id];
    if (!req.user.isAdmin) {
      q += " AND user_id = $2";
      params.push(req.user.id);
    }
    q += " RETURNING *";
    const r = await db.query(q, params);
    if (!r.rows.length) return res.status(404).json({ error: "Booking not found" });
    res.json({ success: true, deleted: r.rows[0] });
  } catch (err) { res.status(500).json({ error: "db error" }); }
});

// --- REVIEWS ENDPOINTS ---
app.get("/api/reviews", async (req, res) => {
  try {
    const { type, itemId } = req.query;
    if (!type || !itemId) return res.status(400).json({ error: "type and itemId required" });

    const q = `
      SELECT r.*, u.name as user_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.item_type = $1 AND r.item_id = $2 
      ORDER BY r.created_at DESC
    `;
    const r = await db.query(q, [type, itemId]);
    res.json(r.rows);
  } catch (err) {
    console.error("Get reviews error", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/reviews", authenticateToken, async (req, res) => {
  try {
    const { item_type, item_id, rating, comment, images } = req.body;
    if (!item_type || !item_id || !rating) return res.status(400).json({ error: "Missing required fields" });

    let imgs = Array.isArray(images) ? images : (images ? [images] : []);

    const q = `
      INSERT INTO reviews (user_id, item_type, item_id, rating, comment, images, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, now())
      RETURNING *
    `;
    const r = await db.query(q, [req.user.id, item_type, item_id, rating, comment, imgs]);
    
    const userRes = await db.query("SELECT name FROM users WHERE id = $1", [req.user.id]);
    const newReview = { ...r.rows[0], user_name: userRes.rows[0].name };

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Post review error", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Inventory
app.post("/api/admin/hotels", requireAdmin, async (req, res) => {
  try {
    const { name, city_slug, price, rating, images, description, slug } = req.body;
    let baseSlug = slug || slugify(name || "hotel") + "-" + Date.now();
    let imgs = Array.isArray(images) ? images : (images ? [images] : []);
    
    const q = `INSERT INTO hotels (name, slug, city_slug, description, price, rating, images, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7, now()) RETURNING *`;
    const r = await db.query(q, [name, baseSlug, city_slug, description, price, rating, imgs]);

    // --- CACHE CLEARING LOGIC ---
    myCache.flushAll(); // Clears hotel and safari lists
    console.log("🧹 Cache cleared: New Hotel added.");

    res.json(r.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/admin/safaris", requireAdmin, async (req, res) => {
  try {
   const { name, title, city_slug, price, duration, images, description } = req.body;
   let imgs = Array.isArray(images) ? images : (images ? [images] : []);
   
   const q = `INSERT INTO safaris (city_slug, name, duration, price, description, images, created_at) VALUES ($1,$2,$3,$4,$5,$6, now()) RETURNING *`;
   const r = await db.query(q, [city_slug, name||title, duration, price, description, imgs]);

   // --- CACHE CLEARING LOGIC ---
   myCache.flushAll(); //
   console.log("🧹 Cache cleared: New Safari added.");

   res.json(r.rows[0]);
  } catch(err) { res.status(500).json({ error: err.message }); }
});
// DELETE HOTEL
app.delete("/api/admin/hotels/:id", requireAdmin, async (req, res) => {
  try {
    // Optional: Delete related bookings first to prevent DB errors
    await db.query("DELETE FROM bookings WHERE item_id = $1 AND booking_type = 'hotel'", [req.params.id]);
    await db.query("DELETE FROM reviews WHERE item_id = $1 AND item_type = 'hotel'", [req.params.id]);
    
    const r = await db.query("DELETE FROM hotels WHERE id = $1 RETURNING *", [req.params.id]);
    res.json({ success: true, deleted: r.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE SAFARI
app.delete("/api/admin/safaris/:id", requireAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM bookings WHERE item_id = $1 AND booking_type = 'safari'", [req.params.id]);
    await db.query("DELETE FROM reviews WHERE item_id = $1 AND item_type = 'safari'", [req.params.id]);

    const r = await db.query("DELETE FROM safaris WHERE id = $1 RETURNING *", [req.params.id]);
    res.json({ success: true, deleted: r.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use("/uploads", express.static(UPLOAD_DIR));
// 1. Handle 404 - When a user visits a link that doesn't exist
app.use((req, res) => {
  console.error(`❌ 404 Error: User tried to access ${req.originalUrl}`);
  res.status(404).json({
    error: "Route not found",
    requested_url: req.originalUrl,
    suggestion: "Check /api/hotels or /api/safaris"
  });
});


// 2. Global Error Handler - Catch database or code crashes
app.use((err, req, res, next) => {
  console.error("❌ INTERNAL SERVER ERROR:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// --- CRITICAL UPDATED LISTEN BLOCK ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on assigned port ${PORT}`));
// ukjbdkbkbkb  dihlhiud  ndiuuhodhweod  diuodewjqd   ohiduheodh  o ihdhiedhuoih