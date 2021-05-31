const {Router} = require('express');
const Category = require('../../models/Catalog/Category');
const Subcategory = require('../../models/Catalog/Subcategory');
const Article = require('../../models/Catalog/Article');
const router = Router();

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const {uploadFile, getFileStream, deleteFileStream} = require('../../../s3');



router.get(
    '/images/:key',
    async (req, res) => {
        try {
            const key = req.params.key;
            const readStream = await getFileStream(key);

            readStream.pipe(res);
            // res.write(readStream,'binary');
        } catch (e) {
            res.status(500).json({description: 'Please wait a few minutes before you try again'});
        }

})


router.get(
    '/list',
    async (req, res) => {
        try {
            let data = await Category.find();
            let categories = data.reverse();
            for (let index in categories) {
                let articles = await Article.find({category_id: categories[index]._id})
                categories[index].articles_count = articles.length;
            }

            res.status(200).json({categories});
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
                let categoryInfo = await Category.find({_id: ID});
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
            await Category.updateOne({_id: id}, {img: file.filename});

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
            const {img, title, subtitle, description} = req.query;

            if (req.file.filename) {
                const file = req.file;
                let image_id = req.file.filename;

                await uploadFile(file);
                await unlinkFile(file.path);

                let category = new Category({
                    img: image_id,
                    title,
                    subtitle,
                    description,
                    articles_count: null,
                });
                await category.save();

                res.status(200).json({category, description: 'Категория Создана!'});
            } else {
                let category = new Category({
                    img: '',
                    title,
                    subtitle,
                    description,
                    articles_count: null,
                });
                await category.save();

                res.status(200).json({category, description: 'Категория Создана!'});
            }
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again'});
        }
    }
)


router.put(
    '/edit',
    async (req, res) => {
        try {
            let {id, data} = req.body;
            let category = await Category.find({_id: id});
            if (!category) return;
            let updated = await Category.updateOne({_id: id}, {$set: data});

            res.status(200).json({updated, description: 'Категория изменена!'});
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
            let category = await Category.find({_id: id});

            await deleteFileStream(category[0].img);
            await Category.updateOne({_id: id}, {img: ''});

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
            let category = await Category.find({_id: id});

            await deleteFileStream(category[0].img);
            await Category.findOneAndDelete({_id: id});
            await Subcategory.deleteMany({category_id: id});
            await Article.deleteMany({category_id: id});

            res.status(200).json({description: 'Категория Удалена!'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


module.exports = router;
