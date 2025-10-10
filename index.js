const tls = require('tls');
const path = require('path');
const _ = require('underscore');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.post('/check-https', (req, res) => {
  const { hostname } = req.body;
  if (!hostname) {
    return res.status(400).send('Hostname is required');
  }
  check_https(hostname, res);
});
function check_https(hostname, res) {
  const options = {
    host: hostname,
    port: 443,
    servername: hostname,
    rejectUnauthorized: false,
  };
  const socket = tls.connect(options);
  socket.on('secureConnect', () => {
    const certificate = socket.getPeerCertificate();
    console.log(certificate);
    parseCertificate(certificate, res);
    socket.end();
  });
  socket.on('error', (e) => {
    console.error('连接错误:', e);
    res.status(500).send(`Problem with request: ${e.message}`);
  });
}
function parseCertificate(certificate, res) {
  if (!certificate || Object.keys(certificate).length === 0) {
    return res.status(500).send('The website did not provide a certificate');
  }
  let { valid_to } = certificate;
  valid_to = new Date(valid_to);
  const currentDate = new Date();
  const daysToExpire = Math.floor((valid_to - currentDate) / (1000 * 60 * 60 * 24));
  res.json({
    ..._.omit(certificate, 'pubkey', 'raw'),
    daysToExpire,
  });
}
app.listen(port, hostname, () => {
  console.log(`HTTPS Certificate Checker service running at http://${hostname}:${port}`);
});
