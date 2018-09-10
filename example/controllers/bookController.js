var bookController = function(Book){
    var post = function (req, res) {
        let book = new Book(req.body)

        book.save()
        res.status(201).send(book)
    }

    var get = function (req, res) {
        let query = {}

        if (req.query.genre)
            query.genre = req.query.genre

        Book.find(query, function (err, book) {
            if (err) res.status(500).send(err)
            res.json(book)
        })
    }

    var getId = function (req, res) {
        res.json(req.book)
    }

    var putId = function (req, res) {
        req.book.title = req.body.title
        req.book.author = req.body.author
        req.book.genre = req.body.genre
        req.book.read = req.body.read
        req.book.save()
        res.json(req.book)
    }

    var patchId = function (req, res) {
        if (req.body._id)
            delete req.body._id
        for (let p in req.body) {
            req.book[p] = req.body[p]
        }

        req.book.save(function (err) {
            if (err)
                res.status(500).send(err)
            else
                res.json(req.book)
        })
    }


    var deleteId = function (req, res) {
        req.book.remove(function (err) {
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

        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err)
            }
            else if (book) {
                req.book = book
                next()
            }
            else {
                res.status(404).send("no found book")
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

module.exports = bookController