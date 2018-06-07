
//Grab the articles as a json   
$.getJSON("/all", function(data) {

    //for each one
    for (var i = 0; i < data.length; i++) {

        //Display the info on the html
        $(".articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title +"<br />" + data[i].link + "</p");
    }

 });