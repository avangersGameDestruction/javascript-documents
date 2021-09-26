const crypto = require('crypto');

function generateToken({ stringBase = 'base64', byteLength = 48 } = {}) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(byteLength, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString(stringBase));
            }
        });
    });
}

async function handler(req, res) {
    // default token length
    const newToken = await generateToken();
    console.log('newToken', newToken);

    // pass in parameters - adjust byte length
    const shortToken = await generateToken({ byteLength: 20 });
    console.log('newToken', shortToken);
}