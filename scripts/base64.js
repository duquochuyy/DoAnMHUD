// hàm có chức năng mã hóa dữ liệu vào
function encrypt() {
    $('#cipher-text').val('');
    // xư lí việc input là text
    const plainText = $('#plain-text').val();
    if (plainText.length > 0) {
        // mã hóa input
        const cipherText = btoa(plainText);
        $('#cipher-text').val(cipherText);
    }
    else {
        $('#cipher-text').val('');
    }

    // xử lí việc input là file
    const fileInput = document.getElementById('file-plain-text');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        filename = file.name;   // tên file
        console.log(`ten file: ${filename}`);
        // đọc dữ liệu file
        const reader = new FileReader();
        reader.onload = function (event) {
            const encryptedData = btoa(event.target.result);
            $('#cipher-text').val(encryptedData)
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
        reader.readAsText(file); // mã hóa tập tin thành base64
    } else {
        console.log('Chưa có file để mã hóa');
    }

}

// hàm có chức năng giải mã
function decrypt() {

    // xử lí việc input là text
    const cipherText = $('#cipher-text').val();
    if (cipherText.length > 0) {
        const plainText = atob(cipherText);
        $('#plain-text').val(plainText);
    }
    else {
        $('#plain-text').val('');
    }

    // xư lí việc input là file
    const fileInput = document.getElementById('file-cipher-text');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // tên file cần giai mã
        filename = file.name;

        // đọc dữ liệu file
        const reader = new FileReader();
        reader.onload = function (event) {
            const decryptedData = atob(event.target.result);
            $('#plain-text').val(decryptedData);
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

let imageInput = document.getElementById('imageInput');
let imageCipherInput = document.getElementById('file-cipher-image');

let imageTextarea = document.getElementById('imageTextarea');
const cipherImage = $('#image-cipher-text');

imageInput.addEventListener('change', function (event) {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
        let base64String = e.target.result;
        imageTextarea.src = base64String;
    }
    reader.readAsDataURL(file);
});

function encryptImage() {
    if (imageTextarea.src) {
        let decryptedData = imageTextarea.src.split(',')[1];
        cipherImage.val(decryptedData);
    }
}

function downloadCipher() {
    let Content = cipherImage.val();
    if (Content) {
        const blob = new Blob([Content], {
            type: 'text/plain;charset=utf-8'
        });
        saveAs(blob, `image.txt`);
    }
    else {
        alert("Không có nội dung đã được mã hóa!");
    }
}

function downloadImage() {
    let Content = imageTextarea.src;
    if (Content) {
        // Tạo một liên kết tải xuống
        var link = document.createElement('a');
        link.href = Content;
        link.download = 'image.jpg';

        document.body.appendChild(link);
        link.click();
    }
    else {
        alert("Không có hình ảnh đã được mã hóa!");
    }
}

imageCipherInput.addEventListener('change', function (event) {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
        let base64String = e.target.result;
        cipherImage.val(base64String);
    }
    reader.readAsText(file);
});

function decryptImage() {
    imageTextarea.src = 'data:image/jpeg;base64,' + cipherImage.val();
}

window.onload = () => {
    document.getElementById('buttonEncrypt').addEventListener('click', encrypt, false);
    document.getElementById('buttonEncryptImage').addEventListener('click', encryptImage, false);
    document.getElementById('buttonDownloadImage').addEventListener('click', downloadCipher, false);
    document.getElementById('downloadImage').addEventListener('click', downloadImage, false);
    document.getElementById('buttonDecryptImage').addEventListener('click', decryptImage, false);
    document.getElementById('buttonDecrypt').addEventListener('click', decrypt, false);
}
