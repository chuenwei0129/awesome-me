import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
const __dirname = import.meta.dirname;

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.flushHeaders();

  let counter = 0;

  const intervalId = setInterval(() => {
    counter++;

    const data = {
      id: counter,
      imageId: `image_${counter}`,
    };

    res.write(`id: ${counter}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);

    if (counter >= 10) {
      clearInterval(intervalId);
      res.end();
    }
  }, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.get('/images/:id', (req, res) => {
  const imageId = req.params.id;
  // For demo purposes, return a placeholder image
  // In a real scenario, retrieve image data based on imageId
  res.type('png');
  res.sendFile(__dirname + '/placeholder.png');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
