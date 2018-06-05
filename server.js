var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

//initialize express
var app = express();

//database configuration for scraped data
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//connecting mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

//Setting Up Routes

//homepage
app.get("/", function(req, res) {
    res.send("Hello world");
});

//retrieve data from the database
app.get("/all", function(req,res) {
    db.scrapedData.find({}, function(error,found) {

    if (error){
        console.log(error);
    }
    else {
        res.json(found);
    }
    });
});

app.get("/scrape", function(req, res) {
    request("https://www.thedailybeast.com/", function(error, response, html){
        //set up cheerio request for the html into a variable
        var $ = cheerio.load(html);
  
        //grabbing each element with a "title class"
        $(".HorizontalStory__content").each(function(i, element){
            //saving the text and href of each link enclosed in thec current element that has a title class
            var title = $(element).children("a.h2").text();
            var link = $(element).children("a").attr("href");

            //console the results to check class
            console.log(title);
            console.log(link);
      
        
        //if this found element had both a title and a link
        if (title && link){
            //insert the data in the scrapedData database
        }
        db.scrapedData.insert({
            title: title,
            link: link
        },
        //log the error if there is one or log the inserted data
        function(err, inserted){
            if (err){
                console.log(err);
            }
            else{
                console.log(inserted);

            }
            });
        
        });
    
 });

res.send("scrape complete");
});

app.listen(3000, function(){
    console.log("App running on port 3000!");
});