angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://192.168.1.20:3000";
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
	var dataMaps = {};
	var deferredInit = $q.defer();
	var setLoaded = function(status){
		stat = status;
	}

	this.loadScript = function(){
		var deferForLoad = $q.defer();
		var script = document.createElement("script");
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1HNbcKuIw1XZpzEw9E3tuBmusE1By1Uw&libraries=places&callback=initMap';
		deferForLoad.resolve(script.src);
		return deferForLoad.promise;
	}

	window.initMap = function() {
		var map = new google.maps.Map(document.getElementById('map_canvas'), {
			center: {lat: 13.7248946, lng: 100.4930264},
			zoom: 8,
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
					positionLat: place.geometry.location.lat(),
					positionLng: place.geometry.location.lng()
				}));
				dataMaps = {
					placeName : markers[0].title,
					lat : markers[0].positionLat,
					lgn : markers[0].positionLng
				}
				//forReturnValue(dataMaps);
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
			deferredInit.resolve(dataMaps);
			return deferredInit.promise;
		});
	}

	this.useInitMaps = function(){
		initMap().then(function(Suc){
			return Suc;
		})
	}
})