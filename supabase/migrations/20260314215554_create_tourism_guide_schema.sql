/*
  # Karystos Tourism Guide Database Schema

  ## Overview
  Complete database schema for a comprehensive tourism guide application for Karystos, Greece.
  Includes beaches, restaurants, accommodations, events, attractions, and user favorites.

  ## New Tables

  ### 1. `beaches`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Beach name
  - `description` (text) - Detailed description
  - `image_url` (text) - Photo URL
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `wind_exposure` (text) - Wind exposure level (sheltered/moderate/exposed)
  - `amenities` (text array) - Available facilities (parking, showers, etc.)
  - `beach_type` (text) - Type (sandy/pebble/rocky)
  - `accessibility` (text) - Accessibility info
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `restaurants`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Restaurant name
  - `description` (text) - Description
  - `cuisine_type` (text) - Type of cuisine
  - `image_url` (text) - Photo URL
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `phone` (text) - Contact phone
  - `website` (text) - Website URL
  - `price_range` (text) - Price indicator (€/€€/€€€)
  - `opening_hours` (jsonb) - Operating hours by day
  - `specialties` (text array) - Signature dishes
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `accommodations`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Property name
  - `description` (text) - Description
  - `type` (text) - Type (hotel/villa/apartment/guesthouse)
  - `image_url` (text) - Photo URL
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `website` (text) - Booking website
  - `amenities` (text array) - Available amenities
  - `price_range` (text) - Price indicator
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `events`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Event name
  - `description` (text) - Event description
  - `image_url` (text) - Event photo URL
  - `start_date` (timestamptz) - Start date and time
  - `end_date` (timestamptz) - End date and time
  - `location` (text) - Event location
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `category` (text) - Category (festival/concert/cultural/sport)
  - `price` (text) - Entry price or "free"
  - `organizer` (text) - Event organizer
  - `contact` (text) - Contact information
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. `attractions`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Attraction name
  - `description` (text) - Description
  - `category` (text) - Category (historical/natural/cultural/dragon_house)
  - `image_url` (text) - Photo URL
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `visiting_hours` (text) - Operating hours
  - `entry_fee` (text) - Entry price
  - `accessibility` (text) - Accessibility info
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 6. `weather_data`
  - `id` (uuid, primary key) - Unique identifier
  - `date` (date) - Weather date
  - `temperature_high` (numeric) - High temperature (°C)
  - `temperature_low` (numeric) - Low temperature (°C)
  - `wind_speed` (numeric) - Wind speed (km/h)
  - `wind_direction` (text) - Wind direction
  - `conditions` (text) - Weather conditions
  - `precipitation` (numeric) - Precipitation (mm)
  - `created_at` (timestamptz) - Creation timestamp

  ### 7. `favorites`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - User who favorited (references auth.users)
  - `item_type` (text) - Type (beach/restaurant/accommodation/event/attraction)
  - `item_id` (uuid) - ID of favorited item
  - `created_at` (timestamptz) - When favorited

  ### 8. `useful_contacts`
  - `id` (uuid, primary key) - Unique identifier
  - `category` (text) - Category (emergency/medical/transport/tourist_info)
  - `name` (text) - Contact name
  - `phone` (text) - Phone number
  - `address` (text) - Physical address
  - `description` (text) - Additional info
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for all content tables
  - Authenticated users can manage their own favorites
  - Admin-only write access for content tables (future implementation)

  ## Notes
  1. All location-based data includes latitude/longitude for map integration
  2. JSONB used for flexible data like opening hours
  3. Arrays used for multi-value fields like amenities
  4. Weather data table prepared for future API integration
  5. Favorites table supports multi-type favoriting with item_type discriminator
*/

-- Create beaches table
CREATE TABLE IF NOT EXISTS beaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  wind_exposure text CHECK (wind_exposure IN ('sheltered', 'moderate', 'exposed')),
  amenities text[] DEFAULT '{}',
  beach_type text,
  accessibility text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  cuisine_type text DEFAULT '',
  image_url text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  phone text DEFAULT '',
  website text DEFAULT '',
  price_range text CHECK (price_range IN ('€', '€€', '€€€', '€€€€')),
  opening_hours jsonb,
  specialties text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  type text CHECK (type IN ('hotel', 'villa', 'apartment', 'guesthouse', 'resort')),
  image_url text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  phone text DEFAULT '',
  email text DEFAULT '',
  website text DEFAULT '',
  amenities text[] DEFAULT '{}',
  price_range text CHECK (price_range IN ('€', '€€', '€€€', '€€€€')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text NOT NULL DEFAULT '',
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  category text CHECK (category IN ('festival', 'concert', 'cultural', 'sport', 'other')),
  price text DEFAULT 'free',
  organizer text DEFAULT '',
  contact text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attractions table
CREATE TABLE IF NOT EXISTS attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text CHECK (category IN ('historical', 'natural', 'cultural', 'dragon_house', 'other')),
  image_url text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  visiting_hours text DEFAULT '',
  entry_fee text DEFAULT 'free',
  accessibility text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create weather_data table
CREATE TABLE IF NOT EXISTS weather_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  temperature_high numeric(4, 1),
  temperature_low numeric(4, 1),
  wind_speed numeric(5, 1),
  wind_direction text,
  conditions text DEFAULT '',
  precipitation numeric(5, 1) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('beach', 'restaurant', 'accommodation', 'event', 'attraction')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Create useful_contacts table
CREATE TABLE IF NOT EXISTS useful_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('emergency', 'medical', 'transport', 'tourist_info', 'other')),
  name text NOT NULL,
  phone text NOT NULL,
  address text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_beaches_wind_exposure ON beaches(wind_exposure);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_accommodations_type ON accommodations(type);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);
CREATE INDEX IF NOT EXISTS idx_weather_date ON weather_data(date);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_item ON favorites(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_contacts_category ON useful_contacts(category);

-- Enable Row Level Security on all tables
ALTER TABLE beaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE useful_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for beaches (public read)
CREATE POLICY "Beaches are viewable by everyone"
  ON beaches FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for restaurants (public read)
CREATE POLICY "Restaurants are viewable by everyone"
  ON restaurants FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for accommodations (public read)
CREATE POLICY "Accommodations are viewable by everyone"
  ON accommodations FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for events (public read)
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for attractions (public read)
CREATE POLICY "Attractions are viewable by everyone"
  ON attractions FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for weather_data (public read)
CREATE POLICY "Weather data is viewable by everyone"
  ON weather_data FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for useful_contacts (public read)
CREATE POLICY "Useful contacts are viewable by everyone"
  ON useful_contacts FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for favorites (authenticated users manage their own)
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_beaches_updated_at BEFORE UPDATE ON beaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON accommodations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attractions_updated_at BEFORE UPDATE ON attractions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();