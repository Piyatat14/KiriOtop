angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://192.168.1.33:3000";
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

.service('googleMaps', function($q, $window) {
	function loadScript(src, callback){
		var script = document.createElement("script");
		script.type = "text/javascript";
	    if(callback)script.onload=callback;
	    document.getElementsByTagName("head")[0].appendChild(script);
	    script.src = src+callback;
	}
	var deferred = $q.defer();
	$window.initMap = deferred.resolve;
	loadScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyC1HNbcKuIw1XZpzEw9E3tuBmusE1By1Uw&libraries=places&callback=', 'initMap');
	return{
		loadMaps : function(){
			return deferred.promise;
		}
	}
})

.service('googleMapsMarkAndDirec', function($q, $window) {
	console.log("555");
	function loadMarkScirpt(src, callback){
		var script = document.createElement("script");
		script.type = "text/javascript";
	    if(callback)script.onload=callback;
	    document.getElementsByTagName("head")[0].appendChild(script);
	    script.src = src+callback;
	}
	var deferred = $q.defer();
	$window.initMap = deferred.resolve;
	loadMarkScirpt('https://maps.googleapis.com/maps/api/js?key=AIzaSyC1HNbcKuIw1XZpzEw9E3tuBmusE1By1Uw&callback=', 'initMap');
	return{
		loadMap : function(){
			return deferred.promise;
		}
	}
})
