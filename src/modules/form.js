
/**
 * 表单组件
 * @author 梅心斌
 */
(function($){
    "use strict";

    var ELEM = '.iui-form', THIS = 'iui-this', SHOW = 'iui-show', HIDE = 'iui-hide', DISABLED = 'iui-disabled';
    var Form = function(){
        this.config = {

        };
    };

    //全局设置
    Form.prototype.set = function(options){
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };
    //遍历
    var each = function(obj, fn){
        var key,that = this;
        if(typeof fn !== 'function') return that;
        obj = obj || [];
        if(obj.constructor === Object){
            for(key in obj){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        } else {
            for(key = 0; key < obj.length; key++){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        }
        return that;
    };
    //表单控件渲染
    Form.prototype.render = function(type, filter){
        var that = this,elemForm = $(ELEM + function(){
                return filter ? ('[iui-filter="' + filter +'"]') : '';
            }())
            ,items = {

            //下拉选择框
            select: function(){
                var TIPS = '请选择', CLASS = 'iui-form-select', TITLE = 'iui-select-title'
                    ,NONE = 'iui-select-none', initValue = '', thatInput

                    ,selects = elemForm.find('select'), hide = function(e, clear){
                    if(!$(e.target).parent().hasClass(TITLE) || clear){
                        $('.'+CLASS).removeClass(CLASS+'ed ' + CLASS+'up');
                        thatInput && initValue && thatInput.val(initValue);
                    }
                    thatInput = null;
                }
                    ,events = function(reElem, disabled, isSearch){
                    var select = $(this)
                        ,title = reElem.find('.' + TITLE)
                        ,input = title.find('input')
                        ,dl = reElem.find('dl')
                        ,dds = dl.children('dd')


                    if(disabled) return;

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
                    }, hideDown = function(choose){
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
                    title.on('click', function(e){
                        reElem.hasClass(CLASS+'ed') ? (
                                hideDown()
                            ) : (
                                hide(e, true),
                                    showDown()
                            );
                        dl.find('.'+NONE).remove();
                    });

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

                    if(isSearch){
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
                        var othis = $(this), value = othis.attr('iui-value');
                        var filter = select.attr('iui-filter'); //获取过滤器

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
                    $(document).off('click', hide).on('click', hide);
                }

                selects.each(function(index, select){
                    var othis = $(this)
                        ,hasRender = othis.next('.'+CLASS)
                        ,disabled = this.disabled
                        ,value = select.value
                        ,selected = $(select.options[select.selectedIndex]) //获取当前选中项
                        ,optionsFirst = select.options[0];

                    if(typeof othis.attr('iui-ignore') === 'string') return othis.show();

                    var isSearch = typeof othis.attr('iui-search') === 'string'
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
                                var item= options[index];
                                if(index === 0 && !item.value){
                                    arr.push('<dd iui-value="" class="iui-select-tips">'+ (item.innerHTML || TIPS) +'</dd>');
                                } else if(item.tagName.toLowerCase() === 'optgroup'){
                                    arr.push('<dt>'+ item.label +'</dt>');
                                } else {
                                    arr.push('<dd iui-value="'+ item.value +'" class="'+ (value === item.value ?  THIS : '') + (item.disabled ? (' '+DISABLED) : '') +'">'+ item.innerHTML +'</dd>');
                                }
                            };
                            arr.length === 0 && arr.push('<dd iui-value="" class="'+ DISABLED +'">没有选项</dd>');
                            return arr.join('');
                        }(othis.find('*')) +'</dl>'
                        ,'</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem, disabled, isSearch);
                });
            }
            //复选框/开关
            ,checkbox: function(){
                var CLASS = {
                    checkbox: ['iui-form-checkbox', 'iui-form-checked', 'checkbox']
                    ,_switch: ['iui-form-switch', 'iui-form-onswitch', 'switch']
                }
                    ,checks = elemForm.find('input[type=checkbox]')

                    ,events = function(reElem, RE_CLASS){
                    var check = $(this);

                    //勾选
                    reElem.on('click', function(){
                        var filter = check.attr('iui-filter') //获取过滤器
                            ,text = (check.attr('iui-text')||'').split('|');

                        if(check[0].disabled) return;

                        check[0].checked ? (
                                check[0].checked = false
                                    ,reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
                            ) : (
                                check[0].checked = true
                                    ,reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
                            );
                    });
                }

                checks.each(function(index, check){
                    var othis = $(this), skin = othis.attr('iui-skin')
                        ,text = (othis.attr('iui-text')||'').split('|'), disabled = this.disabled;
                    if(skin === 'switch') skin = '_'+skin;
                    var RE_CLASS = CLASS[skin] || CLASS.checkbox;

                    if(typeof othis.attr('iui-ignore') === 'string') return othis.show();

                    //替代元素
                    var hasRender = othis.next('.' + RE_CLASS[0]);
                    var reElem = $(['<div class="iui-unselect '+ RE_CLASS[0] + (
                        check.checked ? (' '+RE_CLASS[1]) : '') + (disabled ? ' iui-checkbox-disbaled '+DISABLED : '') +'" iui-skin="'+ (skin||'') +'">'
                        ,{
                            _switch: '<em>'+ ((check.checked ? text[0] : text[1])||'') +'</em><i></i>'
                        }[skin] || ((check.title.replace(/\s/g, '') ? ('<span>'+ check.title +'</span>') : '') +'<i class="iui-icon">'+ (skin ? '&#xe605;' : '&#xe618;') +'</i>')
                        ,'</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem, RE_CLASS);
                });
            }
            //单选框
            ,radio: function(){
                var CLASS = 'iui-form-radio', ICON = ['&#xe643;', '&#xe63f;']
                    ,radios = elemForm.find('input[type=radio]')

                    ,events = function(reElem){
                    var radio = $(this), ANIM = 'iui-anim-scaleSpring';

                    reElem.on('click', function(){
                        var name = radio[0].name, forms = radio.parents(ELEM);
                        var filter = radio.attr('iui-filter'); //获取过滤器
                        var sameRadio = forms.find('input[name='+ name.replace(/(\.|#|\[|\])/g, '\\$1') +']'); //找到相同name的兄弟

                        if(radio[0].disabled) return;

                        sameRadio.each(function(){
                            var next = $(this).next('.'+CLASS);
                            //XXXXX 单选按钮不能修改，只需把选中的那个设置为checked即可
                            // this.checked = false;
                            next.removeClass(CLASS+'ed');
                            next.find('.iui-icon').removeClass(ANIM).html(ICON[1]);
                        });

                        radio[0].checked = true;
                        reElem.addClass(CLASS+'ed');
                        reElem.find('.iui-icon').addClass(ANIM).html(ICON[0]);
                    });
                };

                radios.each(function(index, radio){
                    var othis = $(this), hasRender = othis.next('.' + CLASS), disabled = this.disabled;

                    if(typeof othis.attr('iui-ignore') === 'string') return othis.show();

                    //替代元素
                    var reElem = $(['<div class="iui-unselect '+ CLASS + (radio.checked ? (' '+CLASS+'ed') : '') + (disabled ? ' iui-radio-disbaled '+DISABLED : '') +'">'
                        ,'<i class="iui-anim iui-icon">'+ ICON[radio.checked ? 0 : 1] +'</i>'
                        ,'<span>'+ (radio.title||'未命名') +'</span>'
                        ,'</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem);
                });
            }
        };
        type ? (
                items[type] ? items[type]() : hint.error('不支持的'+ type + '表单渲染')
            ) : each(items, function(index, item){
                item();
            });

        return that;
    };

    //自动完成渲染
    var form = new Form(),dom = $(document), win = $(window);

    form.render();

    //表单reset重置渲染
    dom.on('reset', ELEM, function(){
        var filter = $(this).attr('iui-filter');
        setTimeout(function(){
            form.render(null, filter);
        }, 50);
    });
})(jQuery);


