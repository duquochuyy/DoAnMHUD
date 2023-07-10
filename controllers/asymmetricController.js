'use strict';

const models = require('../models');
const controller = {}
const NodeRSA = require('node-rsa');

controller.update = async (req, res) => {
    let type = parseInt(req.body.type);
    console.log(type);

    if (type == 1) {
        try {
            // Tạo cặp khóa d và e
            const key = new NodeRSA({ b: 512 });
            const publicKey = key.exportKey('public');
            const privateKey = key.exportKey('private');
            const n = key.exportKey('components-public').n.toString('hex');

            // Lưu trữ cặp khóa d, e và giá trị n vào models
            await models.Asymmetric.create({
                publicKey: publicKey,
                privateKey: privateKey,
                valueOfn: n
            });

            // Gửi cặp khóa d, e và giá trị n về cho người dùng
            console.log(publicKey);
            console.log(privateKey);
            return res.json({ publicKey });
        } catch (error) {
            console.error("Lỗi trong quá trình tạo cặp khóa:", error);
            res.status(500).json({ error: 'Lỗi trong quá trình tạo cặp khóa' });
        }
    }

    if (type == 2) {
        let plainText = req.body.plainText;
        let publicKey = req.body.publicKey;

        let data = await models.Asymmetric.findOne({
            where: { publicKey: publicKey }
        });
        console.log(data);

        let key_public = new NodeRSA(data.publicKey);
        var encryptedMessage = key_public.encrypt(plainText, 'base64');
        console.log({ encryptedMessage });

        return res.json({ encryptedMessage });
    }

    if (type == 3) {
        let cipherText = req.body.cipherText;
        let publicKey = req.body.publicKey;

        let data = await models.Asymmetric.findOne({
            where: { publicKey: publicKey }
        });

        let key_private = new NodeRSA(data.privateKey);
        var decryptedMessage = key_private.decrypt(cipherText, 'utf8');
        console.log(decryptedMessage);

        return res.json({ decryptedMessage });
    }
}

module.exports = controller;