const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'event_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Routes
app.get('/api/events', (req, res) => {
    const sql = 'SELECT * FROM events';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/events', (req, res) => {
    const { title, description, date, location } = req.body;
    const sql = 'INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, date, location], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, description, date, location });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
