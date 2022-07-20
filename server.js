// Import Modules and files
import express, { json } from "express";
import fs from 'fs';
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dbNotes from './db/db.json' assert { type: 'json' };
import { stringify } from "querystring";

// Set PORT variable
const PORT = process.env.PORT || 3001;

// Set variables
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set public folder on port
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// GET Route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// GET API Route for notes
app.get('/api/notes', (req, res) => res.json(dbNotes));

// POST API Route for notes
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request was recieved`);
    const newNote = req.body;
    console.log(`${newNote.title}, ${newNote.text}`);
    res.json(dbNotes);
    console.log(dbNotes);
    dbNotes.push(newNote);
    console.log(dbNotes);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), err => 
        err ? console.log(err) : console.log('New note written to database')
    );
});

// Set listening on PORT
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);
