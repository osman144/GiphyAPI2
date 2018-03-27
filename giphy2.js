$(document).ready(function(){
    //Creating variables

    let themes = ['messi','lebron','phelps','tiger woods','federer','john wick','usain bolt','jackie chan'];
    function renderButtons(){
        $("#sportsbutton").empty();
        for (i in themes){
            let button = `<button type="button" class="sportButtons" value= "${themes[i]}">${themes[i]}</button>`;
            $('#sportsbutton').append(button);

        }
    }
    renderButtons();


    //Creating buttons
    $("#addPlayer").on("click", function(event) {

        event.preventDefault();
        //Trying to prevent submit button from submitting with prevent default 
        let userInput = $("#player-input").val().trim();  
        themes.push(userInput);
        renderButtons();

    });


    //Access Giphy API 
    $(document).on("click",".sportButtons",function() {


        $("#inner").empty();
        let playerName = $(this).val();

        let queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + playerName + "&api_key=rIQtqBsnwS9APOr97WLCDTut7pW8ETYu&limit=10");
        queryURL.done(function(response) { 
        console.log("success got data", response);
        
        let jiffs = response.data
        
        for (i in jiffs){
            let gif = `<div class="panel panel-primary col-md-4 col-sm-4 col-xs-6">
            <img class="gif img-circle col-md-12"  data-name="${i}" src="${jiffs[i].images.original.url}" alt="${playerName}" width="250px" height="250px">
            <h3 class="col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3"><span class="label label-primary">${response.data[i].rating}</span></h3>
            <a class="button col-md-offset-3 col-md-3 col-sm-offset-3 col-sm-3 col-xs-offset-3 col-xs-3" href="${jiffs[i].images.original.url}" download="${playerName}.jpg"><span class="glyphicon glyphicon-download-alt"></span></a>
            </div>`;
            //$('.inner').append("<img src= '" +jiffs[i].images.original.url + "' style='height:200px; width:200px; '/>");
            $('#inner').append(gif);
            }


        $(document).on('click', '.gif', function() {
            var src = $(this).attr("src");
            if($(this).hasClass('playing')){
                //stop
                $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
                $(this).removeClass('playing');
            } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
            }
        });
        }
    );


});

});


