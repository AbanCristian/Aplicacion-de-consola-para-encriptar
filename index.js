const readline = require('readline');
const { generateKey, encryptMessage } = require('./encryption.js');
const { getKey, decryptMessage } = require('./decryption.js');
const { hashPassword, verifyPassword } = require('./hash-pass.js');

const { Console } = require('console');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
};

// ✅ Menú principal
const showMenu = () => {
    console.log('---------------------------------------');
    console.log('--Menú Principal--');
    console.log('1️ - Generar clave y cifrar mensaje');
    console.log('2 - Desencriptar mensaje');
    console.log('3 - Hashear contraseña');
    console.log('4 - Verificar contraseña');
    console.log('5 - Mensaje con clave propia');
    console.log('6 - Visualizar tu mensaje');
    console.log('0 - Salir');

    rl.question(' Seleccione una opción: ', async (option) => {
        switch (option) {
            case '1':
                console.clear();
                const key = generateKey();
                const messageToEncrypt = await askQuestion('💬 Ingrese el mensaje a cifrar: ');
                encryptMessage(messageToEncrypt, key);
                showMenu();
                break;

            case '2':
                console.clear();
                const storedKey = getKey();
                decryptMessage(storedKey);
                showMenu();
                break;

            case '3':
                console.clear();
                rl.question('Ingrese la contraseña a hashear: ', async (password) => {
                    await hashPassword(password);
                    rl.close();
                    
                });
                break;

            case '4':
                console.clear();
                rl.question('Ingrese la contraseña a verificar: ', async (password) => {
                    await verifyPassword(password);
                    rl.close();
                    
                });
                break;

            case '5':
                console.clear();
                const passwordMsg = await askQuestion('💬 Ingresa una contraseña para el mensaje: ');
                await hashPassword(passwordMsg);
                const encryptMsg = await askQuestion('💬 Ingresa tu mensaje que deseas cifrar: ');
                const key2 = generateKey();
                encryptMessage(encryptMsg, key2);
                console.log('✅ Mensaje cifrado con clave propia');
                showMenu();
                break;
            case '6':
                    const passwordMsg2 = await askQuestion('💬 Ingresa tu conseña: ');
                    const res = await verifyPassword(passwordMsg2);
                    console.clear();
                    if (res === true) {
                        const storedKey = getKey();
                        decryptMessage(storedKey);
                    } 
                    showMenu();
                    break;
            case '0':
                console.log('👋 Saliendo del programa...');
                rl.close();
                break;

            default:
                console.log('❌ Opción no válida. Intente de nuevo.');
                showMenu();
        }
    });
};


showMenu();