// javascript for results screens

let urlParams = window.location.href;
let url = new URL(urlParams);
var sessionId = '-LAFaDTTqX7WRhy4KmeD';
//var sessionId = url.searchParams.get("session");
//Checks to see if a session key was provided. Sends the user to a 404 page if it was not.
(sessionId)? null : window.location.replace("/404.html");



var restaurantName = ["Restaurant A","Restaurant B","Restaurant C","Restaurant D","Restaurant E"]
var restaurantVotes = [0,0,0,0,0];
var setWidth = [];
var counter = 0;
var results;
var urlQuery = "https://letshavelunchserver.herokuapp.com/api/"+sessionId+"/get_res";
let total_votes;

// ajax call to get get data from server/api
$.ajax( {
    url: urlQuery,
    method: "GET"
    })
    .then(function(response) {
        results = response;

        console.log(response);
        total_votes = Object.values(results.votes).reduce((acc, cur) => acc + cur);
        // put information returned from call into variable "results"

        console.log(results);
        // logic to check if any of the candidate restaurants received five votes
        // If yes, it will call the function that shows a consensus choice
        // If there are zero, or two or more, restaurants with five votes, it calls another function that will render info for multiple restaurants as progress bars.

        console.log(total_votes);
        for (var i = 0; i < Object.values(results.votes).length; i++) {
            if (Object.values(results.votes)[i] === 5) {
                counter++;
            }
        };
        // Changed to false for testing purposes
        if (false) {
            resultsTwo();
        }
            else {
            console.log("at call to resultsOne function");
            resultsOne();
        };
    });

// This function is fired when there is one restaurant with 5 votes
function resultsTwo() {
    // this section does a double loop that associates selected restaurant (ie, the one with five votes) with its
    // name, address, rating and could easily pick up other pieces of information.  It stores that info in variables.
    for (var i = 0; i < Object.values(results.votes).length; i++) {
        if (Object.values(results.votes)[i] === 5) {
            var winnerCode = Object.keys(results.votes)[i];
            for (j = 0; j < results.locations.length; j++) {
                if (results.locations[j].place_id === winnerCode) {
                    var winnerName = results.locations[j].name;
                    var winnerAddress = results.locations[j].address;
                    var winnerRating = results.locations[j].rating;

                };
            };
        };
    };
    // This section loops through the images and identifies the image associated with the selected restaurant
    // and stores it in a variable
    for (var k = 0; k < Object.keys(results.images); k++) {
        if (Object.keys(results.images)[k] === winnerCode) {
            winnerImage = Object.values(results.images)[k];
        };
    };
    //  the following statements insert the name, address, rating and image of the selected restaurant into the html.
    document.getElementById("selection").innerText = winnerName;
    document.getElementById("selection-address").innerText = winnerAddress;
    document.getElementById("selection-rating").innerText = winnerRating;
    document.getElementById("selection-image").setAttribute("src", winnerImage);
};

// This function fires if no restaurant gets 5 votes or if more than one gets five votes.
function resultsOne() {
    // This section does a double loop through the votes object and the locations array and
    // associates restaurant names with the numbers of votes each restaurant received
    console.log("inside the resultsOne function");
    console.log(Object.keys(results.votes).length);
    console.log(results.locations.length);
    for (var i = 0; i < Object.keys(results.votes).length; i++) {
        for (var j = 0; j < results.locations.length; j++) {
            if (Object.keys(results.votes)[i] === results.locations[j].place_id) {
                restaurantName[i] = results.locations[j].name;
                restaurantVotes[i] = Object.values(results.votes)[i];
            };
        };
    };
    // The following code puts restaurant names into html sections associated with progress bars
    // that show the votes (as a percentage) for each restaurant
    console.log(restaurantName);
    console.log(restaurantVotes);
    createRes(restaurantName);
    for (var k = 0; k < restaurantName.length; k++) {
        // if (k === 0) {
        //     document.getElementById("rest-1").innerText = restaurantName[k];
        // } else if (k === 1) {
        //     document.getElementById("rest-2").innerText = restaurantName[k];
        // } else if (k === 2) {
        //     document.getElementById("rest-3").innerText = restaurantName[k];
        // } else if (k === 3) {
        //     document.getElementById("rest-4").innerText = restaurantName[k];
        // } else if (k === 4) {
        //     document.getElementById("rest-5").innerText = restaurantName[k];
        // }

         document.getElementById("rest-"+k).innerText = restaurantName[k];

    };
    // This section computes the percent of votes to show on progress bar
    for (var m = 0; m < restaurantVotes.length; m++) {
        var temp = Math.round(restaurantVotes[m] / total_votes *100);
        console.log("the percent for restaurant " + m + " is " + temp);
        setWidth[m] = "width: " + temp +"%";
        console.log(setWidth[m]);
    };
    // This section puts calculated perceentages into progress bars
    for (var n = 0; n < restaurantVotes.length; n++) {
        // if (n === 0) {
        //     document.getElementById("width-1").setAttribute("style", setWidth[n]);
        // } else if (n === 1) {
        //     document.getElementById("width-2").setAttribute("style", setWidth[n]);
        // } else if (n === 2) {
        //     document.getElementById("width-3").setAttribute("style", setWidth[n]);
        // } else if (n === 3) {
        //     document.getElementById("width-4").setAttribute("style", setWidth[n]);
        // } else  {
        //     document.getElementById("width-5").setAttribute("style", setWidth[n]);
        // };
        document.getElementById("width-"+n).setAttribute("style", setWidth[n]);
    };
};




function createRes(data) {
  /// Style the res card here!
  $('#resultsCol').append("<div id='1234' class='card'>");
  data.forEach((item, index) => {
    let html =
    `
    <div class='card-action'>  
    <div><p><span id="rest-${index}">Restraunt Name:</span><span class='right' id="vots"> ${restaurantVotes[index]}/ ${total_votes}</p></div>
      <div class="progress green accent-1">
        <div class="determinate green accent-4" id="width-${index}" style="width: 50%"></div>
      </div>
      </div>
    `;
    $('#1234').append(html);
  });



}
