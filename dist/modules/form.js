/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

!function(i,e){"use strict";var t=".iui-form",n="iui-this",a="iui-disabled",s=function(){this.config={}};s.prototype.set=function(e){var t=this;return i.extend(!0,t.config,e),t},s.prototype.on=function(i,t){return e.onevent.call(this,"form",i,t)},s.prototype.render=function(s,u){var r=this,l=i(t+(u?'[iui-filter="'+u+'"]':"")),c={select:function(){var t,s="iui-form-select",u="iui-select-title",r="iui-select-none",c="",d=function(e,n){i(e.target).parent().hasClass(u)&&!n||(i("."+s).removeClass(s+"ed "+s+"up"),t&&c&&t.val(c)),t=null},f=function(l,f,v){var h=i(this),p=l.find("."+u),m=p.find("input"),k=l.find("dl"),g=k.children("dd");if(!f){var x=function(){var i=l.offset().top+l.outerHeight()+5-o.scrollTop(),e=k.outerHeight();l.addClass(s+"ed"),g.removeClass("iui-hide"),i+e>o.height()&&i>=e&&l.addClass(s+"up")},b=function(i){l.removeClass(s+"ed "+s+"up"),m.blur(),i||C(m.val(),function(i){i&&(c=k.find("."+n).html(),m&&m.val(c))})};p.on("click",function(i){l.hasClass(s+"ed")?b():(d(i,!0),x()),k.find("."+r).remove()}),p.find(".iui-edge").on("click",function(){m.focus()}),m.on("keyup",function(i){9===i.keyCode&&x()}).on("keydown",function(i){var e=i.keyCode;9===e?b():13===e&&i.preventDefault()});var C=function(e,t,n){var a=0;g.each(function(){var t=i(this),s=t.text(),u=-1===s.indexOf(e);(""===e||"blur"===n?e!==s:u)&&a++,"keyup"===n&&t[u?"addClass":"removeClass"]("iui-hide")});var s=a===g.length;return t(s),s};v&&m.on("keyup",function(i){var e=this.value,t=i.keyCode;if(9===t||13===t||37===t||38===t||39===t||40===t)return!1;C(e,function(i){i?k.find("."+r)[0]||k.append('<p class="'+r+'">无匹配项</p>'):k.find("."+r).remove()},"keyup"),""===e&&k.find("."+r).remove()}).on("blur",function(i){t=m,c=k.find("."+n).html(),setTimeout(function(){C(m.val(),function(i){c||m.val("")},"blur")},200)}),g.on("click",function(){var t=i(this),s=t.attr("iui-value"),u=h.attr("iui-filter");return!t.hasClass(a)&&(t.hasClass("iui-select-tips")?m.val(""):(m.val(t.text()),t.addClass(n)),t.siblings().removeClass(n),h.val(s).removeClass("iui-form-danger"),e.event.call(this,"form","select("+u+")",{elem:h[0],value:s,othis:l}),b(!0),!1)}),l.find("dl>dt").on("click",function(i){return!1}),i(document).off("click",d).on("click",d)}};l.find("select").each(function(e,t){var r=i(this),o=r.next("."+s),l=this.disabled,c=t.value,d=i(t.options[t.selectedIndex]),v=t.options[0];if("string"==typeof r.attr("iui-ignore"))return r.show();var h="string"==typeof r.attr("iui-search"),p=v?v.value?"请选择":v.innerHTML||"请选择":"请选择",m=i(['<div class="'+(h?"":"iui-unselect ")+s+(l?" iui-select-disabled":"")+'">','<div class="'+u+'"><input type="text" placeholder="'+p+'" value="'+(c?d.html():"")+'" '+(h?"":"readonly")+' class="iui-input'+(h?"":" iui-unselect")+(l?" "+a:"")+'">','<i class="iui-edge"></i></div>','<dl class="iui-anim iui-anim-upbit'+(r.find("optgroup")[0]?" iui-select-group":"")+'">'+function(i){for(var e=[],t=0;t<i.length;t++){var s=i[t];0!==t||s.value?"optgroup"===s.tagName.toLowerCase()?e.push("<dt>"+s.label+"</dt>"):e.push('<dd iui-value="'+s.value+'" class="'+(c===s.value?n:"")+(s.disabled?" "+a:"")+'">'+s.innerHTML+"</dd>"):e.push('<dd iui-value="" class="iui-select-tips">'+(s.innerHTML||"请选择")+"</dd>")}return 0===e.length&&e.push('<dd iui-value="" class="iui-disabled">没有选项</dd>'),e.join("")}(r.find("*"))+"</dl>","</div>"].join(""));o[0]&&o.remove(),r.after(m),f.call(this,m,l,h)})},checkbox:function(){var t={checkbox:["iui-form-checkbox","iui-form-checked","checkbox"],_switch:["iui-form-switch","iui-form-onswitch","switch"]},n=function(t,n){var a=i(this);t.on("click",function(){var i=a.attr("iui-filter"),s=(a.attr("iui-text")||"").split("|");a[0].disabled||(a[0].checked?(a[0].checked=!1,t.removeClass(n[1]).find("em").text(s[1])):(a[0].checked=!0,t.addClass(n[1]).find("em").text(s[0])),e.event.call(a[0],"form",n[2]+"("+i+")",{elem:a[0],value:a[0].value,othis:t}))})};l.find("input[type=checkbox]").each(function(e,s){var u=i(this),r=u.attr("iui-skin"),o=(u.attr("iui-text")||"").split("|"),l=this.disabled;"switch"===r&&(r="_"+r);var c=t[r]||t.checkbox;if("string"==typeof u.attr("iui-ignore"))return u.show();var d=u.next("."+c[0]),f=i(['<div class="iui-unselect '+c[0]+(s.checked?" "+c[1]:"")+(l?" iui-checkbox-disbaled "+a:"")+'" iui-skin="'+(r||"")+'">',{_switch:"<em>"+((s.checked?o[0]:o[1])||"")+"</em><i></i>"}[r]||(s.title.replace(/\s/g,"")?"<span>"+s.title+"</span>":"")+'<i class="iui-icon">'+(r?"&#xe605;":"&#xe618;")+"</i>","</div>"].join(""));d[0]&&d.remove(),u.after(f),n.call(this,f,c)})},radio:function(){var n="iui-form-radio",s=["&#xe643;","&#xe63f;"],u=function(a){var u=i(this),r="iui-anim-scaleSpring";a.on("click",function(){var o=u[0].name,l=u.parents(t),c=u.attr("iui-filter"),d=l.find("input[name="+o.replace(/(\.|#|\[|\])/g,"\\$1")+"]");u[0].disabled||(d.each(function(){var e=i(this).next("."+n);e.removeClass(n+"ed"),e.find(".iui-icon").removeClass(r).html(s[1])}),u[0].checked=!0,a.addClass(n+"ed"),a.find(".iui-icon").addClass(r).html(s[0]),e.event.call(u[0],"form","radio("+c+")",{elem:u[0],value:u[0].value,othis:a}))})};l.find("input[type=radio]").each(function(e,t){var r=i(this),o=r.next("."+n),l=this.disabled;if("string"==typeof r.attr("iui-ignore"))return r.show();var c=i(['<div class="iui-unselect '+n+(t.checked?" "+n+"ed":"")+(l?" iui-radio-disbaled "+a:"")+'">','<i class="iui-anim iui-icon">'+s[t.checked?0:1]+"</i>","<div>"+function(){var i=t.title||"";return"string"==typeof r.next().attr("iui-radio")&&(i=r.next().html(),r.next().remove()),i}()+"</div>","</div>"].join(""));o[0]&&o.remove(),r.after(c),u.call(this,c)})}};return s?c[s]?c[s]():alert("不支持的"+s+"表单渲染"):e.each(c,function(i,e){e()}),r};var u=new s,r=i(document),o=i(window);u.render(),r.on("reset",t,function(){var e=i(this).attr("iui-filter");setTimeout(function(){u.render(null,e)},50)}),e.form=u}(jQuery,window.iui);