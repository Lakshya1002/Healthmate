
# 💊 HealthMate – Personal Medicine & Health Tracker

**HealthMate** is a simple and effective web application that allows users to log, track, and manage their daily medicines. It was built as part of my internship to demonstrate full-stack development using modern web technologies and database integration.

---

## 🚀 Features

- ✅ Add new medicines with name, dosage, method, schedule, and notes
- 📋 View a list of all saved medicines
- ✏️ Edit existing medicine entries
- 🗑️ Delete medicines from the tracker
- 🔗 Fully connected frontend, backend, and MySQL database

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React.js (Vite), CSS     |
| Backend     | Node.js, Express         |
| Database    | MySQL                    |
| API Testing | Postman / Thunder Client |
| Tools       | VS Code, nodemon         |

---

## 📁 Project Structure

```
healthmate/
├── backend/          # Node.js + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   └── server.js
├── frontend/         # React frontend (Vite)
│   ├── components/
│   ├── App.jsx
│   ├── api.js
│   └── main.jsx
├── database.sql      # MySQL table structure
├── .gitignore
└── README.md         # This file
```

---

## ⚙️ Getting Started

### 📌 Prerequisites

- Node.js & npm
- MySQL
- Git

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Update your `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=healthmate
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Visit your app at: `http://localhost:5173`

---

### 🛢️ Database Setup

Run the following SQL to create your table:

```sql
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
```

---

## 🔮 Future Enhancements

- 🔔 Reminders for medication timing
- 🗓️ Calendar view for schedules
- 🧠 Symptom & health logs
- 👤 User login & authentication (multi-user support)
- 📊 Health analytics dashboard

---

## 📷 Screenshots (Optional)

> Add screenshots here once uploaded in a `/screenshots` folder.

---

## 🧑‍💻 Author

**Lakshya Sabharwal**  
Internship Project – 2025  
_“Built with React, Node.js, MySQL — and a lot of learning!”_

---

## 📬 Contact / Feedback

Open an issue or reach out directly if you’d like to contribute or discuss the project!
