const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

// TODO: Add post request handling
app.post('/api/image', upload.single('photo'), async (req, res) => {
  console.log('Recieved POST request with image');
  // image processing
  const image = req.file.buffer;
  console.log(__dirname);
  const today = new Date();
  console.log(today);
  const buffer = await sharp(image)
      // add stamp
      .composite([{input: `${path.join(__dirname, 'assets/stamp.png')}`,
        top: 20, left: 20}])
      .png()
      .toBuffer();
  const base64Data = buffer.toString('base64');
  res.send(base64Data);
  console.log('sending base64 image');
});

app.get('/', (req, res) => {
  // TODO: Change clientDir value to dinamic instead of hardcoded
  const clientDir = '/Users/crazyredkitten/Documents/'+
  'GitHub/sense-of-space-test-task/src/client';
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
