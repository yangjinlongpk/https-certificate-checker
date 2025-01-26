const express = require('express');
const https = require('https');
const _ = require('underscore');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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

  const options = {
    hostname,
    port: 443,
    method: 'GET'
  };

  const reqHttps = https.request(options, (response) => {
    const certificate = response.socket.getPeerCertificate();

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
  });

  reqHttps.on('error', (e) => {
    res.status(500).send(`Problem with request: ${e.message}`);
  });

  reqHttps.end();
});

app.listen(port, () => {
  console.log(`HTTPS Certificate Checker service running at http://localhost:${port}`);
});
