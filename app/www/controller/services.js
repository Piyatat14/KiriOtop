angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://192.168.1.45:3000";
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

  // .service('launchnavigator', ['$q', function ($q) {
  //   "use strict";

  //   var launchnavigator = {};
  //   launchnavigator.navigate = function (destination, options) {
  //     var q = $q.defer(),
  //       isRealDevice = ionic.Platform.isWebView();

  //     if (!isRealDevice) {
  //       q.reject("launchnavigator will only work on a real mobile device! It is a NATIVE app launcher.");
  //     } else {
  //       try {

  //         var successFn = options.successCallBack || function () {
  //             },
  //           errorFn = options.errorCallback || function () {
  //             },
  //           _successFn = function () {
  //             successFn();
  //             q.resolve();
  //           },
  //           _errorFn = function (err) {
  //             errorFn(err);
  //             q.reject(err);
  //           };

  //         options.successCallBack = _successFn;
  //         options.errorCallback = _errorFn;

  //         launchnavigator.navigate(destination, options);
  //       } catch (e) {
  //         q.reject("Exception: " + e.message);
  //       }
  //     }
  //     return q.promise;
  //   };

  //   return launchnavigator;
  // }])