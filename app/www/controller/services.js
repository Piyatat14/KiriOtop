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

.factory('ImageService', function($cordovaCamera, $q, $cordovaFile) {
	function optionsForType(type) {
		var source;

		switch (type) {
			case 0:
				source = Camera.PictureSourceType.CAMERA;
				break;
			case 1:
				source = Camera.PictureSourceType.PHOTOLIBRARY;
				break;
		}

		return {
			quality: 80,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: source,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
	};

	return {
			options: optionsForType
	};
})