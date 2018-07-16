var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var bookModel = new Schema({
    title: String,
    genre: String,
    author: String,
    read: { type: Boolean, default: false },
})

module.exports = mongoose.model('Book', bookModel)


