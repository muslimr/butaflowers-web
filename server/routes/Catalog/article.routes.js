const {Router} = require('express');
const Article = require('../../models/Catalog/Article');
const router = Router();

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const sharp = require('sharp');

const {uploadFile, getFileStream, deleteFileStream, getImage} = require('../../../s3');


router.get(
    '/images/:key',
    async (req, res) => {
        try {
            const key = req.params.key;
            const getFilePromise = await getFileStream(key).promise();
            const readStream = await getFileStream(key).createReadStream();

            if (!!getFilePromise) readStream.pipe(res);
            return null;
        } catch (e) {
            res.status(500).json({description: 'Please wait a few minutes before you try again'});
        }
    }
);


router.get(
    '/list',
    async (req, res) => {
        try {
            let ID = req.query.id;
            let articles = await Article.find({subcategory_id: ID});
            let data = articles.reverse();

            res.status(200).json({data});
        } catch(e) {
            res.status(500).json({description: 'Please wait a few minutes before you try again'});
        }
    }
)


router.get(
    '/info',
    async (req, res) => {
        try {
            let ID = req.query.id;
            let data;
            if (ID) {
                let articleInfo = await Article.find({_id: ID});
                data = articleInfo[0];
            } else {
                data = {};
            }

            res.status(200).json({data});
        } catch(e) {
            res.status(500).json({description: 'Please wait a few minutes before you try again'});
        }
    }
)


router.post(
    '/image/add',
    upload.single('image'),
    async (req, res) => {
        try {
            const {id} = req.query;
            const file = req.file;

            await uploadFile(file);
            await unlinkFile(file.path);
            await Article.updateOne({_id: id}, {img: file.filename});

            res.status(200).json({description: 'Изображение Добавлено!'});
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again'});
        }
    }
)


router.post(
    '/add',
    upload.single('image'),
    async (req, res) => {
        try {
            const {
                category_id,
                subcategory_id,
                img,
                title,
                subtitle,
                description,
            } = req.query;


            if (req.file.filename) {
                const file = req.file;

                let image_id = req.file.filename;

                await uploadFile(file);
                await unlinkFile(file.path);

                let article = new Article({
                    category_id,
                    subcategory_id,
                    img: image_id,
                    title,
                    subtitle,
                    description,
                    article_num: null,
                });
                await article.save();

                res.status(200).json({article, description: 'Продукт Добавлен!'});
            } else {
                let article = new Article({
                    category_id,
                    subcategory_id,
                    img: '',
                    title,
                    subtitle,
                    description,
                    article_num: null,
                });
                await article.save();

                res.status(200).json({article, description: 'Продукт Добавлен!'});
            }
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


router.put(
    '/edit',
    async (req, res) => {
        try {
            let {id, data} = req.body;
            let article = await Article.find({_id: id});
            if (!article) return;
            let updated = await Article.updateOne({_id: id}, {$set: data});

            res.status(200).json({updated, description: 'Updated successfully'});
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again.'});
        }
    }
)


router.delete(
    '/image/delete',
    async (req, res) => {
        try {
            const {id} = req.query;
            let category = await Article.find({_id: id});

            await deleteFileStream(category[0].img);
            await Article.updateOne({_id: id}, {img: ''});

            res.status(200).json({description: 'Изображение Удалено!'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


router.delete(
    '/delete',
    async (req, res) => {
        try {
            const {id} = req.query;
            await Article.findOneAndDelete({_id: id});

            res.status(200).json({description: 'Deleted Successfully!'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


module.exports = router;
