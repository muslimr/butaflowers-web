const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = Router();


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
            const {img, title} = req.body.data;
            const category = new Category({
                img, title
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
