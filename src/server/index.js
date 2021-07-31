/* eslint-disable indent */
// TODO: Fix indent problem
const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// multer options
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image.'));
    }
    cb(undefined, true);
  },
});

// TODO: document API endpoints
/**
 * Upload a file
 */
app.post('/api/image', upload.single('photo'), async (req, res) => {
  console.log('Recieved POST request with image');
  // image processing
  const image = req.file.buffer;
  console.log(__dirname);
  const today = new Date();
  console.log(today);
  // add stamp
  // https://sharp.pixelplumbing.com/api-composite
  const buffer = await sharp(image)
    .composite([
      {
        input: `${path.join(__dirname, 'assets/stamp.png')}`,
        top: 20,
        left: 20,
      },
    ])
    .png()
    .toBuffer();
  const base64Data = buffer.toString('base64');
  res.send(base64Data);
  console.log('sending base64 image');
});

app.get('/', (req, res) => {
  // TODO: Change clientDir value to dinamic instead of hardcoded
  const clientDir =
    '/Users/crazyredkitten/Documents/' +
    'GitHub/sense-of-space-test-task/src/client';
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
