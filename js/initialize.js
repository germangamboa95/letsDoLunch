var geocoder = new google.maps.Geocoder();
console.log(geocoder);

$(".shareCard").hide();

let initiatorLink;
let guestLink;


document.addEventListener('submit', function(e){
    e.preventDefault();

    let address = $('#location').val();
    let email = $('#email').val();
    let guestCount = $('#num-guest').val();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') { var lat; var long;
          console.log(results)
            long = results[0].geometry.bounds.b.b;
            lat = results[0].geometry.bounds.f.b;

            let data = {
              email: email,
              location: {
                lat: lat,
                long: long

              },
              guests: guestCount
            }

            console.log(data)
            fetch('https://cors-anywhere.herokuapp.com/https://letshavelunchserver.herokuapp.com/api/session_start', {
              method: 'post',
              headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
              body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
              initiatorLink = "./Voting2.html?initiator=true&session="+data;
              guestLink = "./Voting2.html?initiator=false&session="+data;

            });

        }
    });


});

$("#submitButton").on("click", function(){

  console.log(guestLink);
  console.log(initiatorLink);

  $(".startForm").slideUp();
  setInterval
  $(".shareCard").slideDown();
  var a2a_config = a2a_config || {};
  a2a_config.linkname = "Lets do lunch together!";
  a2a_config.linkurl = guestLink;
  $("#voteBtn").attr("href", initiatorLink);

})
