-- ✅ STEP 1: Create the database
CREATE DATABASE IF NOT EXISTS healthmate;
USE healthmate;

-- ✅ STEP 2: Create medicines table
CREATE TABLE medicines (
  medicine_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50),
  method ENUM('pill', 'syrup', 'tablet', 'injection') DEFAULT 'pill',
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ STEP 3: Create schedules table
CREATE TABLE schedules (
  schedule_id INT PRIMARY KEY AUTO_INCREMENT,
  medicine_id INT,
  intake_time TIME,
  frequency ENUM('daily', 'alternate', 'custom') DEFAULT 'daily',
  day_of_week VARCHAR(50), -- optional for custom plans like "Mon,Wed,Fri"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id) ON DELETE CASCADE
);

-- ✅ STEP 4: Create health_logs table
CREATE TABLE health_logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  log_date DATE UNIQUE,
  blood_pressure VARCHAR(20),
  heart_rate INT,
  temperature DECIMAL(4,1),
  weight DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ STEP 5: Create notes table
CREATE TABLE notes (
  note_id INT PRIMARY KEY AUTO_INCREMENT,
  note_date DATE UNIQUE,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SHOW TABLES;
DESCRIBE medicines;
DESCRIBE schedules;
DESCRIBE health_logs;
DESCRIBE notes;
