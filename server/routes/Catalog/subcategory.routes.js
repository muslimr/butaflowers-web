const {Router} = require('express');
const Subcategory = require('../../models/Catalog/Subcategory');
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
            let readStream;

            if (getFilePromise !== undefined) {
                readStream = await getFileStream(key).createReadStream();
            } else {
                readStream = await getFileStream('Group 16.png')
            }

            console.log('###############', readStream)

            readStream.pipe(res)
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

            let subcategories = await Subcategory.find({category_id: ID});
            let data = subcategories.reverse();
            for (let key in subcategories) {
                let articles = await Article.find({subcategory_id: subcategories[key]._id})
                subcategories[key].articles_count = articles.length;
            }

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
                let categoryInfo = await Subcategory.find({_id: ID});
                data = categoryInfo[0];
            } else {
                data = {}
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
            await Subcategory.updateOne({_id: id}, {img: file.filename});

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

                let category = new Subcategory({
                    category_id,
                    img: image_id,
                    title,
                    subtitle,
                    description,
                    articles_count: null,
                });
                await category.save();

                res.status(200).json({category, description: 'Подкатегория Создана!'});
            } else {
                let category = new Subcategory({
                    category_id,
                    img: '',
                    title,
                    subtitle,
                    description,
                    articles_count: null,
                });
                await category.save();

                res.status(200).json({category, description: 'Подкатегория Создана!'});
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

            let category = await Subcategory.find({_id: id});
            if (!category) return;
            let updated = await Subcategory.updateOne({_id: id}, {$set: data});

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
            let category = await Subcategory.find({_id: id});

            await deleteFileStream(category[0].img);
            await Subcategory.updateOne({_id: id}, {img: ''});

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

            await Subcategory.findOneAndDelete({_id: id});
            await Article.deleteMany({subcategory_id: id});

            res.status(200).json({description: 'Deleted Successfully!'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


module.exports = router;
