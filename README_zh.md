**Read this in other languages: [English](README.md), [中文](README_zh.md).**

# HTTPS Certificate Checker

这是一个使用Node.js构建的HTTPS证书检查服务。它允许用户通过提供主机名来检查HTTPS证书的详细信息。

## 安装

首先，克隆此存储库并安装依赖项：

```bash
git clone https://github.com/yourusername/https-certificate-checker.git
cd https-certificate-checker
npm install
```

## 使用

启动服务：

```bash
npm start
```

服务将运行在`http://localhost:3000`。

要检查HTTPS证书，请访问以下URL：

```
http://localhost:3000/check-https?hostname=example.com
```

将`example.com`替换为您要检查的主机名。

## 返回示例

成功请求将返回类似以下的JSON响应：

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

## Web界面

该服务还提供了一个Web界面，用户可以在其中输入主机名并检查HTTPS证书的详细信息。Web界面支持明亮和暗色主题，可以使用单选按钮切换主题。

### 示例

1. 打开浏览器并访问`http://localhost:3000`。
2. 在输入字段中输入您要检查的主机名。
3. 点击“Check”按钮。
4. 证书详细信息将显示在输入字段下方。

## 依赖项

- [express](https://www.npmjs.com/package/express)
- [https](https://nodejs.org/api/https.html)
- [underscore](https://www.npmjs.com/package/underscore)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
- [prismjs](https://www.npmjs.com/package/prismjs)

## 许可证

此项目使用MIT许可证。有关更多信息，请参阅LICENSE文件。
