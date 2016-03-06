angular.module('starter.services', ['ngCookies'])

.service('urlService', function() {
	this.getBaseUrl = function() {
		return "http://localhost:8100";
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