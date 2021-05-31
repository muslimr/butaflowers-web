const {Router} = require('express');
const Article = require('../../models/Catalog/Article');
const router = Router();


router.get(
    '/list',
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
    async (req, res) => {
        try {
            const {
                category_id,
                subcategory_id,
                img,
                title,
                subtitle,
                description
            } = req.body.params;

            let article = new Article({
                category_id,
                subcategory_id,
                article_num: null,
                img,
                title,
                subtitle,
                description
            });
            await article.save();

            res.status(200).json({article, description: 'Added Successfully'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)


router.put(
    '/edit',
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
