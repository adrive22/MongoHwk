var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//initialize express
var app = express();

//connecting mongojs configuration to the db variable
var db = require("./models");

var PORT = 3000;

//configure middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//setting up mongoose to use promises instead of callbacks and connecting to mongo db
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI); 


//Routes






//GET route for scraping npr
app.get("/scrape", function(req, res) {
    request("https://www.npr.org/sections/news/", function(error, response, html){
        console.log(html);
        //set up cheerio request for the html into a variable
        var $ = cheerio.load(html);
  
        
        $(".title").each(function(i, element){
        //save an empty result object 
        var result={};

        //adding the text and href of every link and save them as properties of the result object
        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        db.Article.create(result)
        .then(function(dbArticle) {
            console.log(dbArticle);
        })
        .catch(function(err){
            return res.json(err);
        });
    });
    
 });

res.send("scrape complete");
});



//retrieve data from the database
app.get("/all", function(req,res) {
    db.Article.find({})
    //then send them back to the Article Model (client)
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    //if there is an error send to the client
    .catch(function(err){
        res.json(err);
    })
});



app.post("/saved", function(req,res){ 
    db.Saved.create(req.body)
        .then(function(dbSaved) {
            console.log(dbSaved);
        })
        .catch(function(err){
            return res.json(err);
        });
});



app.get("/saved", function(req, res){
    db.Saved.find({})
    .then(function(dbSaved){
        res.json(dbSaved);
    })
    .catch(function(err){
        res.json(err);
    })
});
    

app.listen(3000, function(){
    console.log("App running on port 3000!");
});