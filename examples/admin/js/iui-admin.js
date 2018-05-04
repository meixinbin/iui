

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

//侧边伸缩
$("#iui_app_flexible").on("click", function() {
	$("#iui-app").toggleClass("layadmin-side-shrink");
});
//$("#iui-sidebar > li").on('click', function() {
//	$("#iui-app").removeClass("layadmin-side-shrink");
//})

//加载URL内容
function loadURL(url, targetId) {
	var target=$('#'+targetId);
	$.ajax({
		type: "GET",
		url: url,
		dataType: "html",
		cache: false,
        async: true,
		beforeSend: function() {
            target.removeData().html("");
            target.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            $("html").animate({scrollTop: 0}, "fast");
		},
		success: function(data) {
            target.css({
				opacity: "0.0"
			}).html(data).delay(50).animate({
				opacity: "1.0"
			}, 300);
		},
		error: function() {
            target.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>')
		}
	});
}
function loadIframe(url,target,id) {
    $('#'+target).html('<h1 id="loading" class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    $('#'+target).append('<iframe id="aaa" tab-id="'+id+'" frameborder="0" src="'+url+'" scrolling="yes" class="iframe"></iframe>');
    $('#aaa').hide();
	$('#aaa').load(function(){
		$('#loading').remove();
		$('#aaa').show();
	});
};
//$(document).on("click", 'nav a[target="_blank"]', function(a) {
//	a.preventDefault();
//	var b = $(a.currentTarget);
//	window.open(b.attr("href"))
//});
//左侧主菜单
if(!$("#iui-sidebar > li").hasClass("iui-this")) {
	$("#iui-sidebar").find("li:first").addClass("iui-this");
}
$(document).on("click", '.iui-side-child a', function(e) {
	e.preventDefault();
	var a = $(this);
	if(a.attr("href")!=undefined && a.attr("href")!="#"){
		if(a.attr("open-type")=="iframe"){
			
			loadIframe(a.attr("href"),'app_body','id');
		}else{
			loadURL(a.attr("href"),'app_body');
		}
	}
});
$(document).on("click", '#iui-sidebar > li', function(e) {
	e.preventDefault();
	var _this = $(this);
	var a = _this.find("a:first");
	if(a.attr("href")!=undefined && a.attr("href")!="#"){
		if(a.attr("open-type")=="iframe"){
			loadIframe(a.attr("href"),'app_body','id');
		}else{
			loadURL(a.attr("href"),'app_body');
		}
	}
	
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
$(document).on("click", '.ajaxLoad[href!="#"]', function(e) {
	e.preventDefault();
	var a = $(e.currentTarget);
	loadURL(a.attr("href"),'app_body');
});