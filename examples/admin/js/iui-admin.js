$.navAsAjax = true, $.root_ = $("body");

$("header .iui-nav-item .iui-nav-more").parent().hover(function(){
	$(this).find("span").addClass("iui-nav-mored");
//	$(this).parent().children("dl").stop(true, true).slideDown(100);
	$(this).parent().children("dl").addClass("iui-show");
});
$("header .iui-nav-item dl").mouseleave(
	function(){
	var t = $(this);
	t.removeClass("iui-show");
	t.parent().find(".iui-nav-mored").removeClass("iui-nav-mored")
});
//左侧主菜单
if(!$("#iui-sidebar > li").hasClass("iui-this")) {
	$("#iui-sidebar").find("li:first").addClass("iui-this");
}
$("#iui-sidebar > li").on("click", function(e) {
	e.preventDefault();
	var _this = $(this);
	_this.siblings().removeClass("iui-this");
	_this.addClass("iui-this");
	var flag = false;
	//二级菜单
	$(".iui-side-child").find(".iui-menu-item").each(function() {
		var pid = $(this).data("pid");
		
		if(pid == _this.data("id")) {
			$(this).addClass("iui-show");
			$(this).find("li:first").addClass("iui-this iui-nav-itemed");
			flag = true;
		} else {
			$(this).removeClass("iui-show");
		}
		
	});
	if(!flag){
		$("#iui-app").addClass("layadmin-side-shrink");
	}else{
		$("#iui-app").removeClass("layadmin-side-shrink");
	}
});

//$(".iui-side-child .iui-nav-item a").on("click", function() {
//	if($(this).parent().hasClass("iui-this")) {
//		$(this).parent().removeClass("iui-this");
//		$(this).parent().removeClass("iui-nav-itemed");
//	} else {
//		$(this).parent().addClass("iui-this");
//		$(this).parent().addClass("iui-nav-itemed");
//		$(this).parent().siblings().removeClass("iui-this iui-nav-itemed")
//	}
//});
//侧边伸缩
$("#iui_app_flexible").on("click", function() {
	$("#iui-app").toggleClass("layadmin-side-shrink");
});
//$("#iui-sidebar > li").on('click', function() {
//	$("#iui-app").removeClass("layadmin-side-shrink");
//})
//页面跳转
//$.root_.on('click', '*[lay-href]', function(e) {
//	e.preventDefault();
//	var othis = $(this),
//		href = othis.attr('lay-href');
//	location.hash = '/' + href; //执行跳转
//});

function checkURL() {
	var a = location.href.split("#").splice(1).join("#");
	if(!a) try {
		var b = window.document.URL;
		b && b.indexOf("#", 0) > 0 && b.indexOf("#", 0) < b.length + 1 && (a = b.substring(b.indexOf("#", 0) + 1))
	} catch(c) {}
	if(container = $("#app_body"), a) {
		$("nav li.active").removeClass("active"), $('aside li:has(a[href="' + a + '"])').addClass("iui-this");
		var d = $('aside a[href="' + a + '"]');
		if(d.parents().hasClass("side-main")){
			var pid = d.parent().data("id");
			var flag = false;
			//二级菜单
			$(".iui-side-child").find(".iui-menu-item").each(function() {
				if(pid == $(this).data("pid")) {
					flag = true;	
				}
			});
			if(!flag){
				$("#iui-app").addClass("layadmin-side-shrink");
			}else{
				$("#iui-app").removeClass("layadmin-side-shrink");
			}
		}
		
		document.title = d.attr("title") || document.title;
		loadURL(a + location.search, container);
	} else {
		var e = $('aside ul li:first-child > a[href!="#"]');
		window.location.hash = e.attr("href"), e = null
	}
}
//加载URL内容
function loadURL(a, b) {
	$.ajax({
		type: "GET",
		url: a,
		dataType: "html",
		cache: true,
		beforeSend: function() {
			if($.navAsAjax && b[0] == $("#app_body")[0]) {
				b.removeData().html(""),
					b.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>'), b[0] == $("#content")[0], $("html").animate({
						scrollTop: 0
					}, "fast")
			}

		},
		success: function(a) {
			b.css({
				opacity: "0.0"
			}).html(a).delay(50).animate({
				opacity: "1.0"
			}, 300), a = null, b = null
		},
		error: function() {
			b.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>')
		},
		async: true
	})
}
$(window).on("hashchange", function() {
	checkURL();
});
$(document).on("click", 'nav a[target="_blank"]', function(a) {
	a.preventDefault();
	var b = $(a.currentTarget);
	window.open(b.attr("href"))
})
if($.navAsAjax) {
	checkURL();
}
$(document).on("click", 'aside a[href!="#"]', function(a) {
        a.preventDefault();
        var b = $(a.currentTarget);
        b.parent().hasClass("active") || b.attr("target") || ($.root_.hasClass("mobile-view-activated") ? ($.root_.removeClass("hidden-menu"), $("html").removeClass("hidden-menu-mobile-lock"), window.setTimeout(function() {
                window.location.search ? window.location.href = window.location.href.replace(window.location.search, "").replace(window.location.hash, "") + "#" + b.attr("href") : window.location.hash = b.attr("href")
            }, 150)) : window.location.search ? window.location.href = window.location.href.replace(window.location.search, "").replace(window.location.hash, "") + "#" + b.attr("href") : window.location.hash = b.attr("href"))
    });