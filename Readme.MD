{
  "defaults": {
    "store": {
      "module": "greenlock-store-fs"
    },
    "challenges": {
      "http-01": {
        "module": "acme-http-01-standalone"
      }
    },
    "renewOffset": "-45d",
    "renewStagger": "3d",
    "accountKeyType": "EC-P256",
    "serverKeyType": "RSA-2048",
    "subscriberEmail": "sankhanil.basu@gmail.com"
  },
  "sites": [
    {
      "subject": "qioseonlabs.com",
      "altnames": [
        "qioseonlabs.com"
      ],
      "renewAt": 1
    },
    {
      "subject": "www.qioseonlabs.com",
      "altnames": [
        "www.qioseonlabs.com"
      ],
      "renewAt": 1
    }
  ]
}




