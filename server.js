// server.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Load SSL certificates
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.pem')),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
