import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.all('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});
