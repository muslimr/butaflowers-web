const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Subcategory = require('../models/Subcategory');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const path = require('path');




router.get(
    '/',
    // auth,
    async (req, res) => {
        try {
            let data;
            let ID = req.query?.data?.id;
            if (ID) {
                data = await Subcategory.find({parentId: ID})
            } else {
                data = await Category.find()
            }

            res.json({data, status: 'success'});
            res.status(200).json();
        } catch(e) {
            res.json({status: 'error', description: 'Please wait a few minutes before you try again'});
            res.status(500).json();
        }
    }
)


router.post(
    '/add',
    // auth,
    async (req, res) => {
        try {
            console.log('QUERY', req.query)
            const {img, title, subtitle, parentId} = req.query.data;

            let category;
            if (parentId) {
                category = new Subcategory({img, title, subtitle, parentId});
            } else {
                category = new Category({img, title, subtitle});
            }

            await category.save();

            res.status(200).json({category, message: 'Added Successfully'});
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)



router.post(
    '/delete',
    // auth,
    async (req, res) => {
        try {
            const {id} = req.body.data;
            // const category = new Category({
            //     img, title
            // });
            //
            // await category.save();

            // res.status(201).json({category});
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)


module.exports = router;
