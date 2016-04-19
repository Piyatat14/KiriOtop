angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://192.168.1.11:3000";
	};
})

.factory('Authen', function($cookieStore) {
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