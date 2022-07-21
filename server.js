// Import Modules and files
import express from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dbNotes from './db/db.json' assert { type: 'json' };
import uniqid from 'uniqid';

// Set PORT variable
const PORT = process.env.PORT || 3001;

// Set variables
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set express static route
app.use(express.static('public'));

// Set express functions
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
    const newNote = req.body;
    newNote['id'] = uniqid();
    res.json(dbNotes);
    dbNotes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), err => 
        err ? console.log(err) : console.log('New note written to database')
    );
});

// DELETE API Route for notes
app.delete('/api/notes/:id', (req, res) => {
    res.json(dbNotes);
    const deleteIndex = dbNotes.findIndex(note => {return note.id === req.params.id});
    dbNotes.splice(deleteIndex, 1);
    fs.writeFile('./db/db.json', JSON.stringify(dbNotes), err => 
        err ? console.log(err) : console.log('Note deleted from database')
    );
});

// Set listening on PORT
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);
