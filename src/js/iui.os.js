//window.iui = iui;
//'$' in window || (window.$ = iui);
/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [

			function() { //wechat
				var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
				if (wechat) { //wechat
					this.os.wechat = {
						version: wechat[2].replace(/_/g, '.')
					};
				}
				return false;
			},
			function() { //android
				var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
				if (android) {
					this.os.android = true;
					this.os.version = android[2];

					this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
				}
				return this.os.android === true;
			},
			function() { //ios
				var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
				if (iphone) { //iphone
					this.os.ios = this.os.iphone = true;
					this.os.version = iphone[2].replace(/_/g, '.');
				} else {
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
					if (ipad) { //ipad
						this.os.ios = this.os.ipad = true;
						this.os.version = ipad[2].replace(/_/g, '.');
					}
				}
				return this.os.ios === true;
			}
		];
		[].every.call(funcs, function(func) {
			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(iui, window);
/**
 * $.os.plus
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	function detect(ua) {
		this.os = this.os || {};
		var plus = ua.match(/Html5Plus/i); //TODO 5\+Browser?
		if (plus) {
			this.os.plus = true;
			$(function() {
				document.body.classList.add('iui-plus');
			});
			if (ua.match(/StreamApp/i)) { //TODO 最好有流应用自己的标识
				this.os.stream = true;
				$(function() {
					document.body.classList.add('iui-plus-stream');
				});
			}
		}
	}
	detect.call($, navigator.userAgent);
})(iui, document);
