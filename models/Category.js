const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    img: {type: String, default: false},
    title: {type: String, required: true},
    subtitle: {type: String},
}, { versionKey: null });

module.exports = model('Category', schema);
