const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const path = require('path');




router.get(
    '/',
    // auth,
    async (req, res) => {
        try {
            let data = await Category.find();

            res.json({status: 'success', data});
            // res.json({data: data});
            res.status(200).json();
        } catch(e) {
            // res.json({description: 'Please wait a few minutes before you try again'});
            res.status(500).json();
        }
    }
)


router.post(
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {img, title, subtitle} = req.query.data;
            let category = new Category({img, title, subtitle});

            await category.save();
            res.status(200).json({category, message: 'Added Successfully'});
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)


module.exports = router;
