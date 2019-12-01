const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:filename', (req, res, next) => {
  const filename = `${req.params.filename}.html`
  res.sendFile(path.join(__dirname, filename), err => {
    if (err) {
      next(err);
    };
  });
});

app.use((req, res, next) => {
  const err = new Error('404 Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status);
  res.sendFile(path.join(__dirname, '404.html'));
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});