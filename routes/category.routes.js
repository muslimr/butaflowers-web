const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const path = require('path');


router.get(
    '/list',
    // auth,
    async (req, res) => {
        try {
            let data = await Category.find();
            let categories = data.reverse();

            res.json({categories});
            res.status(200).json();
        } catch(e) {
            res.json({description: 'Please wait a few minutes before you try again'});
            res.status(500).json();
        }
    }
)


router.post(
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {img, title, subtitle} = req.body?.params;
            let category = new Category({img, title, subtitle});

            await category.save();
            // res.json({status: 'success', data, description: 'Added successfully'});
            res.status(200).json({category, message: 'Added Successfully'});
        } catch(e) {
            // res.json({status: 'error', description: 'Invalid data. PLease try again.'});
            res.status(500).json({message: 'Something went wrong'});
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
            await Subcategory.deleteMany({parentId: id});

            res.status(200).json({message: 'Deleted Successfully!'});
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)


module.exports = router;
