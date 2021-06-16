const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.get('*', (req, res) => handle(req, res));
    server.listen(3000, (err) => {
      if (err) throw err;
      console.warn('> Ready on http://localhost:3000');
    });
  })
  // This server is used for client directing.
  // Don't put elasticsearch's part in this file, cause it was banned due to safety factor.
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });