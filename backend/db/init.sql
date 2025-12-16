-- backend/db/init.sql
-- Basic schema for cities, hotels, users (light), bookings.

BEGIN;

-- cities
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- users (light for future)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  phone TEXT,
  password_hash TEXT,
  name TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- hotels
CREATE TABLE IF NOT EXISTS hotels (
  id SERIAL PRIMARY KEY,
  city_slug TEXT NOT NULL,          -- use slug for simple join
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  rating NUMERIC(2,1),
  images TEXT[],                    -- array of image paths/URLs
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hotels_city_slug ON hotels(city_slug);

-- safaris (minimal)
CREATE TABLE IF NOT EXISTS safaris (
  id SERIAL PRIMARY KEY,
  city_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  duration TEXT,
  price INTEGER,
  description TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  booking_type TEXT NOT NULL, -- 'hotel' or 'safari'
  item_id INTEGER NOT NULL,   -- id of hotel/safari
  start_date DATE,
  end_date DATE,
  guests INTEGER DEFAULT 1,
  total_amount INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);

-- seed cities
INSERT INTO cities (name, slug)
  VALUES
    ('Jodhpur','jodhpur'),
    ('Jawai','jawai'),
    ('Udaipur','udaipur')
  ON CONFLICT (slug) DO NOTHING;

-- seed hotels
INSERT INTO hotels (city_slug, name, slug, description, price, rating, images)
VALUES
  ('jodhpur','Blue City Lodge','blue-city-lodge','Cozy place in the blue city',2500,4.4, ARRAY['/images/jodhpur-1.jpg']),
  ('jodhpur','Mehrangarh View Hotel','mehrangarh-view-hotel','Amazing fort views',4200,4.7, ARRAY['/images/jodhpur-2.jpg']),
  ('jawai','Jawai Leopard Camp','jawai-leopard-camp','Safari camp near Jawai',6000,4.9, ARRAY['/images/jawai-1.jpg']),
  ('udaipur','Lakefront Palace','lakefront-palace','Luxury by the lake',5500,4.8, ARRAY['/images/udaipur-1.jpg'])
ON CONFLICT DO NOTHING;
INSERT INTO safaris (city_slug, name, duration, price, description, images)
VALUES
  ('jawai', 'Morning Leopard Safari', '3 Hours', 4500, 'Experience the thrill of tracking leopards in the wild rocky hills of Jawai.', ARRAY['/images/safari-1.jpg']),
  ('jawai', 'Sunset Dam Safari', '2.5 Hours', 3500, 'Relaxing drive around the Jawai Dam with bird watching and high tea.', ARRAY['/images/safari-2.jpg']),
  ('jodhpur', 'Bishnoi Village Safari', '4 Hours', 3000, 'Cultural tour visiting the eco-friendly Bishnoi community and spotting blackbucks.', ARRAY['/images/safari-3.jpg'])
ON CONFLICT DO NOTHING;
COMMIT;