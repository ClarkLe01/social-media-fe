const { promises: fsPromises } = require('fs');

async function addNonce() {
    try {
        const fileName = 'build/index.html';
        const contents = await fsPromises.readFile(fileName, 'utf-8');
        let replaced = contents.replace(/<script defer=/g, '<script nonce="**CSP_NONCE**" defer=');
        await fsPromises.writeFile(fileName, replaced);
        console.log(`Added nonce to script tag in ${fileName} for CSP`);
    } catch (err) {
        console.log(err);
    }
}

addNonce();
