var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var authorModel = new Schema({
    name: String,
    genre: String,
    age: Number,
    country: String,
    active: { type: Boolean, default: true },
})

module.exports = mongoose.model('author', authorModel)


