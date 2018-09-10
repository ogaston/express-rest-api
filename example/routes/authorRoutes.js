const express = require('express')

var routes = function(Author){
    var authorRouter = express.Router()
    var authorController = require('../controllers/authorController')(author)
    
    authorRouter.route('/')
        .post(authorController.post)
        .get(authorController.get)

    authorRouter.use('/:authorId', authorController.middleware)

    authorRouter.route('/:authorId')
        .get(authorController.getId)
        .put(authorController.putId)
        .patch(authorController.patchId)
        .delete(authorController.deleteId)

    return authorRouter
}

module.exports = routes