jQuery(document).ready(function() {
  initializeMap();
});

jQuery('#drivingTime').change(function() {
  updateMarker(marker.getPosition());
});

jQuery('#drivingSpeed').change(function() {
  updateMarker(marker.getPosition());
});

var map;
var marker, circle;


function initializeMap() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(52.763100, 1.110813)
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);


  google.maps.event.addListener(map, 'click', function(event) {
    updateMarker(event.latLng);
  });
}

function updateMarker(location) {
  var time = jQuery('#drivingTime').val();
  var speed = jQuery('#drivingSpeed').val();
  var radius = parseFloat(time) * parseFloat(speed) * 1000;
  placeMarker(location, radius);
}


function placeMarker(location, radius) {
  if ( marker ) {
    marker.setMap(null);
    circle.setMap(null);
  }

  marker = new google.maps.Marker({
    position: location,
    map: map
  });


  circle = new google.maps.Circle({
      center: location,
      map: map,
      radius: parseFloat(radius),
      strokeColor: "blue",
      strokeOpacity:0.8,
      strokeWeight: 1,
      fillColor: "blue",
      fillOpacity: 0.2
  });
  circle.bindTo('center',marker,'position');
}