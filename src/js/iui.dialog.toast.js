/*!
 * IUI Library
 * @Copyright 	: Copyright 2011, itqy8.com
 * @Descript	: toast 对话框组件
 * @Author		: meixinbin@itqy8.com
 * @Depend		: core.js、jquery.js(1.7 or later)
 */
(function ($,iui, window, undefined ) {
    var pluginName = 'toast';
    var	empty = $.noop;
    var defaults = {
        id              : '',                           //id
        type            : 'success',						// 默认弹出类型
        className		: '',	//弹出容器默认class
        iconClassName	: 'iui-icon-success-no-circle',	//图标
        position		: 'absolute',
        message			: '',							// 弹出提示的文字
        autoHide		: 2000,							// 是否自动关闭
        zIndex			: 99999, 							// 层叠值
        callback		: undefined,					//回调
        left			: undefined,					// 默认在中间
        top				: undefined,
        isMask			: 0,							// 是否显示背景遮罩
        opacity			: 0.6,							// 遮罩的透明度
        backgroundColor	: '#000',						// 遮罩的背景色
        url				: '',							// 弹出来的iframe url
    };
    var template = '\
                <div class="iui-mask-transparent"></div>\
				<div class="iui-toast <%=className%>" style="z-index:<%=zIndex%>">\
				<%if(type!="text"){%>\
				<i class="<%=iconClassName%> iui-icon-toast"></i>\
				<%}%>\
				<p class="iui-toast-content"><%=message%></p>\
			    </div>';

    function Plugin( options ) {
        //this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this.elem = null;
        this.init();
    }

    Plugin.prototype.init = function () {
        var options = this.options;
        if(options.type == "cancel") {
            options.className = "iui-toast-cancel";
            options.iconClassName = 'iui-icon-cancel'
        } else if(options.type == "warn") {
            options.className = "iui-toast-forbidden";
            options.iconClassName = 'iui-icon-warn'
        }else if(options.type == "loading") {
            options.className = "";
            options.iconClassName = 'iui-loading'
        }else if(options.type == "text") {
            options.className = "iui-toast-text";
        }else if(options.type == "forbidden") {
            options.className = "iui-toast-forbidden";
        }else{
            options.className = "";
            options.iconClassName = 'iui-icon-success-no-circle'
            options.message=options.message||"操作成功"
        }
        var html = iui.tmpl(template,options);//替换模板
        if(options.id === '') {
            options.id = 'iui-toast';
        }
        var elem = (options.id ? $('#' + options.id) : '');
        var _this = this;
        if(elem.length) {
            //有设置id，只弹出一个
            elem.html(html).show();
        }else {
            elem = $( '<div id="'+ options.id +'"/>' ).appendTo( 'body' ).html(html);
        }
        this.elem = elem;

        if(options.autoHide) {
            setTimeout(function() {
                _this.close();
                options.callback && options.callback();
            },options.autoHide);
        }

    };

    Plugin.prototype.close = function() {
        this.elem.remove();
        // this.mask && this.mask.remove();
    };
    var toast = $[pluginName] = function(options) {
        return new Plugin( options );
    };

    toast['text'] = iui['text'] = function(message,callback) {//兼容api
        return new Plugin( { message:message|| "已经完成", type:'text',callback:callback } );
    };
    toast['success'] = iui['success'] = function(message,callback) {//兼容api
        return new Plugin( { message:message|| "已经完成", type:'success',callback:callback } );
    };
    toast['warn'] = iui['warn'] = function(message,callback) {//兼容api
        return new Plugin( { message:message, type:'warn',callback:callback } );
    };
    toast['cancel'] = iui['cancel'] = function(message,callback) {//兼容api
        return new Plugin( { message:message, type:'cancel',callback:callback } );
    };
    toast['forbidden'] = iui['forbidden'] = function(message,callback) {//兼容api
        return new Plugin( { message:message, type:'forbidden',callback:callback } );
    };
    toast['loading'] = iui['loading'] = function(message,callback) {//兼容api
        return new Plugin( { message:message || "数据加载中", type:'loading',autoHide:0,callback:callback } );
    };
    toast['hide'] = function(id) {
        $('#'+id).remove();
    };
    toast['hideAll'] = function() {
        $('.iui-toast').parent().remove();
    };
})(jQuery,iui, window);
