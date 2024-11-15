const express = require('express');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8848;

app.use(
  cors({
    origin: ['http://localhost:8000', 'https://chuenwei0129.github.io'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const phoneNumbers = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  phoneNumber: `+123456789${String(i).padStart(4, '0')}`,
}));

const failedIds = new Set();
while (failedIds.size < 200) {
  const randomId = Math.floor(Math.random() * 1500) + 1;
  failedIds.add(randomId);
}

app.get('/phone/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (failedIds.has(id)) {
    return res.status(404).send('Phone number not found');
  }

  const phoneNumber = phoneNumbers.find((p) => p.id === id);

  if (phoneNumber) {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      res.json(phoneNumber);
    }, delay);
  } else {
    res.status(404).send('Phone number not found');
  }
});

const serverOptions = {
  key: fs.readFileSync(path.join(os.homedir(), '.cert/key.pem')),
  cert: fs.readFileSync(path.join(os.homedir(), '.cert/cert.pem')),
};

https.createServer(serverOptions, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
