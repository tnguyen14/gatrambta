/*global define */
define( function (require) {
	'use strict';

	var $ = require('jquery');

	var _getData = function() {
		return $.ajax({
			url: "/data/mbta.json"
		});
	};

	var ready = function( cb ) {
		_getData().done(function(data) {
			cb(data);
		});
	}

	var init = function() {
		ready(function( data ) {
			var $schedule = $(".schedule");

		});
	}
	return {
		init: init
	}
});