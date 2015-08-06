$(function() {

    //This is used to get the users search input
    $("#search").submit(function(event) {
        event.preventDefault();
        var searchTerm = $("#query").val();
        var previous = $(".result-box").length;
        console.log(previous);

            if (previous > 0) {
                $(".search-container").hide("fade", "slow").empty();
                $("#current-search").hide("blind", 500).empty();
                getRequest(searchTerm);
            }
            else {
                getRequest(searchTerm);
            }
        
    });

});


//This requests the data package from the site and calls the showResults function
function getRequest(searchTerm) {
        var url = "https://www.googleapis.com/youtube/v3/search";
        var params = {
            part: 'snippet',
            q: searchTerm,
            type: 'video',
            lr: 'en',
            maxResults: 40,
            fields: "items(id,snippet(title))",
            key: "AIzaSyBlEuyTfWft-SGXTn0gYJ_cT6WJVJrtKdg"
        };
    
        $.getJSON(url, params, function(data) {
            console.log(data);
            showResults(data.items);
        });
}
    
//This goes through the data package and for each item it creates div with video link and thumbnail
function showResults(results) {
        
    $.each(results, function(index,value) {

        var vidid = value.id.videoId;
        var vidtitle = value.snippet.title;
        var vidurl = "http://www.youtube.com/watch?feature=player_embedded&v=" + vidid;
        var viddiv = '<div class="result-box"><div class="inner-box"><div class="inner-img"><a class="yt-video" href="http://www.youtube.com/watch?feature=player_embedded&v=' + vidid + '" target="external"><img src="http://img.youtube.com/vi/' + vidid + '/0.jpg" alt="video" width="240" height="180"/></a></div><div class="title-div"><h3 class="vid-title"><a class="yt-video" href="' + vidurl + '">' + vidtitle + '</a></h3></div></div></div>';
        
            
        $(".search-container").append(viddiv).hide().show("fade", "slow");
    });
        //This shows the user what value they just searched for and returns the search field to blank
        var currentQuery = $("#query").val();
        var currentDisplay = '<div><h4 class="current-term">Search results for "' + currentQuery + '"';
        $("#current-search").append(currentDisplay).hide().show("blind", 500);
        $("#query").val('').focus();
    
    
}

        