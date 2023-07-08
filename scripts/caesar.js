// Hàm mã hóa Caesar
function caesarEncrypt(message, shift) {
    var encryptedMessage = "";

    for (var i = 0; i < message.length; i++) {
        var char = message[i];

        if (char.match(/[a-z]/i)) {
            var code = message.charCodeAt(i);

            // Mã hóa chữ thường
            if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
            // Mã hóa chữ hoa
            else if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
        }

        encryptedMessage += char;
    }

    return encryptedMessage;
}

// Hàm giải mã Caesar
function caesarDecrypt(encryptedMessage, shift) {
    return caesarEncrypt(encryptedMessage, 26 - shift);
}


// hàm có chức năng mã hóa dữ liệu vào
function encrypt() {
    // xư lí việc input là text
    const plainText = $('#chua-ma-hoa').val();
    if (plainText.length > 0) {
        const encryptionKey = parseInt($('#public-key1').val());
        // mã hóa input
        console.log(plainText, encryptionKey);
        const encryptedData = caesarEncrypt(plainText, encryptionKey);

        $('#da-ma-hoa').val(encryptedData);
    }
    else {
        $('#da-ma-hoa').val('');
    }

    // xử lí việc input là file
    const fileInput = document.getElementById('file-chua-ma-hoa');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        filename = file.name;   // tên file
        console.log(`ten file: ${filename}`);
        // đọc dữ liệu file
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileData = event.target.result;
            const encryptionKey = parseInt($('#public-key1').val());
            const encryptedData = caesarEncrypt(fileData, encryptionKey); // mã hóa dữ liệu file
            $('#da-ma-hoa').val(encryptedData)
            const blob = new Blob([encryptedData], {
                type: 'text/plain;charset=utf-8'
            });
            // tách tên file thành các phần và chèn thêm "encrypted"
            const fileParts = filename.split('.');
            const fileExtension = fileParts.pop();
            const fileNameWithoutExtension = fileParts.join('.');
            const filenameNew = fileNameWithoutExtension + '_encrypted.' + fileExtension;
            saveAs(blob, filenameNew); // Tải file mã hóa về máy
        }
        reader.readAsText(file);
    } else {
        console.log('Chưa có file để mã hóa');
    }
}

// hàm có chức năng giải mã
function decrypt() {
    // xử lí việc input là text
    const encryptedData = $('#da-ma-hoa').val();
    if (encryptedData.length > 0) {
        const encryptionKey = parseInt($('#public-key2').val());
        const decryptedData = caesarDecrypt(encryptedData, encryptionKey);
        $('#chua-ma-hoa').val(decryptedData);
    }
    else {
        $('#chua-ma-hoa').val('');
    }


    // xư lí việc input là file
    const fileInput = document.getElementById('file-da-ma-hoa');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // tên file cần giai mã
        filename = file.name;

        // đọc dữ liệu file
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileData = event.target.result;
            const encryptionKey = parseInt($('#public-key2').val());
            const decryptedData = caesarDecrypt(fileData, encryptionKey); // giải mã dữ liệu file
            $('#chua-ma-hoa').val(decryptedData);
            // Lưu nội dung giải mã vào một đối tượng Blob
            const blob = new Blob([decryptedData], {
                type: 'text/plain;charset=utf-8'
            });

            // tách tên file thành các phần và chèn thêm "decrypted"
            const fileParts = filename.split('.');
            const fileExtension = fileParts.pop();
            const fileNameWithoutExtension = fileParts.join('.');
            const filenameNew = fileNameWithoutExtension + '_decrypted.' + fileExtension;

            saveAs(blob, filenameNew); // Tải file đã giải mã về
        }
        reader.readAsText(file);
    } else {
        console.log('Chưa có file để giải mã');
    }
}

window.onload = () => {
    document.getElementById('buttonEncrypt').addEventListener('click', encrypt, false);
    document.getElementById('buttonDecrypt').addEventListener('click', decrypt, false);
}