const crypto = require('crypto');
const fs = require('fs');

const ALGORITHM = 'aes-256-cbc';
const KEY_FILE = 'clave_secreta.txt';
const DATA_FILE = 'mensaje_encriptado.txt';

const generateKey = () => {
    const key = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(KEY_FILE, key);
    
    console.log(`✅ Clave generada y guardada`);
    return key;
};

const encryptMessage = (message, key) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);

    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const data = iv.toString('hex') + encrypted;
    fs.writeFileSync(DATA_FILE, data);
    console.log(`✅ Mensaje cifrado y guardado`);
};



module.exports = { generateKey, encryptMessage };
