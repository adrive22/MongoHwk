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
    request("https://www.npr.org/sections/news/", function(error, response, html){
        console.log(html);
        //set up cheerio request for the html into a variable
        var $ = cheerio.load(html);
  
        
        $(".title").each(function(i, element){
            //saving the text and href of each link enclosed in thec current element that has a title class
            var title = $(element).children("a").text();
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
