const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    img: {type: String, default: false},
    title: {type: String, required: true},
});

module.exports = model('Category', schema);
