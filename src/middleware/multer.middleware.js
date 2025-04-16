const multer = require('multer');

// Storage config (optional)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename file
  }
});

// Initialize middleware
const upload = multer({ storage: storage });

// Using as middleware in a route
app.post('/upload', upload.single('myFile'), (req, res) => {
  console.log(req.file); // The uploaded file
  res.send('File uploaded!');
});
