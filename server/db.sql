-- ตารางผู้ใช้
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มบัญชีแอดมิน
INSERT INTO users (username, email, password, role)
VALUES (
  'admin',
  'admin@example.com',
  '$2b$10$wQw4Qw4Qw4Qw4Qw4Qw4QwOQw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4', -- hash ของ admin123
  'admin'
);

-- เพิ่มบัญชีผู้ใช้ทั่วไป
INSERT INTO users (username, email, password, role)
VALUES (
  'user1',
  'user1@example.com',
  '$2b$10$wQw4Qw4Qw4Qw4Qw4Qw4QwOQw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4Qw4', -- hash ของ user123
  'user'
);

-- ตารางคอร์ส
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  discounted_price REAL,
  author_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- ตารางบทเรียน
CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- ตารางสินค้า
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ตารางออเดอร์
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  address TEXT,
  shipping_method VARCHAR(50),
  total_price REAL NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ตารางรายการสินค้าในออเดอร์
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER,
  course_id INTEGER,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- ตารางการชำระเงิน
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  payment_method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  paid_at DATETIME,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ตารางการลงทะเบียนเรียน
CREATE TABLE IF NOT EXISTS enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- ตารางที่อยู่ (ถ้าต้องการ)
CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(20),
  country VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ตาราง categories (หมวดหมู่)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL
);

-- ตาราง products_categories (ความสัมพันธ์สินค้า-หมวดหมู่)
CREATE TABLE IF NOT EXISTS products_categories (
  product_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ตาราง courses_categories (ความสัมพันธ์คอร์ส-หมวดหมู่)
CREATE TABLE IF NOT EXISTS courses_categories (
  course_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);