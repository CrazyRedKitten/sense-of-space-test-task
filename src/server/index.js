const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// TODO: Add post request handling
app.post('/api/image', (req, res) => {
  // TODO: Add image processing
  res.send('POST request to the homepage');
});

app.get('/', (req, res) => {
  // TODO: Change clinetDir value to dinamic instead of hardcoded
  const clientDir = '/Users/crazyredkitten/Documents/'+
  'GitHub/sense-of-space-test-task/src/client';
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
