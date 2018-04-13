var geocoder = new google.maps.Geocoder();
console.log(geocoder);




document.addEventListener('submit', function(e){
    e.preventDefault(); 

    let address; 
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') { var lat; var long;
            lat = results[0].geometry.bounds.b.b;
            long = results[0].geometry.bounds.f.b;
            console.log(results);
            console.log(lat); adsf
            console.log(long);
        }
    });
});    