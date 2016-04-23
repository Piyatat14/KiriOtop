angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://192.168.34:3000";
	};
})

.factory('Authen', function($cookieStore) {
	//key in _user: userID, email
	var _user = $cookieStore.get('starter.sessionUser');
	var setUser = function(user) {
		_user = user;
		$cookieStore.put('starter.sessionUser', _user);
	}

	return {
		setUser : setUser,
		isLoggedIn : function() {
			return _user ? true : false;
		},
		getUser : function() {
			return _user;
		},
		logout : function() {
			$cookieStore.remove('starter.sessionUser');
			_user = null;
		}
	}
})

//get needed user data.
.factory('Users', function($cookieStore) {
	//key in users: profileID
	var users = $cookieStore.get('user');

	return {
		setUserData: function(data) {
			users = data;
			$cookieStore.put('user', users);
		},
		getUserData: function() {
			return users;
		},
		removeUserData: function() {
			$cookieStore.remove('user');
			users = undefined;
		}
	}
})

.service('googleMaps', function($q) {
	var stat = '0';
	var deferred;
	var mapsData;
	var setLoaded = function(status){
		stat = status;
	}

	return{
		setLoaded : setLoaded,
		loadMaps : function(){
			deferred = $q.defer();
			function loadScript(src, callback){
				var script = document.createElement("script");
				script.type = "text/javascript";
			    if(callback)script.onload=callback;
			    document.getElementsByTagName("head")[0].appendChild(script);
			    script.src = src;
			}

			if(stat == '0'){
				loadScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyC1HNbcKuIw1XZpzEw9E3tuBmusE1By1Uw&libraries=places&callback=initMap', function(){
					console.log('google-loader has been loaded, but not the maps-API ');
				});
			}

			window.initMap = function() {
				var map = new google.maps.Map(document.getElementById('map_canvas'), {
					center: {lat: 13.7248946, lng: 100.4930264},
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				// Create the search box and link it to the UI element.
				var input = document.getElementById('pac-input');
				var searchBox = new google.maps.places.SearchBox(input);
				map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				// Bias the SearchBox results towards current map's viewport.
				map.addListener('bounds_changed', function() {
					searchBox.setBounds(map.getBounds());
				});

				var markers = [];
				// Listen for the event fired when the user selects a prediction and retrieve
				// more details for that place.
				searchBox.addListener('places_changed', function() {
					var places = searchBox.getPlaces();
					if (places.length == 0) {
						return;
					}
					// Clear out the old markers.
					markers.forEach(function(marker) {
						marker.setMap(null);
					});
					markers = [];
					// For each place, get the icon, name and location.
					var bounds = new google.maps.LatLngBounds();
					places.forEach(function(place) {
						var icon = {
							url: place.icon,
							size: new google.maps.Size(71, 71),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(25, 25)
						};

						// Create a marker for each place.
						markers.push(new google.maps.Marker({
							map: map,
							icon: icon,
							title: place.name,
							position: place.geometry.location,
							positionLat: place.geometry.location.lat(),
							positionLng: place.geometry.location.lng()
						}));
						mapsData = {};
						mapsData = {
							place : markers[0].title,
							lat : markers[0].positionLat,
							lng : markers[0].positionLng
						};
						deferred.resolve(mapsData);
						if (place.geometry.viewport) {
							// Only geocodes have viewport.
							bounds.union(place.geometry.viewport);
						} else {
							bounds.extend(place.geometry.location);
						}
					});
					map.fitBounds(bounds);
				});
			}
			return deferred.promise;
		}
	}
})