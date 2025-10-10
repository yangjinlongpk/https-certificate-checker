const https = require('https');
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

  check_https2(hostname, res);
});
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
function check_https1(hostname, res) {
  const reqHttps = https.request({
    hostname,
    port: 443,
    method: 'GET',
    path: `/?t=${Date.now()}`,
    headers: {
      'cache-control': 'no-cache',
      'cdn-cache-control': 'no-cache',
    }
  }, (response) => {
    const certificate = response.socket.getPeerCertificate();
    console.log(certificate);
    parseCertificate(certificate, res);
  });

  reqHttps.on('error', (e) => {
    res.status(500).send(`Problem with request: ${e.message}`);
  });

  reqHttps.end();
}

function check_https2(hostname, res) {
  const options = {
    host: hostname,
    port: 443,
    servername: hostname,
    rejectUnauthorized: false,
  };
  const socket = tls.connect(options);
  socket.on('secureConnect', () => {
    // 连接建立后，可以通过 socket 对象获取证书信息
    const certificate = socket.getPeerCertificate();
    console.log(certificate); // 打印完整的证书对象
    parseCertificate(certificate, res);
    socket.end(); // 关闭连接
  });
  socket.on('error', (e) => {
    console.error('连接错误:', e);
    res.status(500).send(`Problem with request: ${e.message}`);
  });
}

app.listen(port, hostname, () => {
  console.log(`HTTPS Certificate Checker service running at http://${hostname}:${port}`);
});
