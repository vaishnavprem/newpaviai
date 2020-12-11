var earth;
function initialize() {
    earth = new WE.map('earth_div');
    earth.setView([46.8011, 8.2266], 1);
    WE.tileLayer('https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=QMIY2GHdgzkeDUXbWvTs', {

      }).addTo(earth);

    // Start a simple rotation animation
  
}
function panTo(coords) {
 earth.panTo(coords);
 var refreshId = setInterval("this.setZoom(4)", 4000);
 ;
}

function setZoom(zoom) {
    earth.setZoom(zoom);
  }

  //For Geocoding
  function geocodeAddress(value) {
    //console.log("Function called",value);
    const geocoder = new google.maps.Geocoder();
    //earth = new WE.map('earth_div');
    const address = value;
    geocoder.geocode({ address: address }, (results, status) => {
      //console.log("In Geocode Methode");
      if (status === "OK") {
        //console.log("Geocode is>>>>>>",results[0].geometry.location);
        let arr = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
        //console.log("Pro>>>>>>>>>>", arr);

        panTo(arr);
        // earth.setCenter(results[0].geometry.location);
        // new google.maps.Marker({
        //   map: earth,
        //   position: results[0].geometry.location,
        // });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  