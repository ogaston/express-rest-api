var controller = function(Obj, nameController, opts = {}){

    options = {
        queryParamsAllow: opts.queryParamsAllow ? opts.queryParamsAllow : true ,
        propietiesQuery: opts.propietiesQuery ? opts.propietiesQuery: [],
    }

    var validation = function (req) {
        let query = {}

        if (options.queryParamsAllow) {
            options.propietiesQuery.forEach(element => {
                if (typeof req.query[element] !== "undefined")
                    query[element] = req.query[element]
            });
        }

        return query
    }

    var post = function (req, res) {
        let genericObj = new Obj(req.body)
        
        genericObj.save()
        res.status(201).send(genericObj)
    }

    var get = function (req, res) {
        
        let query = validation(req)

        Obj.find(query, function (err, generic) {
            if (err) res.status(500).send(err)
            res.json(generic)
        })
    }

    var getId = function (req, res) {
        res.json(req.generic)
    }

    var putId = function (req, res) {
        for (let p in req.body) {
            req.generic[p] = req.body[p]
        }
        req.generic.save()
        res.json(req.generic)
    }

    var patchId = function (req, res) {
        if (req.body._id)
            delete req.body._id
        for (let p in req.body) {
            req.generic[p] = req.body[p]
        }

        req.generic.save(function (err) {
            if (err)
                res.status(500).send(err)
            else
                res.json(req.generic)
        })
    }

    var deleteId = function (req, res) {
        req.generic.remove(function (err) {
            if (err)
                res.status(500).send(err)
            else
                res.status(204).send('removed')
        })
    }

    var middleware = function (req, res, next) {

        req.nameController = nameController

        Obj.findById(req.params.genericId, function (err, generic) {
            if (err) {
                res.status(500).send( req.nameController + "GenericController ERR|| " + err)
            }
            else if (generic) {
                req.generic = generic
                next()
            }
            else {
                res.status(404).send("no found " + req.nameController)
            }
        })
    }

    return {
        controllerName: nameController,
        post: post,
        get: get,
        getId: getId,
        putId: putId,
        patchId: patchId,
        deleteId: deleteId,
        middleware: middleware
    }

}

module.exports = controller