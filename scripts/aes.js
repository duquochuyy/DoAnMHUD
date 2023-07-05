// hàm có chức năng mã hóa dữ liệu vào
function encrypt() {
    // xư lí việc input là text
    const plainText = $('#chua-ma-hoa').val();
    if (plainText.length > 0) {
        const encryptionKey = $('#public-key1').val();
        // mã hóa input
        const encryptedData = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();

        console.log(encryptedData);
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
            const encryptionKey = $('#public-key1').val();
            const encryptedData = CryptoJS.AES.encrypt(fileData, encryptionKey).toString(); // mã hóa dữ liệu file
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
        const encryptionKey = $('#public-key2').val();
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8);
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
            const encryptionKey = $('#public-key2').val();
            const decryptedData = CryptoJS.AES.decrypt(fileData, encryptionKey).toString(CryptoJS.enc.Utf8); // giải mã dữ liệu file
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