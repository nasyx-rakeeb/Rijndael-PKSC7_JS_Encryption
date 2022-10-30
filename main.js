const RijndaelManaged =  require('./p2/package/index.js')
const padder = require('./p1/package/index.js')
const crypto = require("node:crypto")

let plainText, padded, keyData, ivData, cipher, encryptedData

const encryptor = async () => {
    plainText = Buffer.from(`{
    "DPId": "84200",
    "ReqType": "D",
    "ReqIdentifier": "S",
    "ReturnURL": "https://edisapp.azurewebsites.net/edis-callback?dpId=84200",
    "ReqTime": "21102022110036",
    "BOID": "1208420000648964",
    "CMID": "M52003",
    "ExID": 12,
    "NumOfDays": 1,
    "RecordDtls": [{
            "TxnReqId": "16663500365830",
            "ISIN": "INF204K01UN9",
            "Quantity": "0.101"
        },
        {
            "TxnReqId": "16663500365831",
            "ISIN": "INE589A01014",
            "Quantity": "3.000"
        }
    ],
    "SettleId": "",
    "ExecDate": "21102022",
    "TMID": "",
    "CtrBOID": "",
    "TrRsnCode": "",
    "Filler1": "0",
    "Filler2": "0"
}

{
    "DPId": "84200",
    "ReqType": "D",
    "ReqIdentifier": "S",
    "ReturnURL": "https://edisapp.azurewebsites.net/edis-callback?dpId=84200",
    "ReqTime": "21102022110036",
    "BOID": "1208420000648964",
    "CMID": "M52003",
    "ExID": 12,
    "NumOfDays": 1,
    "RecordDtls": [{
            "TxnReqId": "16663500365830",
            "ISIN": "INF204K01UN9",
            "Quantity": "0.101"
        },
        {
            "TxnReqId": "16663500365831",
            "ISIN": "INE589A01014",
            "Quantity": "3.000"
        }
    ],
    "SettleId": "",
    "ExecDate": "21102022",
    "TMID": "",
    "CtrBOID": "",
    "TrRsnCode": "",
    "Filler1": "0",
    "Filler2": "0"
}`, 'utf8')
    padded = padder.pad(plainText, 32)
    keyData = "lfzv333td7iyq7eafyaem7ecxsse86de"
    ivData = "lfzv333td7iyq7eafyaem7ecxsse86de"
    cipher = new RijndaelManaged(keyData, 'cbc')
    encryptedData = cipher.encrypt(padded, 256, ivData)
    console.log(Buffer.from(encryptedData).toString("hex"))
}
encryptor()

const decryptor = () => {
    const key = keyData
    const iv = ivData
    const encrypted = encryptedData
    const decipher = new RijndaelManaged(key, 'cbc')
    const decryptedPadded = decipher.decrypt(encrypted, 256, iv)
    const decrypted = padder.unpad(decryptedPadded, 32)
    const clearText = Buffer.from(decrypted).toString()
    console.log(clearText)
}
decryptor()