var empty= function(){
$(".articlesHeadlines").empty();
}
empty();


//Grab the articles as a json   
$.getJSON("/all", function(data) {

   // for each one
    for (var i = 0; i < 25; i++) {



   $(".articlesHeadlines").append("<p><span class='title'>" + data[i].title + "</span><button type='button'" + "class='btn btn-primary testBtn'" + "data-toggle='modal'" + "data-target='#exampleModal'"+"</button>" + "</p>");
  
   $(".testBtn").text("Save Article").attr("href", data[i].link).attr("value", data[i].title)
    }



   $(".testBtn").click(function(){

    var title = $(".testBtn").val();
    console.log(title);
    var link = $(".testBtn").attr("href");
    console.log(link);

    $.ajax({
        type:"POST",
        url:"/saved",
        data:{
            title: title,
            link: link
        }
    });
    

   



     




    })
});