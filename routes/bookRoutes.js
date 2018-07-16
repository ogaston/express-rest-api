const express = require('express')

var routes = function(Book){
    var bookRouter = express.Router()
    var bookController = require('../controllers/bookController')(Book)
    
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get)

    bookRouter.use('/:bookId', bookController.middleware)

    bookRouter.route('/:bookId')
        .get(bookController.getId)
        .put(bookController.putId)
        .patch(bookController.patchId)
        .delete(bookController.deleteId)

    return bookRouter
}

module.exports = routes