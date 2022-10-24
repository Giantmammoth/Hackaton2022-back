const Joi = require("joi");
const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId;


const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, default: Date.now },
    type: { type: String, required: true },
    bookName: {type: String, required: true},
    bookPath: {type: String, required: true},
    bookType: {type: String, required: true},
    bookSize: {type: String, required: true},
    user:  { type: ObjectId, required: true } ,
    userName: {type: String, required: false},
    isPrivate: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);