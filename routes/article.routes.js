const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
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
            let data = await Article.find({parentId: ID});

            res.status(200).json({data});
        } catch(e) {
            res.status(500).json({description: 'Please wait a few minutes before you try again'});
        }
    }
)


// router.get(
//     '/info',
//     // auth,
//     async (req, res) => {
//         try {
//             let ID = req.query.id;
//             let data;
//             if (ID) {
//                 let categoryInfo = await Subcategory.find({_id: ID});
//                 data = categoryInfo[0];
//             } else {
//                 data = {}
//             }
//
//             res.status(200).json({data});
//         } catch(e) {
//             res.status(500).json({description: 'Please wait a few minutes before you try again'});
//         }
//     }
// )
//
//

router.post(
    '/add',
    // auth,
    async (req, res) => {
        try {
            const {parentId, img, title, subtitle, description} = req.body.params;
            let article = new Article({parentId, img, title, subtitle, description});
            await article.save();

            res.status(200).json({article, description: 'Added Successfully'});
        } catch(e) {
            res.status(500).json({description: 'Something went wrong'});
        }
    }
)
//
//
// router.put(
//     '/edit',
//     // auth,
//     async (req, res) => {
//         try {
//             let {id, data} = req.body;
//             let category = await Subcategory.find({_id: id});
//             if (!category) return;
//             let updated = await Subcategory.updateOne({_id: id}, {$set: data});
//
//             res.status(200).json({updated, description: 'Updated successfully'});
//         } catch(e) {
//             res.status(500).json({description: 'Invalid data. PLease try again.'});
//         }
//     }
// )
//
//
// router.delete(
//     '/delete',
//     // auth,
//     async (req, res) => {
//         try {
//             const {id} = req.query;
//             await Subcategory.findOneAndDelete({_id: id});
//
//             res.status(200).json({description: 'Deleted Successfully!'});
//         } catch(e) {
//             res.status(500).json({description: 'Something went wrong'});
//         }
//     }
// )


module.exports = router;
