const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })


router.get(
    '/',
    // auth,
    async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories.reverse());
            // console.log(catalog)
        } catch(e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
)


router.post(
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {img, title, subtitle} = req.body.data;
            const category = new Category({
                img, title, subtitle
            });

            await category.save();

            res.status(201).json({category});
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
