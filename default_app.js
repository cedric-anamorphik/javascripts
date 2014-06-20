// namespace
var K = K || {};


// App
K.app = (function ($, window, document, undefined) {

	'use strict';

	var DEV = true,
		AJAX = new XMLHttpRequest(),
		Head = document.getElementsByTagName('head')[0],
		Body = document.getElementsByTagName('body')[0];


	// init app
	var init = function () {

		DEV && console.log('K.app init');
	};

	// escape input

	function escapeHtml(str) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

	// ajax functions
	// using a timestamp to prevent request cache (especially on iOs)

	function POST(url, params, callback, async) {
		async = async || true;
		params = params || false;
		if (params && typeof params !== 'string') params = params.join('&');

		var t = '?t=' + new Date().getTime();

		AJAX.open("POST", url + t, async);
		AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		AJAX.crossDomain = true;

		AJAX.onload = function () {
			if (AJAX.status == 200) callback(JSON.parse(AJAX.responseText));
			else ajaxError(AJAX);
		};
		AJAX.onerror = function () {
			return ajaxError(AJAX);
		}
		AJAX.send(params);
	};

	function GET(url, params, callback, async) {
		async = async || true;
		params = params || false;
		if (params && typeof params !== 'string') params = params.join('&');

		var t = '?t=' + new Date().getTime();

		AJAX.open("GET", url + t + '&' + params, async);
		AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		AJAX.crossDomain = true;

		AJAX.onload = function () {
			if (AJAX.status == 200) callback(JSON.parse(AJAX.responseText));
			else ajaxError(AJAX);
		};
		AJAX.onerror = function () {
			return ajaxError(AJAX);
		}
		AJAX.send();
	};

	function ajaxError(req) {
		throw "Ajax error";
		console.log(req.responseText, req.status, req.statusText);
	};


	return {
		"init": init,
		"escapeHtml": escapeHtml
	}

})(jQuery, window, this.document); 
