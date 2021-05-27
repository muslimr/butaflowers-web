const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Article = require('../models/Article');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const path = require('path');




router.get(
    '/list',
    // auth,
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
    // auth,
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
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {category_id, subcategory_id, img, title, subtitle, description} = req.body.params;
            let categories = await Category.find();
            let category_index = categories.length;
            let subcategories = await Subcategory.find();
            let subcategory_index = subcategories.length;
            let articles = await Article.find();

            let article_num = category_index + "" + subcategory_index + "" + articles.length;
            let article = new Article({category_id, subcategory_id, article_num, img, title, subtitle, description});
            await article.save();

            res.status(200).json({article, description: 'Added Successfully'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


router.put(
    '/edit',
    // auth,
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
    '/delete',
    // auth,
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
