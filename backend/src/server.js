require('dotenv').config();
process.env.UNDICI_NO_WASM = '1'; // Memory optimization for shared hosting
//everthing is updating
// is server updating ?
// one last test for server
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
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 30 });
const { 
  sendNotification, 
  generateBookingEmail, 
  generateWelcomeEmail,
  generateFinalConfirmationEmail
} = require('./services/mailer');

const db = require("./db"); 

const app = express();
app.use(cors({
  origin: [
    'https://jawaiunfiltered.com', 
    'https://www.jawaiunfiltered.com', 
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(compression()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

app.options('*', cors());
app.use(express.json());

app.use(require('./routes/sitemap'));

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

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
async function generateUniqueSlug(table, title) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const [rows] = await db.pool.execute(
      `SELECT id FROM ${table} WHERE slug = ? LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
function normalizeImages(row) {
  if (!row) return row;

  if (!row.images) {
    row.images = [];
    return row;
  }

  if (typeof row.images === "string") {
    try {
      row.images = JSON.parse(row.images);
    } catch {
      row.images = [];
    }
  }

  return row;
}

// --- DB MIGRATION CHECK (MYSQL COMPATIBLE) ---
async function ensureSchema() {
  console.log("🔧 Checking Database Schema...");
  try {
    const bookingCols = [
      { name: "user_id", type: "INT" },
      { name: "contact", type: "TEXT" },
      { name: "name", type: "TEXT" }, 
      { name: "email", type: "TEXT" },
      { name: "status", type: "VARCHAR(50) DEFAULT 'pending'" },
      { name: "time_slot", type: "TEXT" }
    ];
    for (const col of bookingCols) {
      const res = await db.query(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME='bookings' AND COLUMN_NAME=? AND TABLE_SCHEMA=DATABASE()
      `, [col.name]);
      if (res.rows.length === 0) {
        console.log(`⚠️ Missing column '${col.name}' in bookings. Adding it...`);
        await db.query(`ALTER TABLE bookings ADD COLUMN ${col.name} ${col.type}`);
        console.log(`✅ Added '${col.name}'.`);
      }
    }

    const [reviewsCheck] = await db.pool.execute(`SHOW TABLES LIKE 'reviews'`);
    if (reviewsCheck.length === 0) {
      console.log("⚠️ Table 'reviews' missing. Creating it...");
      await db.query(`
        CREATE TABLE reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          item_id INT NOT NULL,
          item_type VARCHAR(50) NOT NULL,
          rating INT,
          comment TEXT,
          images JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Created 'reviews' table.");
    }

    console.log("✅ Database Schema check complete.");
  } catch (err) {
    console.error("❌ DB Migration check failed:", err.message);
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
    const webpFilename = `opt-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const outputPath = path.join(UPLOAD_DIR, webpFilename);
    await sharp(originalPath)
      .resize(1200, null, { withoutEnlargement: true }) 
      .webp({ quality: 80 }) 
      .toFile(outputPath);
    if (fs.existsSync(originalPath)) fs.unlinkSync(originalPath);
    res.json({ url: `/uploads/${webpFilename}` });
  } catch (err) {
    console.error("❌ Image optimization failed:", err);
    res.status(500).json({ error: "Failed to process image" });
  }
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the Jawai Unfiltered API",
    available_endpoints: { hotels: "/api/hotels", safaris: "/api/safaris", cities: "/api/cities" }
  });
});

// --- AUTH ---
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const r = await db.query(
        "INSERT INTO users (name, email, phone, password_hash, is_admin) VALUES (?, ?, ?, ?, false)",
        [name, email, phone, hash]
    );
    const userId = r.rows.insertId;
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
    try {
      const welcomeHtml = generateWelcomeEmail(name);
      await sendNotification(email, "Welcome to Jawai Unfiltered", welcomeHtml);
    } catch (mailErr) { console.error("Welcome email failed:", mailErr.message); }
    res.status(201).json({ user: { id: userId, name, email }, token });
  } catch (err) { res.status(500).json({ error: "Signup failed" }); }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (r.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });
    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, JWT_SECRET, { expiresIn: "7d" });
    delete user.password_hash;
    res.json({ user, token });
  } catch (err) { res.status(500).json({ error: "Login failed" }); }
});

// --- DATA ---
app.get("/api/cities", async (req, res) => {
  const r = await db.query("SELECT name, slug FROM cities ORDER BY name");
  res.json(r.rows);
});

