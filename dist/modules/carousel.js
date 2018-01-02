/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

layui.define("jquery",function(e){"use strict";var i=layui.$,n=(layui.hint(),layui.device(),{config:{},set:function(e){var n=this;return n.config=i.extend({},n.config,e),n},on:function(e,i){return layui.onevent.call(this,t,e,i)}}),t="carousel",a="layui-this",l="layui-carousel-left",o="layui-carousel-right",r="layui-carousel-arrow",d="layui-carousel-ind",s=function(e){var t=this;t.config=i.extend({},t.config,n.config,e),t.render()};s.prototype.config={width:"600px",height:"280px",full:!1,arrow:"hover",indicator:"inside",autoplay:!0,interval:3e3,anim:"",trigger:"click",index:0},s.prototype.render=function(){var e=this,n=e.config;n.elem=i(n.elem),n.elem[0]&&(e.elemItem=n.elem.find(">*[carousel-item]>*"),n.index<0&&(n.index=0),n.index>=e.elemItem.length&&(n.index=e.elemItem.length-1),n.interval<800&&(n.interval=800),n.full?n.elem.css({position:"fixed",width:"100%",height:"100%",zIndex:9999}):n.elem.css({width:n.width,height:n.height}),n.elem.attr("lay-anim",n.anim),e.elemItem.eq(n.index).addClass(a),e.elemItem.length<=1||(e.indicator(),e.arrow(),e.autoplay(),e.events()))},s.prototype.reload=function(e){var n=this;clearInterval(n.timer),n.config=i.extend({},n.config,e),n.render()},s.prototype.prevIndex=function(){var e=this,i=e.config.index-1;return i<0&&(i=e.elemItem.length-1),i},s.prototype.nextIndex=function(){var e=this,i=e.config.index+1;return i>=e.elemItem.length&&(i=0),i},s.prototype.addIndex=function(e){var i=this,n=i.config;e=e||1,n.index=n.index+e,n.index>=i.elemItem.length&&(n.index=0)},s.prototype.subIndex=function(e){var i=this,n=i.config;e=e||1,n.index=n.index-e,n.index<0&&(n.index=i.elemItem.length-1)},s.prototype.autoplay=function(){var e=this,i=e.config;i.autoplay&&(e.timer=setInterval(function(){e.slide()},i.interval))},s.prototype.arrow=function(){var e=this,n=e.config,t=i(['<button class="layui-icon '+r+'" lay-type="sub">'+("updown"===n.anim?"&#xe619;":"&#xe603;")+"</button>",'<button class="layui-icon '+r+'" lay-type="add">'+("updown"===n.anim?"&#xe61a;":"&#xe602;")+"</button>"].join(""));n.elem.attr("lay-arrow",n.arrow),n.elem.find("."+r)[0]&&n.elem.find("."+r).remove(),n.elem.append(t),t.on("click",function(){var n=i(this).attr("lay-type");e.slide(n)})},s.prototype.indicator=function(){var e=this,n=e.config,t=e.elemInd=i(['<div class="'+d+'"><ul>',function(){var i=[];return layui.each(e.elemItem,function(e){i.push("<li"+(n.index===e?' class="layui-this"':"")+"></li>")}),i.join("")}(),"</ul></div>"].join(""));n.elem.attr("lay-indicator",n.indicator),n.elem.find("."+d)[0]&&n.elem.find("."+d).remove(),n.elem.append(t),"updown"===n.anim&&t.css("margin-top",-t.height()/2),t.find("li").on("hover"===n.trigger?"mouseover":n.trigger,function(){var t=i(this).index();t>n.index?e.slide("add",t-n.index):t<n.index&&e.slide("sub",n.index-t)})},s.prototype.slide=function(e,i){var n=this,r=n.elemItem,d=n.config,s=d.index,u=d.elem.attr("lay-filter");n.haveSlide||("sub"===e?(n.subIndex(i),r.eq(d.index).addClass("layui-carousel-prev"),setTimeout(function(){r.eq(s).addClass(o),r.eq(d.index).addClass(o)},50)):(n.addIndex(i),r.eq(d.index).addClass("layui-carousel-next"),setTimeout(function(){r.eq(s).addClass(l),r.eq(d.index).addClass(l)},50)),setTimeout(function(){r.removeClass(a+" layui-carousel-prev layui-carousel-next "+l+" "+o),r.eq(d.index).addClass(a),n.haveSlide=!1},300),n.elemInd.find("li").eq(d.index).addClass(a).siblings().removeClass(a),n.haveSlide=!0,layui.event.call(this,t,"change("+u+")",{index:d.index,prevIndex:s,item:r.eq(d.index)}))},s.prototype.events=function(){var e=this,i=e.config;i.elem.data("haveEvents")||(i.elem.on("mouseenter",function(){clearInterval(e.timer)}).on("mouseleave",function(){e.autoplay()}),i.elem.data("haveEvents",!0))},n.render=function(e){return new s(e)},e(t,n)});