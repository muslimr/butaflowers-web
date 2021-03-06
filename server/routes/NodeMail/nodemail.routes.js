const {Router} = require('express');
const Category = require('../../models/Catalog/Category');
const Subcategory = require('../../models/Catalog/Subcategory');
const Article = require('../../models/Catalog/Article');
const NodeMail = require('../../models/User/NodeMail');
const router = Router();

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const sharp = require('sharp');

const { saveAs } = require('file-saver');


const {uploadFile, getFileStream, deleteFileStream, getImage} = require('../../../s3');


const nodemailer = require("nodemailer");
const path = require('path');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "westflorarussia@gmail.com",
        pass: "Designer2020"
    },
});




router.post(
    '/send',
    async (req, res) => {
        try {
            let {name, phone, email} = req.body.params;

            let isUserExists = await NodeMail.find({email});

            let nodemail = new NodeMail({
                name: name,
                phone: phone,
                email: email,
            });

            // if (!isUserExists)
            //     await nodemail.save();

            const options = {
                from: "westflorarussia@gmail.com",
                to: email,
                subject: "Ваш ПРАЙС-ЛИСТ",
                text: " ",
                attachments: [
                    {
                        filename: 'price-list.pdf', // <= Here: made sure file name match
                        path: path.join(__dirname, '../../../price-list.pdf'), // <= Here
                        // href: 'https://drive.google.com/file/d/1qvOLZgdLKIGvNWu8RgqrMgJwhbo_nF07/view?usp=sharing',
                        contentType: 'application/pdf'
                    }
                ]
            }

            const ownOptions = {
                from: "westflorarussia@gmail.com",
                to: "westflorarussia@gmail.com",
                subject: !!name ? `${name} запросил(а) Ваш Прайс-лист` : 'Запросили Ваш Прайст-лист',
                text: `Имя: ${name}, Email: ${email}, Номер: ${phone}`,
            }

            transporter.sendMail(options, function(err, info) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log("Sent: " + info.response);
            });

            if(!!email) {
                transporter.sendMail(ownOptions, function(err, info) {
                    if(err) {
                        console.log(err);
                        return;
                    }

                    console.log("Sent: " + info.response);
                });
            }

            res.status(200).json({description: 'Прайс-Лист Отправлен!'});
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again'});
        }
    }
)

module.exports = router;
