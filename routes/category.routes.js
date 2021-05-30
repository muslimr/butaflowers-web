const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Article = require('../models/Article');
const auth = require('../middleware/auth.middleware');
const router = Router();
const path = require('path');


const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const {uploadFile} = require('../s3');


router.post(
    '/images',
    upload.single('image'),
    async (req, res) => {
        const file = req.file;
        console.log(req);

        const result = await uploadFile(file);
        console.log(result);

        // await unlinkFile(file.path)

        const description = req.body.description;
        res.send("sdsdsd")
    }
)


router.get(
    '/list',
    // auth,
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
    // auth,
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
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {img, title, subtitle, description} = req.body.params;
            if (title) {
                let category = new Category({img, title, subtitle, description, articles_count: null});
                await category.save();
                res.status(200).json({category, description: 'Added successfully'});
            } else {
                return null
            }
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again'});
        }
    }
)


router.put(
    '/edit',
    // auth,
    async (req, res) => {
        try {
            let {id, data} = req.body;
            let category = await Category.find({_id: id});
            if (!category) return;
            let updated = await Category.updateOne({_id: id}, {$set: data});

            res.status(200).json({updated, description: 'Updated successfully'});
        } catch(e) {
            res.status(500).json({description: 'Invalid data. PLease try again.'});
        }
    }
)


router.delete(
    '/delete',
    // auth,
    async (req, res) => {
        try {
            const {id} = req.query;
            await Category.findOneAndDelete({_id: id});
            await Subcategory.deleteMany({category_id: id});
            await Article.deleteMany({category_id: id});

            res.status(200).json({description: 'Deleted Successfully!'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


module.exports = router;
