require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*  AUTH */

/* REGISTER */
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err) => {
      if (err) {
        return res.json({ success: false, message: "User already exists" });
      }
      res.json({ success: true, message: "User registered" });
    }
  );
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

/* COLLEGES*/

/* GET ALL COLLEGES */
app.get("/colleges", (req, res) => {
  db.query("SELECT * FROM colleges", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/*  SAVED COLLEGES */

/* SAVE COLLEGE */
app.post("/save", (req, res) => {
  const { college_id } = req.body;

  db.query(
    "INSERT INTO saved_colleges (college_id) VALUES (?)",
    [college_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Saved successfully" });
    }
  );
});

/* GET SAVED COLLEGES */
app.get("/saved", (req, res) => {
  db.query(
    `SELECT c.* FROM colleges c
     JOIN saved_colleges s ON c.id = s.college_id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* REVIEWS */

/* ADD REVIEW (uses college_id now) */
app.post("/add-review", (req, res) => {
  const { email, college_id, review, rating } = req.body;

  if (!email || !college_id || !review || !rating) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    "INSERT INTO reviews (email, college_id, review, rating) VALUES (?, ?, ?, ?)",
    [email, college_id, review, rating],
    (err) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ success: true });
    }
  );
});

/* GET ALL REVIEWS (optional) */
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM reviews", (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

/* GET REVIEWS FOR A SPECIFIC COLLEGE */
app.get("/reviews/:id", (req, res) => {
  const collegeId = req.params.id;

  db.query(
    "SELECT * FROM reviews WHERE college_id = ?",
    [collegeId],
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
});

/*  SERVER */

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});