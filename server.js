const   express = require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser')

const app = express()
const db = mongoose.connect('mongodb://localhost/bookAPI')
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var Book = require('./models/bookModel')
var Author = require('./models/authorModel')

var bookRouter = require('./routes/bookRoutes')(Book)
var authorRouter = require('./routes/genericRoutes')(Author, "Author")

app.use('/api/books', bookRouter)
app.use('/api/author', authorRouter)


app.get('/', function(req, res){
    res.send('Welcome to my api, Page')
})

app.listen(port, function(){
    console.log('Gulp is running on port' + port)
})