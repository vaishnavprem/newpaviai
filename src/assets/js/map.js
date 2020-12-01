var earth;
function initialize() {
    earth = new WE.map('earth_div');
    earth.setView([46.8011, 8.2266], 1);
    WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
   
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