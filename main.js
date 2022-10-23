import RijndaelManaged from 'rijndael-js'
import padder from 'pkcs7-padding'
import crypto from 'crypto'

let plainText, padded, keyData, ivData, cipher, encryptedData

const encryptor = async () => {
    plainText = Buffer.from('Here is my plain text', 'utf8')
    padded = padder.pad(plainText, 32)
    keyData = crypto.randomBytes(32)
    ivData = crypto.randomBytes(32)
    cipher = new RijndaelManaged(keyData, 'cbc')
    encryptedData = cipher.encrypt(padded, 256, ivData)
    console.log(encryptedData)
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