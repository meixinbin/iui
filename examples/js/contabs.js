$(function() {
	function f(l) {
		var k = 0;
		$(l).each(function() {
			k += $(this).outerWidth(true)
		});
		return k
	}

	function g(n) {
		var o = f($(n).prevAll()),
			q = f($(n).nextAll());
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if($(".page-tabs-content").outerWidth() < k) {
			p = 0
		} else {
			if(q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
				if((k - $(n).next().outerWidth(true)) > q) {
					p = o;
					var m = n;
					while((p - $(m).outerWidth()) > ($(".page-tabs-content").outerWidth() - k)) {
						p -= $(m).prev().outerWidth();
						m = $(m).prev()
					}
				}
			} else {
				if(o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
					p = o - $(n).prev().outerWidth(true)
				}
			}
		}
		$(".page-tabs-content").animate({
			marginLeft: 0 - p + "px"
		}, "fast")
	}

	function a() {
		var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if($(".page-tabs-content").width() < k) {
			return false
		} else {
			var m = $(".J_menuTab:first");
			var n = 0;
			while((n + $(m).outerWidth(true)) <= o) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			n = 0;
			if(f($(m).prevAll()) > k) {
				while((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
					n += $(m).outerWidth(true);
					m = $(m).prev()
				}
				p = f($(m).prevAll())
			}
		}
		$(".page-tabs-content").animate({
			marginLeft: 0 - p + "px"
		}, "fast")
	}

	function b() {
		var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if($(".page-tabs-content").width() < k) {
			return false
		} else {
			var m = $(".J_menuTab:first");
			var n = 0;
			while((n + $(m).outerWidth(true)) <= o) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			n = 0;
			while((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			p = f($(m).prevAll());
			if(p > 0) {
				$(".page-tabs-content").animate({
					marginLeft: 0 - p + "px"
				}, "fast")
			}
		}
	}
	$(".J_menuItem").each(function(k) {
		if(!$(this).attr("data-index")) {
			$(this).attr("data-index", k)
		}
	});

	function c() {
		var o = $(this).attr("href"),
			m = $(this).data("index"),
			l = $.trim($(this).text()),
			k = true;
		if(o == undefined || $.trim(o).length == 0) {
			return false
		}
		$(".J_menuTab").each(function() {
			if($(this).data("id") == o) {
				if(!$(this).hasClass("active")) {
					$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
					g(this);
					$(".J_mainContent .J_iframe").each(function() {
						if($(this).data("id") == o) {
							$(this).show().siblings(".J_iframe").hide();
							return false
						}
					})
				}
				k = false;
				return false
			}
		});
		if(k) {
			var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
			$(".J_menuTab").removeClass("active");
			var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
			$(".J_mainContent").find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
			$(".J_menuTabs .page-tabs-content").append(p);
			g($(".J_menuTab.active"))
		}
		return false
	}
	$(".J_menuItem").on("click", c);

	function h() {
		var m = $(this).parents(".J_menuTab").data("id");
		var l = $(this).parents(".J_menuTab").width();
		if($(this).parents(".J_menuTab").hasClass("active")) {
			if($(this).parents(".J_menuTab").next(".J_menuTab").size()) {
				var k = $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").data("id");
				$(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").addClass("active");
				$(".J_mainContent .J_iframe").each(function() {
					if($(this).data("id") == k) {
						$(this).show().siblings(".J_iframe").hide();
						return false
					}
				});
				var n = parseInt($(".page-tabs-content").css("margin-left"));
				if(n < 0) {
					$(".page-tabs-content").animate({
						marginLeft: (n + l) + "px"
					}, "fast")
				}
				$(this).parents(".J_menuTab").remove();
				$(".J_mainContent .J_iframe").each(function() {
					if($(this).data("id") == m) {
						$(this).remove();
						return false
					}
				})
			}
			if($(this).parents(".J_menuTab").prev(".J_menuTab").size()) {
				var k = $(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id");
				$(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
				$(".J_mainContent .J_iframe").each(function() {
					if($(this).data("id") == k) {
						$(this).show().siblings(".J_iframe").hide();
						return false
					}
				});
				$(this).parents(".J_menuTab").remove();
				$(".J_mainContent .J_iframe").each(function() {
					if($(this).data("id") == m) {
						$(this).remove();
						return false
					}
				})
			}
		} else {
			$(this).parents(".J_menuTab").remove();
			$(".J_mainContent .J_iframe").each(function() {
				if($(this).data("id") == m) {
					$(this).remove();
					return false
				}
			});
			g($(".J_menuTab.active"))
		}
		return false
	}
	$(".J_menuTabs").on("click", ".J_menuTab i", h);

	function i() {
		$(".page-tabs-content").children("[data-id]").not(":first").not(".active").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
			$(this).remove()
		});
		$(".page-tabs-content").css("margin-left", "0")
	}
	$(".J_tabCloseOther").on("click", i);

	function j() {
		g($(".J_menuTab.active"))
	}
	$(".J_tabShowActive").on("click", j);

	function e() {
		if(!$(this).hasClass("active")) {
			var k = $(this).data("id");
			$(".J_mainContent .J_iframe").each(function() {
				if($(this).data("id") == k) {
					$(this).show().siblings(".J_iframe").hide();
					return false
				}
			});
			$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
			g(this)
		}
	}
	$(".J_menuTabs").on("click", ".J_menuTab", e);

	function d() {
		var l = $('.J_iframe[data-id="' + $(this).data("id") + '"]');
		var k = l.attr("src")
	}
	$(".J_menuTabs").on("dblclick", ".J_menuTab", d);
	$(".J_tabLeft").on("click", a);
	$(".J_tabRight").on("click", b);
	$(".J_tabCloseAll").on("click", function() {
		$(".page-tabs-content").children("[data-id]").not(":first").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
			$(this).remove()
		});
		$(".page-tabs-content").children("[data-id]:first").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').show();
			$(this).addClass("active")
		});
		$(".page-tabs-content").css("margin-left", "0")
	})
});
var menu_speed = 235,menu_accordion = true;
/**
 * 左侧菜单
 */
