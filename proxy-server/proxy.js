import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  try {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyg5tPQf0kD71ITryOZq0CwLxXjD9hSQjRRYtGz2K83Zf-ijHvf6ctJuEItJAbm7W6FHg/exec';

    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body)
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Lỗi proxy');
  }
});

app.listen(port, () => {
  console.log(`Proxy server đang chạy tại cổng ${port}`);
});
