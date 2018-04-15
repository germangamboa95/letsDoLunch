// javascript for results screens

// var votes = {
//     "ChIJF9XffxBw54gROnM1gBSK2Ic": 2,
//     "ChIJnxsExjKH3YgRQoYbRHVI1kE": 4,
//     "ChIJt1g7ljKH3YgRSwjdfuKptlM": 5,
//     "Johnnyisawesome": 0,
//     "So am I": 1
// }



var restaurantName = ["Restaurant A","Restaurant B","Restaurant C","Restaurant D","Restaurant E"]
var restaurantVotes = [0,0,0,0,0];
var setWidth = [];
var counter = 0;
var results;
var urlQuery = "https://letshavelunchserver.herokuapp.com/api/-LA-y8Fkh7G-OwiIUft0/get_res";

$.ajax( {
    url: urlQuery,
    method: "GET"    
    })    
    .then(function(response) {
        console.log(response);   
        results = response;
        console.log(results);

        for (var i = 0; i < Object.values(results.votes).length; i++) {
            if (Object.values(results.votes)[i] === 5) {
                counter++;
            }
        };
        if (counter === 1) {
            resultsTwo();    
        }
            else {
            console.log("at call to resultsOne function");    
            resultsOne();
        };
    });


function resultsTwo() { 
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

    for (var k = 0; k < Object.keys(results.images); k++) {
        if (Object.keys(results.images)[k] === winnerCode) {
            winnerImage = Object.values(results.images)[k];
        };
    };
 
    document.getElementById("selection").innerText = winnerName;
    document.getElementById("selection-address").innerText = winnerAddress;
    document.getElementById("selection-rating").innerText = winnerRating;
    document.getElementById("selection-image").setAttribute("src", winnerImage);
};

function resultsOne() {
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
    console.log(restaurantName);
    console.log(restaurantVotes);
    for (var k = 0; k < restaurantName.length; k++) {
        if (k === 0) {
            document.getElementById("rest-1").innerText = restaurantName[k];
        } else if (k === 1) {
            document.getElementById("rest-2").innerText = restaurantName[k];
        } else if (k === 2) {
            document.getElementById("rest-3").innerText = restaurantName[k];
        } else if (k === 3) {
            document.getElementById("rest-4").innerText = restaurantName[k]; 
        } else if (k === 4) {
            document.getElementById("rest-5").innerText = restaurantName[k];
        }    
    };
    for (var m = 0; m < restaurantVotes.length; m++) {
        var temp = Math.round(restaurantVotes[m] / Object.values(results.votes).length *100);
        console.log("the percent for restaurant " + m + " is " + temp);
        setWidth[m] = "width: " + temp +"%";
        console.log(setWidth[m]);
    };
    for (var n = 0; n < restaurantVotes.length; n++) {
        if (n === 0) {
            document.getElementById("width-1").setAttribute("style", setWidth[n]);
        } else if (n === 1) {
            document.getElementById("width-2").setAttribute("style", setWidth[n]);
        } else if (n === 2) {
            document.getElementById("width-3").setAttribute("style", setWidth[n]);
        } else if (n === 3) {
            document.getElementById("width-4").setAttribute("style", setWidth[n]); 
        } else  {
            document.getElementById("width-5").setAttribute("style", setWidth[n]);
        };   
    };
};






// var locations: {
//     "0": {
//     "address": "12701 S John Young Pkwy #101, Orlando",
//     "id": "0146339c9661a9b00e8b460b7ab7f1eaab7b12ec",
//     "is_open": true,
//     "name": "Bandeja Paisa Latin Restaurant",
//     "photos": "CmRaAAAAQ6DsHEKrFsc9K3bsHB6ajLiNw_AHQ3DAErB_ckjTAUeTg7mALm-EIQi0FKe4bd8xDHd0oo-9oZ7kNoH3EmVeyD9RPKiSMj2rxHiAnHsoPEzI57caoP_D3hOBlgjT6QtwEhD3yV2oQXimQt3012CUigBgGhQ6lnV3WIFYQG2aIENJFgDmmGSBUw",
//     "place_id": "ChIJW1T-ZUqH3YgRL55uMbBRnW8",
//     "rating": 4,
//     "types": [
//     "restaurant",
//     "food",
//     "point_of_interest",
//     "establishment"
//     ]



