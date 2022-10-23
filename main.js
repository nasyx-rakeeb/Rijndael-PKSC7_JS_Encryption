const Rijndael = require('rijndael-js');
const padder = require('pkcs7-padding')
const crypto = require('crypto')

let plainText, padded, key, iv, cipher, encrypted

const encryptor = () => {
    plainText = Buffer.from('Here is my plain text', 'utf8')
    padded = padder.pad(plainText, 32)
    key = crypto.randomBytes(32)
    iv = crypto.randomBytes(32)
    cipher = new Rijndael(key, 'cbc')
    encrypted = cipher.encrypt(padded, 256, iv)
    console.log(encrypted)
}
encryptor()

const decryptor = () => {
    const encrypted = encrypted
    const key = key
    const iv = iv
    const decipher = new Rijndael(key, 'cbc')
    const decryptedPadded = decipher.decrypt(encrypted, 256, iv)
    const decrypted = padder.unpad(decryptedPadded, 32)
    const clearText = decrypted.toString('utf8')
    console.log(clearText)
}