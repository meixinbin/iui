/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

!function(i){"use strict";var t="iui-this",e="iui-show",n=function(){this.config={}};n.prototype.set=function(t){var e=this;return i.extend(!0,e.config,t),e},n.prototype.tabAdd=function(t,e){var n=i(".iui-tab[iui-filter="+t+"]"),a=n.children(".iui-tab-title"),s=a.children(".iui-tab-bar"),l=n.children(".iui-tab-content"),r='<li iui-id="'+(e.id||"")+'">'+(e.title||"unnaming")+"</li>";return s[0]?s.before(r):a.append(r),l.append('<div class="iui-tab-item">'+(e.content||"")+"</div>"),o.hideTabMore(!0),o.tabAuto(),this},n.prototype.tabDelete=function(t,e){var n=i(".iui-tab[iui-filter="+t+"]").children(".iui-tab-title").find('>li[iui-id="'+e+'"]');return o.tabDelete(null,n),this},n.prototype.tabChange=function(t,e){var n=i(".iui-tab[iui-filter="+t+"]").children(".iui-tab-title").find('>li[iui-id="'+e+'"]');return o.tabClick(null,null,n),this},n.prototype.tab=function(t){t=t||{},r.on("click",t.headerElem,function(e){var n=i(this).index();o.tabClick.call(this,e,n,null,t)})},n.prototype.progress=function(t,e){var n="iui-progress",a=i("."+n+"[iui-filter="+t+"]").find("."+n+"-bar"),s=a.find("."+n+"-text");return a.css("width",e),s.text(e),this};var a="iui-nav-child",s="iui-nav-more",o={tabClick:function(n,a,s,o){o=o||{};var l=s||i(this),a=a||l.parent().children("li").index(l),r=o.headerElem?l.parent():l.parents(".iui-tab").eq(0),c=o.bodyElem?i(o.bodyElem):r.children(".iui-tab-content").children(".iui-tab-item"),u=l.find("a");r.attr("iui-filter");"javascript:;"!==u.attr("href")&&"_blank"===u.attr("target")||(l.addClass(t).siblings().removeClass(t),c.eq(a).addClass(e).siblings().removeClass(e))},tabDelete:function(e,n){var a=n||i(this).parent(),s=a.index(),l=a.parents(".iui-tab").eq(0),r=l.children(".iui-tab-content").children(".iui-tab-item");l.attr("iui-filter");a.hasClass(t)&&(a.next()[0]?o.tabClick.call(a.next()[0],null,s+1):a.prev()[0]&&o.tabClick.call(a.prev()[0],null,s-1)),a.remove(),r.eq(s).remove(),setTimeout(function(){o.tabAuto()},50)},tabAuto:function(){var t="iui-tab-bar",e=this;i(".iui-tab").each(function(){var n=i(this),a=n.children(".iui-tab-title"),s=(n.children(".iui-tab-content").children(".iui-tab-item"),'iui-stope="tabmore"'),l=i('<span class="iui-unselect iui-tab-bar" '+s+"><i "+s+' class="iui-icon">&#xe61a;</i></span>');if(e===window&&8!=device.ie&&o.hideTabMore(!0),n.attr("iui-allowClose")&&a.find("li").each(function(){var t=i(this);if(!t.find(".iui-tab-close")[0]){var e=i('<i class="iui-icon iui-unselect iui-tab-close">&#x1006;</i>');e.on("click",o.tabDelete),t.append(e)}}),a.prop("scrollWidth")>a.outerWidth()+1){if(a.find("."+t)[0])return;a.append(l),n.attr("overflow",""),l.on("click",function(i){a[this.title?"removeClass":"addClass"]("iui-tab-more"),this.title=this.title?"":"收缩"})}else a.find("."+t).remove(),n.removeAttr("overflow")})},hideTabMore:function(t){var e=i(".iui-tab-title");!0!==t&&"tabmore"===i(t.target).attr("iui-stope")||(e.removeClass("iui-tab-more"),e.find(".iui-tab-bar").attr("title",""))},clickThis:function(){var e=i(this),n=e.parents(".iui-nav"),s=(n.attr("iui-filter"),e.find("a")),o="string"==typeof e.attr("iui-unselect");e.find("."+a)[0]||"javascript:;"!==s.attr("href")&&"_blank"===s.attr("target")||o||(n.find("."+t).removeClass(t),e.addClass(t))},clickChild:function(){var e=i(this),n=e.parents(".iui-nav");n.attr("iui-filter");n.find("."+t).removeClass(t),e.addClass(t)},showChild:function(){var t=i(this),e=t.parents(".iui-nav"),n=t.parent(),s=t.siblings("."+a);e.hasClass("iui-nav-tree")&&(s.removeClass("iui-anim iui-anim-upbit"),n["none"===s.css("dispiui")?"addClass":"removeClass"]("iui-nav-itemed"))},collapse:function(){var t=i(this),n=t.find(".iui-colla-icon"),a=t.siblings(".iui-colla-content"),s=t.parents(".iui-collapse").eq(0),o=(s.attr("iui-filter"),"none"===a.css("dispiui"));if("string"==typeof s.attr("iui-accordion")){var l=s.children(".iui-colla-item").children("."+e);l.siblings(".iui-colla-title").children(".iui-colla-icon").html("&#xe602;"),l.removeClass(e)}a[o?"addClass":"removeClass"](e),n.html(o?"&#xe61a;":"&#xe602;")}};n.prototype.init=function(t,n){var l=n?'[iui-filter="'+n+'"]':"",r={tab:function(){o.tabAuto.call({})},nav:function(){var t={},n={},r={},c=function(o,l,c){var u=i(this),d=u.find("."+a);l.hasClass("iui-nav-tree")?o.css({top:u.position().top,height:u.children("a").height(),opacity:1}):(d.addClass("iui-anim iui-anim-upbit"),o.css({left:u.position().left+parseFloat(u.css("marginLeft")),top:u.position().top+u.height()-o.height()}),t[c]=setTimeout(function(){o.css({width:u.width(),opacity:1})},device.ie&&device.ie<10?0:200),clearTimeout(r[c]),"block"===d.css("dispiui")&&clearTimeout(n[c]),n[c]=setTimeout(function(){d.addClass(e),u.find("."+s).addClass(s+"d")},300))};i(".iui-nav"+l).each(function(l){var u=i(this),d=i('<span class="iui-nav-bar"></span>'),h=u.find(".iui-nav-item");u.find(".iui-nav-bar")[0]||(u.append(d),h.on("mouseenter",function(){c.call(this,d,u,l)}).on("mouseleave",function(){u.hasClass("iui-nav-tree")||(clearTimeout(n[l]),n[l]=setTimeout(function(){u.find("."+a).removeClass(e),u.find("."+s).removeClass(s+"d")},300))}),u.on("mouseleave",function(){clearTimeout(t[l]),r[l]=setTimeout(function(){u.hasClass("iui-nav-tree")?d.css({height:0,top:d.position().top+d.height()/2,opacity:0}):d.css({width:0,left:d.position().left+d.width()/2,opacity:0})},200)})),h.each(function(){var t=i(this),e=t.find("."+a);e[0]&&!t.find("."+s)[0]&&t.children("a").append('<span class="iui-nav-more"></span>'),t.off("click",o.clickThis).on("click",o.clickThis),t.children("a").off("click",o.showChild).on("click",o.showChild),e.children("dd").off("click",o.clickChild).on("click",o.clickChild)})})},breadcrumb:function(){i(".iui-breadcrumb"+l).each(function(){var t=i(this),e=t.attr("iui-separator")||"/",n=t.find("a");n.next("span[iui-separator]")[0]||(n.each(function(t){t!==n.length-1&&i(this).after("<span iui-separator>"+e+"</span>")}),t.css("visibility","visible"))})},progress:function(){i(".iui-progress"+l).each(function(){var t=i(this),e=t.find(".iui-progress-bar"),n=e.attr("iui-percent");e.css("width",/^.+\/.+$/.test(n)?100*new Function("return "+n)()+"%":n),t.attr("iui-showPercent")&&setTimeout(function(){e.html('<span class="iui-progress-text">'+n+"</span>")},350)})},collapse:function(){i(".iui-collapse"+l).each(function(){i(this).find(".iui-colla-item").each(function(){var t=i(this),e=t.find(".iui-colla-title"),n="none"===t.find(".iui-colla-content").css("dispiui");e.find(".iui-colla-icon").remove(),e.append('<i class="iui-icon iui-colla-icon">'+(n?"&#xe602;":"&#xe61a;")+"</i>"),e.off("click",o.collapse).on("click",o.collapse)})})}};return r[t]?r[t]():iui.each(r,function(i,t){t()})},n.prototype.render=n.prototype.init;var l=new n,r=i(document);l.render();r.on("click",".iui-tab-title li",o.tabClick),r.on("click",o.hideTabMore),i(window).on("resize",o.tabAuto)}(jQuery);