const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',  // Replace with your root password
    database: 'event_management'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

app.post('/api/events', (req, res) => {
    const { name, date, location, description } = req.body;
    const query = 'INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)';

    db.query(query, [name, date, location, description], (err, result) => {
        if (err) {
            console.error('❌ Failed to add event:', err);
            res.status(500).json({ message: 'Failed to add event' });
        } else {
            console.log('✅ Event added:', result);
            res.status(201).json({ message: 'Event added successfully' });
        }
    });
});

app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});
