/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

layui.define("jquery",function(t){"use strict";var i=layui.$,a=(layui.hint(),layui.device()),e="layui-this",l="layui-show",n=function(){this.config={}};n.prototype.set=function(t){var a=this;return i.extend(!0,a.config,t),a},n.prototype.on=function(t,i){return layui.onevent.call(this,"element",t,i)},n.prototype.tabAdd=function(t,a){var e=i(".layui-tab[lay-filter="+t+"]"),l=e.children(".layui-tab-title"),n=l.children(".layui-tab-bar"),s=e.children(".layui-tab-content"),o='<li lay-id="'+(a.id||"")+'">'+(a.title||"unnaming")+"</li>";return n[0]?n.before(o):l.append(o),s.append('<div class="layui-tab-item">'+(a.content||"")+"</div>"),u.hideTabMore(!0),u.tabAuto(),this},n.prototype.tabDelete=function(t,a){var e=i(".layui-tab[lay-filter="+t+"]").children(".layui-tab-title").find('>li[lay-id="'+a+'"]');return u.tabDelete(null,e),this},n.prototype.tabChange=function(t,a){var e=i(".layui-tab[lay-filter="+t+"]").children(".layui-tab-title").find('>li[lay-id="'+a+'"]');return u.tabClick(null,null,e),this},n.prototype.tab=function(t){t=t||{},y.on("click",t.headerElem,function(a){var e=i(this).index();u.tabClick.call(this,a,e,null,t)})},n.prototype.progress=function(t,a){var e="layui-progress",l=i("."+e+"[lay-filter="+t+"]").find("."+e+"-bar"),n=l.find("."+e+"-text");return l.css("width",a),n.text(a),this};var s="layui-nav-tree",o="layui-nav-child",c="layui-nav-more",r="layui-anim layui-anim-upbit",u={tabClick:function(t,a,n,s){s=s||{};var o=n||i(this),a=a||o.parent().children("li").index(o),c=s.headerElem?o.parent():o.parents(".layui-tab").eq(0),r=s.bodyElem?i(s.bodyElem):c.children(".layui-tab-content").children(".layui-tab-item"),u=o.find("a"),d=c.attr("lay-filter");"javascript:;"!==u.attr("href")&&"_blank"===u.attr("target")||(o.addClass(e).siblings().removeClass(e),r.eq(a).addClass(l).siblings().removeClass(l)),layui.event.call(this,"element","tab("+d+")",{elem:c,index:a})},tabDelete:function(t,a){var l=a||i(this).parent(),n=l.index(),s=l.parents(".layui-tab").eq(0),o=s.children(".layui-tab-content").children(".layui-tab-item"),c=s.attr("lay-filter");l.hasClass(e)&&(l.next()[0]?u.tabClick.call(l.next()[0],null,n+1):l.prev()[0]&&u.tabClick.call(l.prev()[0],null,n-1)),l.remove(),o.eq(n).remove(),setTimeout(function(){u.tabAuto()},50),layui.event.call(this,"element","tabDelete("+c+")",{elem:s,index:n})},tabAuto:function(){var t="layui-tab-bar",e=this;i(".layui-tab").each(function(){var l=i(this),n=l.children(".layui-tab-title"),s=(l.children(".layui-tab-content").children(".layui-tab-item"),'lay-stope="tabmore"'),o=i('<span class="layui-unselect layui-tab-bar" '+s+"><i "+s+' class="layui-icon">&#xe61a;</i></span>');if(e===window&&8!=a.ie&&u.hideTabMore(!0),l.attr("lay-allowClose")&&n.find("li").each(function(){var t=i(this);if(!t.find(".layui-tab-close")[0]){var a=i('<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>');a.on("click",u.tabDelete),t.append(a)}}),n.prop("scrollWidth")>n.outerWidth()+1){if(n.find("."+t)[0])return;n.append(o),l.attr("overflow",""),o.on("click",function(t){n[this.title?"removeClass":"addClass"]("layui-tab-more"),this.title=this.title?"":"收缩"})}else n.find("."+t).remove(),l.removeAttr("overflow")})},hideTabMore:function(t){var a=i(".layui-tab-title");!0!==t&&"tabmore"===i(t.target).attr("lay-stope")||(a.removeClass("layui-tab-more"),a.find(".layui-tab-bar").attr("title",""))},clickThis:function(){var t=i(this),a=t.parents(".layui-nav"),l=a.attr("lay-filter"),n=t.find("a"),s="string"==typeof t.attr("lay-unselect");t.find("."+o)[0]||("javascript:;"!==n.attr("href")&&"_blank"===n.attr("target")||s||(a.find("."+e).removeClass(e),t.addClass(e)),layui.event.call(this,"element","nav("+l+")",t))},clickChild:function(){var t=i(this),a=t.parents(".layui-nav"),l=a.attr("lay-filter");a.find("."+e).removeClass(e),t.addClass(e),layui.event.call(this,"element","nav("+l+")",t)},showChild:function(){var t=i(this),a=t.parents(".layui-nav"),e=t.parent(),l=t.siblings("."+o);a.hasClass(s)&&(l.removeClass(r),e["none"===l.css("display")?"addClass":"removeClass"]("layui-nav-itemed"))},collapse:function(){var t=i(this),a=t.find(".layui-colla-icon"),e=t.siblings(".layui-colla-content"),n=t.parents(".layui-collapse").eq(0),s=n.attr("lay-filter"),o="none"===e.css("display");if("string"==typeof n.attr("lay-accordion")){var c=n.children(".layui-colla-item").children("."+l);c.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"),c.removeClass(l)}e[o?"addClass":"removeClass"](l),a.html(o?"&#xe61a;":"&#xe602;"),layui.event.call(this,"element","collapse("+s+")",{title:t,content:e,show:o})}};n.prototype.init=function(t,e){var n=e?'[lay-filter="'+e+'"]':"",d={tab:function(){u.tabAuto.call({})},nav:function(){var t={},e={},d={},y=function(n,u,y){var h=i(this),f=h.find("."+o);u.hasClass(s)?n.css({top:h.position().top,height:h.children("a").height(),opacity:1}):(f.addClass(r),n.css({left:h.position().left+parseFloat(h.css("marginLeft")),top:h.position().top+h.height()-n.height()}),t[y]=setTimeout(function(){n.css({width:h.width(),opacity:1})},a.ie&&a.ie<10?0:200),clearTimeout(d[y]),"block"===f.css("display")&&clearTimeout(e[y]),e[y]=setTimeout(function(){f.addClass(l),h.find("."+c).addClass(c+"d")},300))};i(".layui-nav"+n).each(function(a){var n=i(this),r=i('<span class="layui-nav-bar"></span>'),h=n.find(".layui-nav-item");n.find(".layui-nav-bar")[0]||(n.append(r),h.on("mouseenter",function(){y.call(this,r,n,a)}).on("mouseleave",function(){n.hasClass(s)||(clearTimeout(e[a]),e[a]=setTimeout(function(){n.find("."+o).removeClass(l),n.find("."+c).removeClass(c+"d")},300))}),n.on("mouseleave",function(){clearTimeout(t[a]),d[a]=setTimeout(function(){n.hasClass(s)?r.css({height:0,top:r.position().top+r.height()/2,opacity:0}):r.css({width:0,left:r.position().left+r.width()/2,opacity:0})},200)})),h.each(function(){var t=i(this),a=t.find("."+o);a[0]&&!t.find("."+c)[0]&&t.children("a").append('<span class="'+c+'"></span>'),t.off("click",u.clickThis).on("click",u.clickThis),t.children("a").off("click",u.showChild).on("click",u.showChild),a.children("dd").off("click",u.clickChild).on("click",u.clickChild)})})},breadcrumb:function(){i(".layui-breadcrumb"+n).each(function(){var t=i(this),a=t.attr("lay-separator")||"/",e=t.find("a");e.next("span[lay-separator]")[0]||(e.each(function(t){t!==e.length-1&&i(this).after("<span lay-separator>"+a+"</span>")}),t.css("visibility","visible"))})},progress:function(){var t="layui-progress";i("."+t+n).each(function(){var a=i(this),e=a.find(".layui-progress-bar"),l=e.attr("lay-percent");e.css("width",/^.+\/.+$/.test(l)?100*new Function("return "+l)()+"%":l),a.attr("lay-showPercent")&&setTimeout(function(){e.html('<span class="'+t+'-text">'+l+"</span>")},350)})},collapse:function(){i(".layui-collapse"+n).each(function(){i(this).find(".layui-colla-item").each(function(){var t=i(this),a=t.find(".layui-colla-title"),e="none"===t.find(".layui-colla-content").css("display");a.find(".layui-colla-icon").remove(),a.append('<i class="layui-icon layui-colla-icon">'+(e?"&#xe602;":"&#xe61a;")+"</i>"),a.off("click",u.collapse).on("click",u.collapse)})})}};return d[t]?d[t]():layui.each(d,function(t,i){i()})},n.prototype.render=n.prototype.init;var d=new n,y=i(document);d.render();y.on("click",".layui-tab-title li",u.tabClick),y.on("click",u.hideTabMore),i(window).on("resize",u.tabAuto),t("element",d)});