app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();
    const cacheKey = `hotels_${city || "all"}`;

    const cachedData = myCache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

    let q = "SELECT * FROM hotels";
    const params = [];

    if (city) {
      q += " WHERE LOWER(city_slug) = ?";
      params.push(city);
    }

    q += " ORDER BY created_at DESC";

    const r = await db.query(q, params);

    const rows = r.rows.map(normalizeImages);

    myCache.set(cacheKey, rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db error" });
  }
});

app.get("/api/hotels/:identifier", async (req, res) => {
  const { identifier } = req.params;

  const q = isNaN(identifier)
    ? "SELECT * FROM hotels WHERE slug = ?"
    : "SELECT * FROM hotels WHERE id = ?";

  try {
    const r = await db.query(q, [identifier]);
    if (!r.rows.length) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const hotel = normalizeImages(r.rows[0]);
    res.json(hotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/safaris", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();
    const cacheKey = `safaris_${city || "all"}`;

    const cachedData = myCache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

    let q = "SELECT * FROM safaris";
    const params = [];

    if (city) {
      q += " WHERE LOWER(city_slug) = ?";
      params.push(city);
    }

    q += " ORDER BY name";

    const r = await db.query(q, params);

    const rows = r.rows.map(normalizeImages);

    myCache.set(cacheKey, rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db error" });
  }
});

app.get("/api/safaris/:identifier", async (req, res) => {
  const { identifier } = req.params;

  const q = isNaN(identifier)
    ? "SELECT * FROM safaris WHERE slug = ?"
    : "SELECT * FROM safaris WHERE id = ?";

  try {
    const r = await db.query(q, [identifier]);
    if (!r.rows.length) {
      return res.status(404).json({ error: "Safari not found" });
    }

    const safari = normalizeImages(r.rows[0]);
    res.json(safari);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
// ==========================================
// CACHE INVALIDATION HELPERS (IMPORTANT)
// ==========================================

function clearHotelCache() {
  myCache.keys().forEach((k) => {
    if (k.startsWith("hotels_")) myCache.del(k);
  });
}

function clearSafariCache() {
  myCache.keys().forEach((k) => {
    if (k.startsWith("safaris_")) myCache.del(k);
  });
}
// --- BOOKINGS ---
app.get("/api/bookings", authenticateToken, async (req, res) => {
  try {
    let q = "SELECT * FROM bookings";
    let params = [];
    if (!req.user.isAdmin) { q += " WHERE user_id = ?"; params.push(req.user.id); }
    q += " ORDER BY created_at DESC";
    const r = await db.query(q, params);
    res.json(r.rows);
  } catch (err) { res.status(500).json({ error: "db error" }); }
});

app.post("/api/bookings", async (req, res) => {
  try {
    let userId = null, userEmail = null, userName = null;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
            const userLookup = await db.query("SELECT email, name FROM users WHERE id = ?", [userId]);
            if (userLookup.rows.length > 0) {
                userEmail = userLookup.rows[0].email;
                userName = userLookup.rows[0].name;
            }
        } catch (e) {}
    }
    const { booking_type, item_id, start_date, end_date, guests, contact, name, email, time_slot } = req.body;
    const finalEmail = email || userEmail;
    const finalName = name || userName;
    if (!booking_type || !item_id || !start_date || !finalEmail) return res.status(400).json({ error: "Missing required fields" });
    
    const userType = userId ? 'member' : 'guest';
    const q = `
      INSERT INTO bookings 
      (booking_type, item_id, start_date, end_date, guests, contact, name, email, status, user_id, time_slot, created_at, user_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, NOW(), ?)
    `;
    const values = [booking_type, item_id, start_date, end_date, guests || 1, contact, finalName, finalEmail, userId, time_slot || null, userType];
    const r = await db.query(q, values);
    const bookingId = r.rows.insertId;

    if (finalEmail) {
        try {
            const subject = `Booking Request Received: ${booking_type.toUpperCase()}`;
            const emailHtml = generateBookingEmail(finalName, booking_type, start_date, contact, guests || 1);
            await sendNotification(finalEmail, subject, emailHtml);
            const adminAlert = `<h3>New Booking</h3><p><b>Name:</b> ${finalName}</p><p><b>Type:</b> ${booking_type}</p>`;
            await sendNotification("info@jawaiunfiltered.com", "ADMIN ALERT: NEW BOOKING", adminAlert);
        } catch (mailError) {}
    }
    res.status(201).json({ id: bookingId, ...req.body });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/bookings/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body; 
    const r = await db.query("UPDATE bookings SET status = ? WHERE id = ?", [status, req.params.id]);
    const check = await db.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: "Booking not found" });
    const booking = check.rows[0];
    if (status === 'confirmed' && booking.email) {
      try {
        const formattedDate = new Date(booking.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        const emailHtml = generateFinalConfirmationEmail(booking.name, booking.booking_type, formattedDate, booking.guests, booking.price || 'Amount Pending');
        await sendNotification(booking.email, `CONFIRMED: Your ${booking.booking_type.toUpperCase()}`, emailHtml);
      } catch (mailError) {}
    }
    res.json(booking);
  } catch (err) { res.status(500).json({ error: "Internal Server Error" }); }
});

app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
  try {
    const check = await db.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: "Booking not found" });
    if (!req.user.isAdmin && check.rows[0].user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });
    await db.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: "db error" }); }
});

