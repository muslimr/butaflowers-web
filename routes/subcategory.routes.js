const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
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
            let subcategories = await Subcategory.find({category_id: ID});
            let data = subcategories.reverse();
            for (let index in subcategories) {
                let articles = await Article.find({subcategory_id: subcategories[index]._id})
                subcategories[index].articles_count = articles.length;
            }

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
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {category_id, img, title, subtitle, description} = req.body.params;
            let category = new Subcategory({category_id, img, title, subtitle, description, articles_count: null});
            await category.save();

            res.status(200).json({category, description: 'Added Successfully'});
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
    '/delete',
    // auth,
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
