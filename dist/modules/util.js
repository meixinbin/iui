/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

iui.util=function(t,e){"use strict";var i={fixbar:function(e){var i,o,a=t(document),r=t("body");(e=t.extend({showHeight:200},e)).bar1=!0===e.bar1?"&#xe606;":e.bar1,e.bar2=!0===e.bar2?"&#xe607;":e.bar2,e.bgcolor=e.bgcolor?"background-color:"+e.bgcolor:"";var n=[e.bar1,e.bar2,"&#xe604;"],l=t(['<ul class="layui-fixbar">',e.bar1?'<li class="layui-icon" lay-type="bar1" style="'+e.bgcolor+'">'+n[0]+"</li>":"",e.bar2?'<li class="layui-icon" lay-type="bar2" style="'+e.bgcolor+'">'+n[1]+"</li>":"",'<li class="layui-icon layui-fixbar-top" lay-type="top" style="'+e.bgcolor+'">'+n[2]+"</li>","</ul>"].join("")),c=l.find(".layui-fixbar-top"),g=function(){a.scrollTop()>=e.showHeight?i||(c.show(),i=1):i&&(c.hide(),i=0)};t(".layui-fixbar")[0]||("object"==typeof e.css&&l.css(e.css),r.append(l),g(),l.find("li").on("click",function(){var i=t(this).attr("lay-type");"top"===i&&t("html,body").animate({scrollTop:0},200),e.click&&e.click.call(this,i)}),a.on("scroll",function(){clearTimeout(o),o=setTimeout(function(){g()},100)}))},countdown:function(t,e,i){var o=this,a="function"==typeof e,r=new Date(t).getTime(),n=new Date(!e||a?(new Date).getTime():e).getTime(),l=r-n,c=[Math.floor(l/864e5),Math.floor(l/36e5)%24,Math.floor(l/6e4)%60,Math.floor(l/1e3)%60];a&&(i=e);var g=setTimeout(function(){o.countdown(t,n+1e3,i)},1e3);return i&&i(l>0?c:[0,0,0,0],e,g),l<=0&&clearTimeout(g),g},timeAgo:function(t,e){var i=this,o=[[],[]],a=(new Date).getTime()-new Date(t).getTime();return a>6912e5?(a=new Date(t),o[0][0]=i.digit(a.getFullYear(),4),o[0][1]=i.digit(a.getMonth()+1),o[0][2]=i.digit(a.getDate()),e||(o[1][0]=i.digit(a.getHours()),o[1][1]=i.digit(a.getMinutes()),o[1][2]=i.digit(a.getSeconds())),o[0].join("-")+" "+o[1].join(":")):a>=864e5?(a/1e3/60/60/24|0)+"天前":a>=36e5?(a/1e3/60/60|0)+"小时前":a>=12e4?(a/1e3/60|0)+"分钟前":a<0?"未来":"刚刚"},digit:function(t,e){var i="";t=String(t),e=e||2;for(var o=t.length;o<e;o++)i+="0";return t<Math.pow(10,e)?i+(0|t):t},each:function(t,e){var i,o=this;if("function"!=typeof e)return o;if((t=t||[]).constructor===Object){for(i in t)if(e.call(t[i],i,t[i]))break}else for(i=0;i<t.length&&!e.call(t[i],i,t[i]);i++);return o},toDateString:function(t,e){var i=this,o=new Date(parseInt(t)||new Date),a=[i.digit(o.getFullYear(),4),i.digit(o.getMonth()+1),i.digit(o.getDate())],r=[i.digit(o.getHours()),i.digit(o.getMinutes()),i.digit(o.getSeconds())];return(e=e||"yyyy-MM-dd HH:mm:ss").replace(/yyyy/g,a[0]).replace(/MM/g,a[1]).replace(/dd/g,a[2]).replace(/HH/g,r[0]).replace(/mm/g,r[1]).replace(/ss/g,r[2])}};t.extend(e,i)}(jQuery,iui.util||{});