// --- REVIEWS ---
app.get("/api/reviews", async (req, res) => {
  try {
    const { type, itemId } = req.query;

    const q = `
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.item_type = ? AND r.item_id = ?
      ORDER BY r.created_at DESC
    `;

    const r = await db.query(q, [type, itemId]);

    const rows = r.rows.map(normalizeImages);

    res.json(rows);
  } catch (err) {
    console.error("❌ Fetch reviews failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/reviews", authenticateToken, async (req, res) => {
  try {
    const { item_type, item_id, rating, comment, images } = req.body;

    const imgs = Array.isArray(images)
      ? JSON.stringify(images)
      : (images ? JSON.stringify([images]) : "[]");

    const q = `
      INSERT INTO reviews
      (user_id, item_type, item_id, rating, comment, images, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const r = await db.query(q, [
      req.user.id,
      item_type,
      item_id,
      rating,
      comment,
      imgs
    ]);

    // ✅ Return normalized response
    res.status(201).json({
      id: r.rows.insertId,
      user_id: req.user.id,
      item_type,
      item_id,
      rating,
      comment,
      images: JSON.parse(imgs),
      created_at: new Date()
    });

  } catch (err) {
    console.error("❌ Create review failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- ADMIN ---
app.post("/api/admin/hotels", requireAdmin, async (req, res) => {
  try {
    const { name, city_slug, price, rating, images, description, slug } = req.body;
    let baseSlug = slug || slugify(name || "hotel") + "-" + Date.now();
    let imgs = JSON.stringify(Array.isArray(images) ? images : (images ? [images] : []));
    const q = `INSERT INTO hotels (name, slug, city_slug, description, price, rating, images, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
    const r = await db.query(q, [name, baseSlug, city_slug, description, price, rating, imgs]);
   
    myCache.flushAll(); 
    res.json({
      id: r.rows.insertId,
      images: JSON.parse(imgs),
      ...req.body
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/admin/safaris", requireAdmin, async (req, res) => {
  try {
    const { name, title, city_slug, price, duration, images, description } = req.body;

    const finalTitle = title || name;
    if (!finalTitle) {
      return res.status(400).json({ error: "Safari title is required" });
    }

    // ✅ generate slug BEFORE insert
    const slug = await generateUniqueSlug("safaris", finalTitle);

    const imgs = JSON.stringify(
      Array.isArray(images) ? images : (images ? [images] : [])
    );

    const q = `
      INSERT INTO safaris
      (city_slug, name, slug, duration, price, description, images, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const r = await db.query(q, [
      city_slug,
      finalTitle,
      slug,
      duration,
      price,
      description,
      imgs
    ]);

    res.json({
      id: r.rows.insertId,
      slug,
      success: true
    });
    myCache.flushAll();

  } catch (err) {
    console.error("❌ Create safari failed:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/hotels/:id", requireAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM bookings WHERE item_id = ? AND booking_type = 'hotel'", [req.params.id]);
    await db.query("DELETE FROM reviews WHERE item_id = ? AND item_type = 'hotel'", [req.params.id]);
    await db.query("DELETE FROM hotels WHERE id = ?", [req.params.id]);

    myCache.flushAll(); // ✅ CRITICAL

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/safaris/:id", requireAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM bookings WHERE item_id = ? AND booking_type = 'safari'", [req.params.id]);
    await db.query("DELETE FROM reviews WHERE item_id = ? AND item_type = 'safari'", [req.params.id]);
    await db.query("DELETE FROM safaris WHERE id = ?", [req.params.id]);

    myCache.flushAll();

    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use(
  "/uploads",
  express.static(UPLOAD_DIR, {
    maxAge: "1h",
    etag: true
  })
);
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error("❌ INTERNAL SERVER ERROR:", err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on assigned port ${PORT}`));