// Import Modules
import express from "express";
import fs from 'fs';

// Set PORT variable
const PORT = process.env.PORT || 3001;

// Set Express variable
const app = express();

// Set public folders on port
app.use(express.static('public'));

// // GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'index.html'))
// );

// // GET Route for notes page
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, 'notes.html'))
// );

// Set listening on PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
