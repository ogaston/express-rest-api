var authorController = function(Author){
    var post = function (req, res) {
        let author = new Author(req.body)

        author.save()
        res.status(201).send(author)
    }

    var get = function (req, res) {
        let query = {}

        if (req.query.genre)
            query.genre = req.query.genre

        author.find(query, function (err, author) {
            if (err) res.status(500).send(err)
            res.json(author)
        })
    }

    var getId = function (req, res) {
        res.json(req.author)
    }

    var putId = function (req, res) {
        req.author.title = req.body.title
        req.author.author = req.body.author
        req.author.genre = req.body.genre
        req.author.read = req.body.read
        req.author.save()
        res.json(req.author)
    }

    var patchId = function (req, res) {
        if (req.body._id)
            delete req.body._id
        for (let p in req.body) {
            req.author[p] = req.body[p]
        }

        req.author.save(function (err) {
            if (err)
                res.status(500).send(err)
            else
                res.json(req.author)
        })
    }


    var deleteId = function (req, res) {
        req.author.remove(function (err) {
            if (err)
                res.status(500).send(err)
            else
                req.status(204).send('removed')
        })
    }

    var middleware = function (req, res, next) {
        let query = {}

        if (req.query.genre) {
            query.genre = req.query.genre
        }

        author.findById(req.params.authorId, function (err, author) {
            if (err) {
                res.status(500).send(err)
            }
            else if (author) {
                req.author = author
                next()
            }
            else {
                res.status(404).send("no found author")
            }
        })
    }

    return {
        post: post,
        get: get,
        getId: getId,
        putId: putId,
        patchId: patchId,
        deleteId: deleteId,
        middleware: middleware
    }

}

module.exports = authorController