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

  