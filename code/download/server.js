const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9090;

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'download.json');
  res.setHeader('Content-Disposition', 'attachment; filename="test.json"');

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', (err) => {
    console.error('Error reading the file:', err);
    res.status(500).send('Error reading the file.');
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
