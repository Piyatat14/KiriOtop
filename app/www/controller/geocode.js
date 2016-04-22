
        <script>
          var map;
  function initMap() {
    alert("55");
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1HNbcKuIw1XZpzEw9E3tuBmusE1By1Uw&callback=initMap" async defer></script>