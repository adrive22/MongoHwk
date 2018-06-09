// var empty = function(){
    
//     $(".articlesHeadlines").empty();
// empty();
// }

//Grab the articles as a json   

$(".getHeadlines").click(function(req, res){

   

    $.get("/scrape", function(){
        req.body
    })

    


$.getJSON("/all", function(data) {

   // for each one
    for (var i = 0; i < data.length; i++) {



   $(".articlesHeadlines").append("<p><span" + "class='title'>" + data[i].title + "</span><button type='button'" + "class='btn btn-info testBtn'" + "href="+ data[i].link + "</button>" + "</p>");
  
   $(".testBtn").text("Save Link").attr("data-id", data[i]._id);
    
    }




   $(".testBtn").click(function(){
    var link=$(".testBtn").attr("href");
    console.log(link);
    
    

    $.ajax({
        type:"POST",
        url:"/saved",
        data:{
            link: link
        }
    
    })
});
});
});

$(".savedArticlesBtn").click(function(){
    $.getJSON("/saved", function(data){
        for (var i = 0; i < data.length; i++) {

        $(".savedArticlesHtml").append("<p>" + data[i].link + "</p>");
        }
    })

       

    })






