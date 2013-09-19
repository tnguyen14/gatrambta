/*global define */
define( function (require) {
	'use strict';

	var $ = require('jquery'),
		_ = require('underscore');
	console.log(_);
	var _getData = function() {
		return $.ajax({
			url: "/data/mbta.json"
		});
	};

	var ready = function( cb ) {
		_getData().done(function(data) {
			cb(data);
		});
	};

	var displayTimes = function(origin, dest, data) {
		var schedule,
			$table = $('.schedule table'),
			direction;
		switch(dest) {
			case 'boston':
				direction = 'inbound';
				break;
			case 'providence':
				direction = 'outbound';
				break;
			case 'wheaton':
				if (origin === 'boston') {
					direction = 'outbound';
				} else if (origin === 'providence') {
					direction = 'inbound';
				}
				break;
		}

		schedule = data[direction];
		var $tds = $('thead td', $table),
			$tbody = $('tbody', $table);

		$tds.eq(0).html(origin);
		$tds.eq(2).html(dest);

		_.each(schedule['weekday'], function(trip){
			var html = '<tr>';
			html += '<td>';
			html += trip[origin];
			html += '</td>';
			html += '<td></td>';
			html += '<td>';
			html += trip[dest];
			html += '</td>';
			html += '</tr>';
			$tbody.append(html);
		});
	}

	var init = function() {
		ready(function( data ) {
			var $to = $('.to'),
				$from = $('.from'),
				origin,
				dest;

			// when destination is selected
			$('li', $to).click(function(e){
				e.preventDefault();
				$(this).addClass('active');
				dest = $(this).data('dest');
				switch(dest) {
					case 'boston':
						$('li', $from).each(function(){
							if ($(this).data('origin') === 'boston') {
								$(this).addClass("disabled");
							}
						});
						$('li', $from).click(function(e){
							e.preventDefault();
							$(this).addClass('active');
							origin = $(this).data('origin');
							displayTimes(origin, dest, data);
						});


				}
			});
		});
	}
	return {
		init: init
	}
});