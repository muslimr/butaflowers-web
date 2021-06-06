const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    phone: {type: String},
});

module.exports = model('NodeMail', schema);
