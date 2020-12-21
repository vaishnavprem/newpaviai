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
    const geocoder = new google.maps.Geocoder();
    const address = value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        let arr = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
        panTo(arr);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
