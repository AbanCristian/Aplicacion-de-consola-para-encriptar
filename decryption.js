const crypto = require('crypto');
const fs = require('fs');

const ALGORITHM = 'aes-256-cbc';
const KEY_FILE = 'clave_secreta.txt';
const DATA_FILE = 'mensaje_encriptado.txt';

const getKey = () => fs.readFileSync(KEY_FILE, 'utf8').trim();

const decryptMessage = (key) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const iv = Buffer.from(data.slice(0, 32), 'hex');
    const encryptedText = Buffer.from(data.slice(32), 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted += decipher.final();

    console.log(`🔓 Mensaje desencriptado: ${decrypted}`);
};



module.exports = { getKey, decryptMessage };
