const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

// Connect to the database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Table created or already exists.');
});

// Endpoint to add a record
app.post('/add-student', (req, res) => {
    const { name, age } = req.body;
    db.run(`INSERT INTO students (name, age) VALUES (?, ?)`, [name, age], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: `A row has been inserted with rowid ${this.lastID}` });
    });
});

// Endpoint to read records
app.get('/students', (req, res) => {
    db.all(`SELECT * FROM students`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ students: rows });
    });
});

// Endpoint to update a record
app.put('/update-student/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    db.run(`UPDATE students SET name = ?, age = ? WHERE id = ?`, [name, age, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: `Row(s) updated: ${this.changes}` });
    });
});

// Endpoint to delete a record
app.delete('/delete-student/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM students WHERE id = ?`, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: `Row(s) deleted: ${this.changes}` });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});