$.fn.extend({
    "jarvismenu": function (a) {
        var b = {
                "accordion": "true",
                "speed": 200,
                "closedSign": "[+]",
                "openedSign": "[-]"
            },
            c = $.extend(b, a),
            d = $(this);
        d.find("li").each(function () {
            0 !== $(this).find("ul").size() && ($(this).find("a:first").append("<b class='collapse-sign'>" + c.closedSign + "</b>"), "#" == $(this).find("a:first").attr("href") && 
            $(this).find("a:first").click(function () {
                return false;
            }));
        }), 
        d.find("li.active").each(function () {
            $(this).parents("ul").slideDown(c.speed), $(this).parents("ul").parent("li").find("b:first").html(c.openedSign), $(this).parents("ul").parent("li").addClass("open");
        }), 
        d.find("li a").click(function () {
        		d.find("li").removeClass("active");
        		$(this).parent().addClass("active")
            0 !== $(this).parent().find("ul").size() && (c.accordion && ($(this).parent().find("ul").is(":visible") || (parents = $(this).parent().parents("ul"), 
            visible = d.find("ul:visible"), 
            visible.each(function (a) {
                var b = !0;
                parents.each(function (c) {
                    return parents[c] == visible[a] ? (b = !1, !1) : void 0;
                }), b && $(this).parent().find("ul") != visible[a] && $(visible[a]).slideUp(c.speed, function () {
                    $(this).parent("li").find("b:first").html(c.closedSign), $(this).parent("li").removeClass("open");
                });
            }))), 
            $(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active") ? $(this).parent().find("ul:first").slideUp(c.speed, function () {
                    $(this).parent("li").removeClass("open"), $(this).parent("li").find("b:first").delay(c.speed).html(c.closedSign);
                }) : $(this).parent().find("ul:first").slideDown(c.speed, function () {
                    $(this).parent("li").addClass("open"), $(this).parent("li").find("b:first").delay(c.speed).html(c.openedSign);
                }));
        });
    }
});
$("nav ul").jarvismenu({
    "accordion": menu_accordion || !0,
    "speed": menu_speed || !0,
    "closedSign": '<em class="fa fa-plus-square-o"></em>',
    "openedSign": '<em class="fa fa-minus-square-o"></em>'
});
/*
 * 菜单隐藏显示
 */
function toggleMenu() {
    var root_ = $("body");
    root_.hasClass("menu-on-top") ? root_.hasClass("menu-on-top") && $(window).width() < 979 && ($("html").toggleClass("hidden-menu-mobile-lock"), root_.toggleClass("hidden-menu"), root_.removeClass("minified")) : ($("html").toggleClass("hidden-menu-mobile-lock"), root_.toggleClass("hidden-menu"), root_.removeClass("minified"));
}
$("body").on("click",'[data-action="toggleMenu"]',function(e){
    e.preventDefault();
    toggleMenu();
});

/**
 * 最小化菜单
 * @param a
 */
function minifyMenu() {
    var root_ = $("body");
    root_.hasClass("menu-on-top") || (root_.toggleClass("minified"), root_.removeClass("hidden-menu"), $("html").removeClass("hidden-menu-mobile-lock"));
}
$("body").on("click", '[data-action="minifyMenu"]', function (e) {
    e.preventDefault();
    minifyMenu();
});
/**
 * 全屏
 */
function launchFullscreen(a) {
    var root_ = $("body");
    root_.hasClass("full-screen") ? (root_.removeClass("full-screen"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : (root_.addClass("full-screen"), a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen());
}
$("body").on("click", '[data-action="launchFullscreen"]', function (e) {
    launchFullscreen(document.documentElement);
});