**Read this in other languages: [English](README.md), [中文](README_zh.md).**

# HTTPS Certificate Checker

This is an HTTPS certificate checking service built with Node.js. It allows users to check the details of HTTPS certificates by providing a hostname.

## Installation

First, clone this repository and install the dependencies:

```bash
git clone https://github.com/yourusername/https-certificate-checker.git
cd https-certificate-checker
npm install
```

## Usage

Start the service:

```bash
npm start
```

The service will run at `http://localhost:3000`.

To check an HTTPS certificate, visit the following URL:

```
http://localhost:3000/check-https?hostname=example.com
```

Replace `example.com` with the hostname you want to check.

## Response Example

A successful request will return a JSON response similar to the following:

```json
{
  "subject": {
    "CN": "github.com"
  },
  "issuer": {
    "C": "GB",
    "ST": "Greater Manchester",
    "L": "Salford",
    "O": "Sectigo Limited",
    "CN": "Sectigo ECC Domain Validation Secure Server CA"
  },
  "subjectaltname": "DNS:github.com, DNS:www.github.com",
  "infoAccess": {
    "CA Issuers - URI": [
      "http://crt.sectigo.com/SectigoECCDomainValidationSecureServerCA.crt"
    ],
    "OCSP - URI": [
      "http://ocsp.sectigo.com"
    ]
  },
  "ca": false,
  "bits": 256,
  "asn1Curve": "prime256v1",
  "nistCurve": "P-256",
  "valid_from": "Mar  7 00:00:00 2024 GMT",
  "valid_to": "Mar  7 23:59:59 2025 GMT",
  "fingerprint": "E7:03:5B:CC:1C:18:77:1F:79:2F:90:86:6B:6C:1D:F8:DF:AA:BD:C0",
  "fingerprint256": "FD:6E:9B:0E:F3:98:BC:D9:04:C3:B2:EC:16:7A:7B:0F:DA:72:01:C9:03:C5:3A:6A:6A:E5:D0:41:43:63:EF:65",
  "fingerprint512": "86:26:FD:8B:E7:87:6A:10:C7:DA:19:03:62:F6:EA:52:C8:BF:00:0A:94:5D:BD:E9:26:44:F0:5D:A7:4A:4B:AD:4D:9E:33:8C:EB:8D:1F:56:8B:55:00:48:54:97:56:F0:C3:65:58:EE:12:2A:AC:02:F2:21:90:9E:45:64:A2:BD",
  "ext_key_usage": [
    "1.3.6.1.5.5.7.3.1",
    "1.3.6.1.5.5.7.3.2"
  ],
  "serialNumber": "4E28F786B66C1A3B942CD2C40EB742A5",
  "daysToExpire": 40
}
```

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [https](https://nodejs.org/api/https.html)
- [underscore](https://www.npmjs.com/package/underscore)

## License

This project is licensed under the MIT License. For more information, see the LICENSE file.
