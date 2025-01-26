const express = require('express');
const https = require('https');
const _ = require('underscore');

const app = express();
const port = process.env.PORT || 3000;

app.get('/check-ssl', (req, res) => {
  const { hostname } = req.query;

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
    res.json(_.omit(certificate, 'pubkey', 'raw'));
  });

  reqHttps.on('error', (e) => {
    res.status(500).send(`Problem with request: ${e.message}`);
  });

  reqHttps.end();
});

app.listen(port, () => {
  console.log(`SSL Certificate Checker service running at http://localhost:${port}`);
});
