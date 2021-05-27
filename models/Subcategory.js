const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    category_id: {type: String, required: true},
    img: {type: String, default: false},
    title: {type: String, required: true},
    subtitle: {type: String},
    description: {type: String},
}, { versionKey: null });

module.exports = model('Subcategory', schema);
