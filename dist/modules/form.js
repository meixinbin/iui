
;$(function() {
    var ELEM = '.iui-form', THIS = 'iui-this', SHOW = 'iui-show', HIDE = 'iui-hide', DISABLED = 'iui-disabled';
    var dom = $(document), win = $(window);
    //表单复选框点击事件
    $(document).on("click", ".iui-form-checkbox", function() {
        $(this).toggleClass("iui-form-checked");
        if($(this).hasClass("iui-form-checked")) {
            $(this).prev().attr("checked", true);
        } else {
            $(this).prev().attr("checked", false);
        }

    });
    //switch 点击事件
    $(document).on("click", ".iui-form-switch", function() {
        $(this).toggleClass("iui-form-onswitch");
        if($(this).hasClass("iui-form-onswitch")) {
            $(this).prev().attr("checked", true);
        } else {
            $(this).prev().attr("checked", false);
        }

    });
    $(function() {
        var checks = $(".iui-form").find('input[type=checkbox]');
        var CLASS = {
                checkbox: ['iui-form-checkbox', 'iui-form-checked', 'checkbox'],
                switch: ['iui-form-switch', 'iui-form-onswitch', 'switch']
            },
            DISABLED = 'iui-disabled';
        checks.each(function(index, check) {
            var _this = $(this),
                disabled = this.disabled,
                title = $(this).attr("title"),
                skin = _this.attr('skin'),
                text = (_this.data('text') || '').split('|');
            var RE_CLASS = CLASS[skin] || CLASS.checkbox;
            //替代元素
            var hasRender = _this.next('.' + RE_CLASS[0]);
            //                var check_tpl='<div class="iui-unselect \
            //                '+RE_CLASS[0]+'\
            //                \
            //                ';
            //                alert(check_tpl)
            var reElem = ['<div class="iui-unselect ' + RE_CLASS[0],
                (
                    check.checked ? (' ' + RE_CLASS[1]) : '') + (disabled ? ' iui-checkbox-disbaled ' + DISABLED : '') + '" skin="' + (skin || '') + '">', {
                    switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
                }[skin] || ((check.title.replace(/\s/g, '') ? ('<span>' + check.title + '</span>') : '') + '<i class="iui-icon">' + (skin ? '&#xe605;' : '&#xe618;') + '</i>'), '</div>'
            ].join('');
            hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
            _this.after(reElem);

        });
    });
    $(function() {
        var CLASS = 'iui-form-radio',
            ICON = ['&#xe643;', '&#xe63f;'],
            radios = $(".iui-form").find('input[type=radio]');
        $(document).on("click", ".iui-form-radio", function() {
            var radio = $(this).prev(),
                ANIM = 'iui-anim-scaleSpring';
            var name = radio.attr("name"),
                forms = radio.parents().find("form");

            var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟
            if(radio.disabled) return;
            sameRadio.each(function() {
                var next = $(this).next('.' + CLASS);
//				this.checked = false;
//				$(this).attr("checked",false);
                next.removeClass(CLASS + 'ed');
                next.find('.iui-icon').removeClass(ANIM).html(ICON[1]);
            });
            radio.attr("checked",true);
            $(this).addClass(CLASS + 'ed');
            $(this).find('.iui-icon').addClass(ANIM).html(ICON[0]);
        });
        radios.each(function(index, radio) {
            var othis = $(this),
                hasRender = othis.next('.' + CLASS),
                disabled = this.disabled;
            //                if(typeof othis.attr('lay-ignore') === 'string') return othis.show();

            //替代元素
            var reElem = $(['<div class="iui-unselect ' + CLASS + (radio.checked ? (' ' + CLASS + 'ed') : '') + (disabled ? ' iui-radio-disbaled ' + DISABLED : '') + '">', '<i class="iui-anim iui-icon">' + ICON[radio.checked ? 0 : 1] + '</i>', '<span>' + (radio.title || '未命名') + '</span>', '</div>'].join(''));

            hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
            othis.after(reElem);
        });
    });
    //下拉选择框
    $(function(){
        var TIPS = '请选择', CLASS = 'iui-form-select', TITLE = 'iui-select-title'
            ,NONE = 'iui-select-none', initValue = '', thatInput
            ,selects = $(".iui-form").find('select'), 
        hide = function(e, clear){
            if(!$(e.target).parent().hasClass(TITLE) || clear){
                $('.'+CLASS).removeClass(CLASS+'ed ' + CLASS+'up');
                thatInput && initValue && thatInput.val(initValue);
            }
            thatInput = null;
        }
        $(document).on("click",".iui-form-select",function(){
            var select = $(this),reElem = $(this),title = reElem.find('.' + TITLE)
                ,input = title.find('input')
                ,dl = reElem.find('dl')
                ,dds = dl.children('dd');
//          if(disabled){
//              return;
//          }
			reElem.toggleClass(CLASS+'ed');
            //展开下拉
            var showDown = function(){
                var top = reElem.offset().top + reElem.outerHeight() + 5 - win.scrollTop()
                    ,dlHeight = dl.outerHeight();
                reElem.addClass(CLASS+'ed');
                dds.removeClass(HIDE);

                //上下定位识别
                if(top + dlHeight > win.height() && top >= dlHeight){
                    reElem.addClass(CLASS + 'up');
                }
            },
            hideDown = function(choose){
                reElem.removeClass(CLASS+'ed ' + CLASS+'up');
                input.blur();
                if(choose) return;
                notOption(input.val(), function(none){
                    if(none){
                        initValue = dl.find('.'+THIS).html();
                        input && input.val(initValue);
                    }
                });
            };

            //点击标题区域
//          title.off('click').on('click',title, function(e){
//
////              reElem.hasClass(CLASS+'ed') ? hideDown():(hide(e, true),showDown());
//              reElem.toggleClass(CLASS+'ed');
//              dl.find('.'+NONE).remove();
//          });

            //点击箭头获取焦点
            title.find('.iui-edge').on('click', function(){
                input.focus();
            });

            //键盘事件
            input.on('keyup', function(e){
                var keyCode = e.keyCode;
                //Tab键
                if(keyCode === 9){
                    showDown();
                }
            }).on('keydown', function(e){
                var keyCode = e.keyCode;
                //Tab键
                if(keyCode === 9){
                    hideDown();
                } else if(keyCode === 13){ //回车键
                    e.preventDefault();
                }
            });

            //检测值是否不属于select项
            var notOption = function(value, callback, origin){
                var num = 0;
                dds.each(function(){
                    var othis = $(this)
                        ,text = othis.text()
                        ,not = text.indexOf(value) === -1;
                    if(value === '' || (origin === 'blur') ? value !== text : not) num++;
                    origin === 'keyup' && othis[not ? 'addClass' : 'removeClass'](HIDE);
                });
                var none = num === dds.length;
                return callback(none), none;
            };

            //搜索匹配
            var search = function(e){
                var value = this.value, keyCode = e.keyCode;

                if(keyCode === 9 || keyCode === 13
                    || keyCode === 37 || keyCode === 38
                    || keyCode === 39 || keyCode === 40
                ){
                    return false;
                }

                notOption(value, function(none){
                    if(none){
                        dl.find('.'+NONE)[0] || dl.append('<p class="'+ NONE +'">无匹配项</p>');
                    } else {
                        dl.find('.'+NONE).remove();
                    }
                }, 'keyup');

                if(value === ''){
                    dl.find('.'+NONE).remove();
                }
            };

            if(false){
                input.on('keyup', search).on('blur', function(e){
                    thatInput = input;
                    initValue = dl.find('.' + THIS).html();
                    setTimeout(function(){
                        notOption(input.val(), function(none){
                            initValue || input.val(''); //none && !initValue
                        }, 'blur');
                    }, 200);
                });
            }

            //选择
            dds.on('click', function(){
                var othis = $(this), value = othis.attr('lay-value');
                if(othis.hasClass(DISABLED)) return false;
                if(othis.hasClass('iui-select-tips')){
                    input.val('');
                } else {
                    input.val(othis.text());
                    othis.addClass(THIS);
                }
                othis.siblings().removeClass(THIS);
                select.val(value).removeClass('iui-form-danger')
                hideDown(true);
                return false;
            });

            reElem.find('dl>dt').on('click', function(e){
                return false;
            });

            //关闭下拉
//          $(document).off('click', hide).on('click', hide);
        });

        selects.each(function(index, select){
            var othis = $(this)
                ,hasRender = othis.next('.'+CLASS)
                ,disabled = this.disabled
                ,value = select.value
                ,selected = $(select.options[select.selectedIndex]) //获取当前选中项
                ,optionsFirst = select.options[0];

            if(typeof othis.attr('lay-ignore') === 'string') return othis.show();

            var isSearch = typeof othis.attr('lay-search') === 'string'
                ,placeholder = optionsFirst ? (
                    optionsFirst.value ? TIPS : (optionsFirst.innerHTML || TIPS)
                ) : TIPS;

            //替代元素
            var reElem = $(['<div class="'+ (isSearch ? '' : 'iui-unselect ') + CLASS + (disabled ? ' iui-select-disabled' : '') +'">'
                ,'<div class="'+ TITLE +'"><input type="text" placeholder="'+ placeholder +'" value="'+ (value ? selected.html() : '') +'" '+ (isSearch ? '' : 'readonly') +' class="iui-input'+ (isSearch ? '' : ' iui-unselect') + (disabled ? (' ' + DISABLED) : '') +'">'
                ,'<i class="iui-edge"></i></div>'
                ,'<dl class="iui-anim iui-anim-upbit'+ (othis.find('optgroup')[0] ? ' iui-select-group' : '') +'">'+ function(options){
                    var arr = [];
                    for(var index=0;index<options.length;index++){
                        var item = options[index];
                        if(index === 0 && !item.value){
                            arr.push('<dd lay-value="" class="iui-select-tips">'+ (item.innerHTML || TIPS) +'</dd>');
                        } else if(item.tagName.toLowerCase() === 'optgroup'){
                            arr.push('<dt>'+ item.label +'</dt>');
                        } else {
                            arr.push('<dd lay-value="'+ item.value +'" class="'+ (value === item.value ?  THIS : '') + (item.disabled ? (' '+DISABLED) : '') +'">'+ item.innerHTML +'</dd>');
                        }
                    }
                    arr.length === 0 && arr.push('<dd lay-value="" class="'+ DISABLED +'">没有选项</dd>');
                    return arr.join('');
                }(othis.find('*')) +'</dl>'
                ,'</div>'].join(''));

            hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
            othis.after(reElem);
        });
    });
});