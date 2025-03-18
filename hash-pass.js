const bcrypt = require('bcryptjs');
const fs = require('fs');

const FILE = 'hash-pass-custom.txt';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    fs.writeFileSync(FILE, hashedPassword);
    const data =  fs.readFileSync(FILE, 'utf8');
    console.log(`🔒 Contraseña hasheada`);
    
};

const verifyPassword = async (inputPassword) => {
    const data =  fs.readFileSync(FILE, 'utf8');
    const isMatch = await bcrypt.compare(inputPassword, data);
    console.log(isMatch ? '✅ Contraseña correcta' : '❌ Contraseña incorrecta');
    return isMatch;
};



module.exports = { hashPassword, verifyPassword };