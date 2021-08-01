const express = require('express');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const {createCanvas} = require('canvas');
const sizeOf = require('buffer-image-size');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

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

  // TODO: Generate stamp with date
  // TODO: Dynamic stamp size depend on image size
  // https://flaviocopes.com/canvas-node-generate-image/
  const generateStamp = (image) => {
    const dimensions = sizeOf(image);
    const width = dimensions.width;
    const height = dimensions.height * .08;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillStyle = 'rgba(173, 173, 173, 0.5)';
    context.fillRect(0, 0, width, height);

    const today = new Date();
    const text = `Server stamp: ${today.getHours()}:${today.getMinutes()}`;
    context.font = `regular ${height / 2}px Poppins`;
    context.textAlign = 'center';
    context.fillStyle = '#000';
    context.fillText(text, width/2, height/2);
    const buffer = canvas.toBuffer('image/png');
    return buffer;
  };

  // add stamp
  generateStamp(image);
  // https://sharp.pixelplumbing.com/api-composite
  // TODO: Optimize image / lower resolution
  // TODO: Handle errors
  const buffer = await sharp(image)
      .composite([
        {
          // input: `${path.join(__dirname, 'assets/stamp.png')}`,
          input: generateStamp(image),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
  const base64Data = buffer.toString('base64');
  res.send(base64Data);
  console.log('sending base64 image');
});

app.get('/', (req, res) => {
  const clientDir = '/src/server/dist';
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
