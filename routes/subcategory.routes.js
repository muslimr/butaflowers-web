const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
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
            let ID = req.query.id;
            let data = await Subcategory.find({parentId: ID});

            res.json({data});
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
            const {img, title, subtitle, parentId} = req.body.params;
            let category = new Subcategory({img, title, subtitle, parentId});
            await category.save();

            res.status(200).json({category, message: 'Added Successfully'});
        } catch(e) {
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
            await Subcategory.findOneAndDelete({_id: id});

            res.status(200).json({message: 'Deleted Successfully!'});
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)


module.exports = router;
