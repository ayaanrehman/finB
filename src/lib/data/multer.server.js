const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the directory where you want to store the files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename as the original name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the file upload and response as needed
  res.send('File uploaded successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
