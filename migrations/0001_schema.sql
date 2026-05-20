CREATE TABLE IF NOT EXISTS schedule (
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  runtime INTEGER DEFAULT 0,
  item_code TEXT NOT NULL,
  name TEXT,
  main INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 0,
  img TEXT,
  img_list TEXT,
  url TEXT,
  detail_url TEXT,
  m_url TEXT,
  m_detail_url TEXT,
  shopping_host TEXT,
  event_type TEXT,
  event_period TEXT,
  orgin_price REAL DEFAULT 0,
  price REAL DEFAULT 0,
  discount_rate REAL DEFAULT 0,
  free_shipping INTEGER DEFAULT 0,
  cards TEXT,
  month INTEGER DEFAULT 0,
  category1 TEXT,
  category2 TEXT,
  category3 TEXT,
  category4 TEXT,
  soldout INTEGER DEFAULT 0,
  is_sale INTEGER DEFAULT 0,
  is_live_sale INTEGER DEFAULT 0,
  live_product TEXT,
  views INTEGER DEFAULT 0,
  PRIMARY KEY (date, start_time, item_code)
);

CREATE INDEX IF NOT EXISTS idx_schedule_date_time ON schedule(date, start_time, priority);
CREATE INDEX IF NOT EXISTS idx_schedule_item ON schedule(item_code);
CREATE INDEX IF NOT EXISTS idx_schedule_views ON schedule(views DESC);

CREATE TABLE IF NOT EXISTS channels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region_group TEXT NOT NULL,
  area TEXT NOT NULL,
  analog_channel TEXT,
  digital_channel TEXT,
  operator TEXT NOT NULL
);
