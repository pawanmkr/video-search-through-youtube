

//grabbing the input from search bar

var inputBox = document.getElementById("searchbox");

    inputBox.addEventListener("keyup", function(event){

        var keyword = document.querySelector('input').value;

        if(event.which === 13){
            
            clean();
            ytapi(keyword);
        }
    
    })


function clean() {
    document.querySelector(".result-container").innerHTML = " ";
}

function ytapi(term){
    // youtube API

    var extrapikey = 'AIzaSyD-poVhcjw9AEhoeZqMS4l1_kzJ0eLQM_8';
    var apikey = 'AIzaSyABMT2SmB2LDKAOT_edm93OszDSWCQCHyQ';
    var resultperpage = 1000;
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key='+ extrapikey + '&q='+ term +'&maxResults='+ resultperpage;

    var youtube = new XMLHttpRequest;
    youtube.open('GET', url);
    youtube.send();

    youtube.addEventListener('load', function(event){
            
        var data  = event.target.response;
        pushtodom(data);
    });

}


//showing the results

function pushtodom(parameter){
    var response = JSON.parse(parameter);
    console.log(response);
    var cycle = response.items;

    var cardbox = document.querySelector(".result-container");

    cycle.forEach(function(item){
        console.log("done");
        var thumbnailURL = item.snippet.thumbnails.medium.url;
        var videoTitle = item.snippet.title;
        var id = item.id.videoId;
        
        var card = document.createElement('div');
        card.classList.add("card");
        cardbox.appendChild(card);


        //thumbnail
        var clickableImage = document.createElement('a');
        clickableImage.href = "https://www.youtube.com/watch?v="+ id;
        clickableImage.target = "_blank";
        clickableImage.classList.add("clickableImage");
        card.appendChild(clickableImage);

        var thumbnail = document.createElement('img');
        thumbnail.src = thumbnailURL;
        clickableImage.appendChild(thumbnail);
        


        //title
        var title = document.createElement('div');
        title.classList.add("video-title");
        card.appendChild(title);

        var hyperLink = document.createElement('a');
        hyperLink.href = "https://www.youtube.com/watch?v="+ id;
        hyperLink.target = "_blank";
        hyperLink.innerHTML = videoTitle;
        title.appendChild(hyperLink);

    })
}