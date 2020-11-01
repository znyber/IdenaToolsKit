const  {sha3_256} = require( './sha3.min.js');
const {createDecipheriv,createCipheriv,randomBytes} = require('crypto');



function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x'
}

  function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str
    }
    return isHexPrefixed(str) ? str.slice(2) : str
}
 function hexToUint8Array(hexString) {
    const str = stripHexPrefix(hexString)

    const arrayBuffer = new Uint8Array(str.length / 2)

    for (let i = 0; i < str.length; i += 2) {
        const byteValue = parseInt(str.substr(i, 2), 16)
        arrayBuffer[i / 2] = byteValue
    }

    return arrayBuffer
}
  function toHexString(byteArray, withPrefix) {
    return (
        (withPrefix ? '0x' : '') +
        Array.from(byteArray, function (byte) {
            // eslint-disable-next-line no-bitwise
            return `0${(byte & 0xff).toString(16)}`.slice(-2)
        }).join('')
    )
}


exports.encryptPrivateKey = function() {
    data = document.getElementById('EN-PK').value;
    passphrase = document.getElementById('EN-PASS').value;

    const key = Buffer.from(sha3_256.array(passphrase));
    const dataArray = Buffer.from(
      typeof data === 'string' ? hexToUint8Array(data) : new Uint8Array(data)
    )
    const iv = randomBytes(12)
    const cipher = createCipheriv(
      'aes-256-gcm',
      key,
      iv,
    )
    const encrypted = [
      cipher.update(dataArray),
      cipher.final(),
    ]
    const joined = Buffer.concat([iv, Buffer.concat(encrypted), cipher.getAuthTag()]);

    document.getElementById('EN-Output').value = toHexString(joined);   
  }

exports.decryptPrivateKey = function() {
    data = document.getElementById('DE-PK').value;
    passphrase = document.getElementById('DE-PASS').value;
    const key = Buffer.from(sha3_256.array(passphrase));
    const dataArray = Buffer.from(
        typeof data === 'string' ? hexToUint8Array(data) : new Uint8Array(data)
    )


    const decipher = createDecipheriv(
        'aes-256-gcm',
        key,
        dataArray.slice(0, 12)
    )
    decipher.setAuthTag(dataArray.slice(dataArray.length - 16))
    const decrypted = [
        ...decipher.update(dataArray.slice(12, dataArray.length - 16)),
        ...decipher.final(),
    ]
    document.getElementById('DE-Output').value = toHexString(decrypted);
     
}


