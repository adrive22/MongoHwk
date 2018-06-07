var empty= function(){
$(".articlesHeadlines").empty();
}
empty();


//Grab the articles as a json   
$.getJSON("/all", function(data) {

   // for each one
    for (var i = 0; i < 25; i++) {

//        // Display the info on the html
//         $(".articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title +"<br />" + data[i].link + "</p");
//    }


   $(".articlesHeadlines").append("<p>" + data[i].title + "</p>" + "<button type='button'" + "class='btn btn-primary testBtn'" + "data-toggle='modal'" + "data-target='#exampleModal'"+"</button>");
   $(".testBtn").text("Article Comments");
   
    }
});