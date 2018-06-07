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


//             var title = $(element).children("a").text();
//             var link = $(element).children("a").attr("href");
        

//             //console the results to check class
//             console.log(title);
//             console.log(link);
      
        
//         //if this found element had both a title and a link
//         if (title && link){
//             //insert the data in the scrapedData database
//         }
//         db.scrapedData.insert({
//             title: title,
//             link: link
//         },
//         //log the error if there is one or log the inserted data
//         function(err, inserted){
//             if (err){
//                 console.log(err);
//             }
//             else{
//                 console.log(inserted);

//             }
//             });
        
//         });
    
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

   




app.listen(3000, function(){
    console.log("App running on port 3000!");
});