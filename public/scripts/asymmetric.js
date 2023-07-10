async function createKeyPair() {
    console.log(1);
    try {
        let res = await fetch('/asymmetric', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ type: 1 })
        });

        if (res.ok) {
            let json = await res.json();
            console.log(json.publicKey);
            document.getElementById('publicKey').value = `${json.publicKey}`;
        } else {
            console.error('Response error:', res.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function encryptMessage(plainText, publicKey) {
    console.log(2);
    try {
        let res = await fetch('/asymmetric', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ plainText, publicKey, type: 2 })
        });

        if (res.ok) {
            let json = await res.json();
            console.log(json.encryptedMessage);
            document.getElementById('encryptedMessage').value = `${json.encryptedMessage}`;
        } else {
            console.error('Response error:', res.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function decryptMessage(cipherText, publicKey) {
    console.log(3);
    try {
        let res = await fetch('/asymmetric', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ cipherText, publicKey, type: 3 })
        });

        if (res.ok) {
            let json = await res.json();
            console.log(json.decryptedMessage);
            document.getElementById('decryptedMessage').value = `${json.decryptedMessage}`;
        } else {
            console.error('Response error:', res.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}