const express = require('express')

var routes = function (Obj, nameController) {
    var genericRouter = express.Router()
    var genericController = require('../controllers/genericController')(Obj, nameController, { propietiesQuery: ['name','age','genre']})

    genericRouter.route('/')
        .post(genericController.post)
        .get(genericController.get)

    genericRouter.use('/:genericId', genericController.middleware)

    genericRouter.route('/:genericId')
        .get(genericController.getId)
        .put(genericController.putId)
        .patch(genericController.patchId)
        .delete(genericController.deleteId)

    return genericRouter
}

module.exports = routes