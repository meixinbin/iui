/*
 * iui PAGE JS
 * @Copyright Copyright 2011, itqy8.com
 * @Author	: meixinbin@itqy8.com
 */
(function($) {
	//全局ajax处理
	$.ajaxSetup({
		complete: function(jqXHR) {
			//登录失效处理
		   if(jqXHR.responseText.state === 'logout') {
		   	//location.href = GV.URL.LOGIN;
		   }
  		},
		error : function(jqXHR, textStatus, errorThrown){
			if(window.parent.iui.dialog) {
				window.parent.iui.dialog.closeAll();
			}
			//alert(jqXHR.responseText)
			//请求失败处理
			alert(errorThrown ? errorThrown : '操作失败');
		}
	});

	if($.browser.msie) {
		//ie 都不缓存
		$.ajaxSetup({
			cache : false
		});
	}
	//不支持placeholder浏览器下对placeholder进行处理
	if(document.createElement('input').placeholder !== '') {
		$('[placeholder]').focus(function() {
			var input = $(this);
			if(input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if(input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if(input.val() == input.attr('placeholder')) {
					input.val('');
				}
			});
		});
	}
	//提交按钮是否固定底部
	setBtnWrap();
	/*$(window).on('resize', function(){
		setBtnWrap(true);
	});*/
	function setBtnWrap(reset){
		if(parent.iui && parent.iui.dialog) {
			//过滤弹窗
			return ;
		}

		if($('body').height() <= $(window).height()) {
			$('div.btn_wrap').removeClass('btn_wrap');
		}else{
			if(reset) {
				var par = $('button.J_ajax_submit_btn:last').parent().parent();
				if(!par.attr('class')) {
					//class一定为空
					par.addClass('btn_wrap');
				}
			}
		}
	}

	//iframe页面f5刷新
	$(document).on('keydown', function(event){
		var e = window.event || event;
		if(e.keyCode == 116) {
			e.keyCode = 0;

			var $doc = $(parent.window.document),
					id = $doc.find('#B_history .current').attr('data-id'),
					iframe = $doc.find('#iframe_'+ id);
			if(iframe[0].contentWindow) {
				//common.js
				reloadPage(iframe[0].contentWindow);
			}

			//!ie
			return false;
		}

	});

	//所有加了dialog类名的a链接，自动弹出它的href
	if( $('a.J_dialog').length ) {
		iui.use('dialog',function() {
			$(document).off('click','.J_dialog').on( 'click','.J_dialog',function(e) {
				e.preventDefault();
				var _this = $(this);
				var opentype = _this.data("open");
				if(opentype=="iframe"){
					iui.dialog.open( $(this).prop('href') ,{
						onClose : function() {
							_this.focus();//关闭时让触发弹窗的元素获取焦点
						},
						title:_this.prop('title')
					});
				}else{
					iui.dialog.ajaxOpen( $(this).prop('href') ,{
						onClose : function() {
							_this.focus();//关闭时让触发弹窗的元素获取焦点
						},
						title:_this.prop('title')
					});
				}
				
			}).attr('role','button');

		});
	}
	//所有的ajax form提交,由于大多业务逻辑都是一样的，故统一处理
    $(document).off('click','button.J_ajax_submit_btn').on('click','button.J_ajax_submit_btn', function(e) {
		e.preventDefault();
		var btn = $(this),
		form = btn.parents('form.J_ajaxForm');
		if(!$.fn.ajaxSubmit){
			iui.use('dialog','ajaxForm',function(){
				fns.ajaxSubmit(btn,form);
			});
		}else{
			fns.ajaxSubmit(btn,form);
		}
	});

	//dialog弹窗内的关闭方法
	$('#J_dialog_close').on('click', function(e){
		e.preventDefault();
		if(window.parent.iui.dialog) {
			window.parent.iui.dialog.closeAll();
		}
	});
	//工具栏上的编辑操作
	$("body").on("click","a.J_ajax_toolbar_edit",function(e){
		e.preventDefault();
		var $this = $(this), href = $this.prop('href'), msg = $this.data('msg');
		var tc = $(this).data("target-class"),ids=[],i=0;
		$("."+tc+":checked").each(function(){
			ids[i]=$(this).data("id");
			i++;
		});
		if(ids.length>1){
			iui.dialog.alert("同时只能选择一个进行编辑");
		}else if(ids.length==0){
			iui.dialog.alert("请选择一条记录进行编辑");
		}
		return false;
		iui.dialog.ajaxOpen( $.addParam(href,"id",ids[0]),{
			onClose : function() {
				$this.focus();//关闭时让触发弹窗的元素获取焦点
			},
			title:$this.prop('title')
		});
	});
	$("body").on("dblclick","table.J_check_wrap tbody tr",function(e){
		e.preventDefault();
		iui.dialog.alert($(this).find(".J_check").data("id"));
	});
	//批量删除
	$("body").on("click","a.J_ajax_batch_del",function(e){
		e.preventDefault();
		var $this = $(this), href = $this.prop('href'), msg = $this.data('msg');
		var tc = $(this).data("target-class"),ids=[],i=0;
		$("."+tc+":checked").each(function(){
			ids[i]=$(this).data("id");
			i++;
		});
		var params = {
				message	: msg ? msg : '确定要批量删除['+ids.length+']条数据吗？',
				type	: 'confirm',
				isMask	: false,
				follow	: $(this),//跟随触发事件的元素显示
				onOk	: function() {
					$.ajax({
						url: href,
						type : 'post',
						dataType: 'json',
						data: {ids:ids},
						success: function(data){
							if(data.referer) {
									location.href = decodeURIComponent(data.referer);
								}else {
									reloadPage(window);
								}
						}
					});
				}
			};
			iui.dialog(params);
	});
	//所有的删除操作，删除数据后刷新页面
	if( $('a.J_ajax_del').length ) {
		iui.use('dialog',function() {

			$("body").on('click','.J_ajax_del',function(e) {
				e.preventDefault();
				var $this = $(this), href = $this.prop('href'), msg = $this.data('msg'), pdata = $this.data('pdata');
				var params = {
					message	: msg ? msg : '确定要删除吗？',
					type	: 'confirm',
					isMask	: false,
					follow	: $(this),//跟随触发事件的元素显示
					onOk	: function() {
						$.ajax({
							url: href,
							type : 'GET',
							dataType: 'json',
							data: function(){
								if(pdata) {
									pdata = $.parseJSON(pdata.replace(/'/g, '"'));
									return pdata
								}
							}(),
							success: function(data){
								reloadPage(window);
							}
							
						});
					}
				};
				iui.dialog(params);
			});

		});
	}

	//所有的请求刷新操作
	var ajax_refresh = $('a.J_ajax_refresh'),
		refresh_lock = false;
	if( ajax_refresh.length ) {
		ajax_refresh.on('click', function(e){
			e.preventDefault();
			if(refresh_lock) {
				return false;
			}
			refresh_lock = true;
			var pdata = $(this).data('pdata');

			$.ajax({
				url: this.href,
				type : 'post',
				dataType: 'json',
				data: function(){
					if(pdata) {
						pdata = $.parseJSON(pdata.replace(/'/g, '"'));
						return pdata
					}
				}(),
				success: function(data){
					refresh_lock = false;

					if(data.state === 'success') {
						if(data.referer) {
							location.href = decodeURIComponent(data.referer);
						}else {
							reloadPage(window);
						}
					}else if( data.state === 'fail' ) {
						iui.dialog.alert(data.message);
					}
				}
			});

		});
	}

	//拾色器
	var color_pick = $('.J_color_pick');
	if(color_pick.length) {
		iui.use('colorPicker',function() {
			color_pick.each(function() {
				$(this).colorPicker({
					default_color : 'url("'+ GV.IMG_SERVER_HOST +'/sso/themes/default/img/transparent.png")',		//写死
					callback:function(color) {
						var em = $(this).find('em'),
							input = $(this).next('.J_hidden_color');

						em.css('background',  color);
						input.val(color.length === 7 ? color : '');
					}
				});
			});
		});
	}

	//字体配置
	if($('.J_font_config').length) {
		iui.use('colorPicker',function() {
			var elem = $('.color_pick');
			elem.each(function() {
				var panel = $(this).parent('.J_font_config');
				var bg_elem = $(this).find('.J_bg');
				$(this).colorPicker({
					default_color : 'url("'+ GV.IMG_SERVER_HOST +'/sso/themes/default/img/transparent.png")',
					callback:function(color) {
						bg_elem.css('background',  color);
						panel.find('.case').css('color',color.length === 7 ? color : '');
						panel.find('.J_hidden_color').val(color.length === 7 ? color : '');
					}
				});
			});
		});
		//加粗、斜体、下划线的处理
		$('.J_bold,.J_italic,.J_underline').on('click',function() {
			var panel = $(this).parents('.J_font_config');
			var c = $(this).data('class');
			if( $(this).prop('checked') ) {
				panel.find('.case').addClass(c);
			}else {
				panel.find('.case').removeClass(c);
			}
		});
	}

	/*复选框全选(支持多个，纵横双控全选)。
	 *实例：版块编辑-权限相关（双控），验证机制-验证策略（单控）
	 *说明：
	 *	"J_check"的"data-xid"对应其左侧"J_check_all"的"data-checklist"；
	 *	"J_check"的"data-yid"对应其上方"J_check_all"的"data-checklist"；
	 *	全选框的"data-direction"代表其控制的全选方向(x或y)；
	 *	"J_check_wrap"同一块全选操作区域的父标签class，多个调用考虑
	*/

	$("body").on("click",'input.J_check_all',function(){
		var check_all = $(this), check_items;
		//分组各纵横项
		var check_all_direction = check_all.data('direction');
			check_items = $('input.J_check[data-'+ check_all_direction +'id="'+ check_all.data('checklist') +'"]');
		//点击全选框
		check_all.change(function (e) {
			var check_wrap = check_all.parents('.J_check_wrap'); //当前操作区域所有复选框的父标签（重用考虑）
			if ($(this).prop('checked')) {
				//全选状态
				check_items.prop('checked', true);
				//所有项都被选中
				if( check_wrap.find('input.J_check').length === check_wrap.find('input.J_check:checked').length) {
					check_wrap.find(check_all).attr('checked', true);
				}

			} else {
				//非全选状态
				check_items.removeAttr('checked');

				//另一方向的全选框取消全选状态
				var direction_invert = check_all_direction === 'x' ? 'y' : 'x';
				check_wrap.find($('input.J_check_all[data-direction="'+ direction_invert +'"]')).removeAttr('checked');
			}

		});

		//点击非全选时判断是否全部勾选
		check_items.change(function(){

			if($(this).prop('checked')) {

				if(check_items.filter(':checked').length === check_items.length) {
					//已选择和未选择的复选框数相等
					check_all.prop('checked', true);
				}

			}else{
				check_all.removeAttr('checked');
			}

		});
	});

	/*li列表添加&删除(支持多个)，实例(“验证机制-添加验证问题”，“附件相关-添加附件类型”)：
		<ul id="J_ul_list_verify" class="J_ul_list_public">
			<li><input type="text" value="111" ><a class="J_ul_list_remove" href="#">[删除]</a></li>
			<li><input type="text" value="111" ><a class="J_ul_list_remove" href="#">[删除]</a></li>
		</ul>
		<a data-related="verify" class="J_ul_list_add" href="#">添加验证</a>

		<ul id="J_ul_list_rule" class="J_ul_list_public">
			<li><input type="text" value="111" ><a class="J_ul_list_remove" href="#">[删除]</a></li>
			<li><input type="text" value="111" ><a class="J_ul_list_remove" href="#">[删除]</a></li>
		</ul>
		<a data-related="rule" class="J_ul_list_add" href="#">添加规则</a>
	*/
	var ul_list_add = $('a.J_ul_list_add');
	if(ul_list_add.length) {
		var new_key = 0;

		//添加
		ul_list_add.click(function(e){
			e.preventDefault();
			new_key++;
			var $this = $(this);

			//"new_"字符加上唯一的key值，_li_html 由列具体页面定义
			var $li_html = $(_li_html.replace(/new_/g, 'new_'+new_key));

			$('#J_ul_list_'+ $this.data('related')).append($li_html);
			$li_html.find('input.input').first().focus();
		});

		//删除
		$('ul.J_ul_list_public').on('click', 'a.J_ul_list_remove', function(e) {
			e.preventDefault();
			$(this).parents('li').remove();
		});
	}

	//日期选择器
	var dateInput = $("input.J_date")
	if(dateInput.length) {
		iui.use('datePicker',function() {
			dateInput.datePicker();
		});
	}

	//日期+时间选择器
	var dateTimeInput = $("input.J_datetime");
	if(dateTimeInput.length) {
		iui.use('datePicker',function() {
			dateTimeInput.datePicker({time:true});
		});
	}

	//图片上传预览
	if($("input.J_upload_preview").length) {
		Iui.use('uploadPreview',function() {
			$("input.J_upload_preview").uploadPreview();
		});
	}

	//代码复制
	var copy_btn = $('a.J_copy_clipboard'); //复制按钮
	if(copy_btn.length) {
		iui.use('dialog', 'textCopy', function() {
			for(i=0, len=copy_btn.length; i<len; i++) {
				var item = $(copy_btn[i]);
				item.textCopy({
					content : $('#' + item.data('rel')).val()
				});
			}
		});
	}

	//tab
	var tabs_nav = $('ul.J_tabs_nav');
	if(tabs_nav.length) {
		Iui.use('tabs',function() {
			tabs_nav.tabs('.J_tabs_contents > div');
		});
	}

	//radio切换显示对应区块
	var radio_change = $('.J_radio_change');
	if(radio_change.length){

		var radio_c = radio_change.find('input:checked');
		if(radio_c.length) {
			radio_c.each(function(){
				var $this = $(this);
				//页面载入
				change($this.data('arr'), $this.parents('.J_radio_change'));
			});
		}

		//切换radio
		$('.J_radio_change input:radio').on('change', function(){
			change($(this).data('arr'), $(this).parents('.J_radio_change'));
		});

	}
	function change(str, radio_change) {
		var rel = $(radio_change.data('rel'));
		if(rel.length) {
			rel.hide();
		}else{
			$('.J_radio_tbody, .J_radio_change_items').hide();
		}

		if(str) {
			var arr= new Array();
			arr = str.split(",");


			$.each(arr, function(i, o){
				$('#'+ o).show();
			});
		}
	}

	/*
	 * 默认头像
	*/
	var avas = $('img.J_avatar');
	if(avas.length) {
		avatarError(avas);
	}


})(jQuery);
