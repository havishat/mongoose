// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotingdojo');
var QuoteSchema = new mongoose.Schema({
    name: {type: String},
    quote: {type: String},
}, {timestamps: true})
   mongoose.model('quotes', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    Quote.create(req.body, function(err){
        if(err) { console.log(err); }
        res.redirect('/quotes');
    // This is where we would add the user from req.body to the database.
    })
})

app.get('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    Quote.find({}, function(err, results) {
        // Retrieve an array of users
        // This code will run when the DB is done attempting to retrieve all matching records to {}
        if(err) { 
            console.log("could not retrieve data") 
        } else { 
            console.log(results)
            res.render('quotes', {quotes: results}); 
            }
        })
        
        // Quote.remove({}, function(err){
        //     // This code will run when the DB has attempted to remove all matching records to {}
        //     res.render('quotes'); 
        //    })
           
    // This is where we would add the user from req.body to the database.
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})