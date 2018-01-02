/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

layui.define("jquery",function(e){"use strict";var a=layui.$,o=layui.hint(),i="layui-tree-enter",r=function(e){this.options=e},t={arrow:["&#xe623;","&#xe625;"],checkbox:["&#xe626;","&#xe627;"],radio:["&#xe62b;","&#xe62a;"],branch:["&#xe622;","&#xe624;"],leaf:"&#xe621;"};r.prototype.init=function(e){var a=this;e.addClass("layui-box layui-tree"),a.options.skin&&e.addClass("layui-tree-skin-"+a.options.skin),a.tree(e),a.on(e)},r.prototype.tree=function(e,o){var i=this,r=i.options,n=o||r.nodes;layui.each(n,function(o,n){var l=n.children&&n.children.length>0,c=a('<ul class="'+(n.spread?"layui-show":"")+'"></ul>'),s=a(["<li "+(n.spread?'data-spread="'+n.spread+'"':"")+">",l?'<i class="layui-icon layui-tree-spread">'+(n.spread?t.arrow[1]:t.arrow[0])+"</i>":"",r.check?'<i class="layui-icon layui-tree-check">'+("checkbox"===r.check?t.checkbox[0]:"radio"===r.check?t.radio[0]:"")+"</i>":"",'<a href="'+(n.href||"javascript:;")+'" '+(r.target&&n.href?'target="'+r.target+'"':"")+'><i class="layui-icon layui-tree-'+(l?"branch":"leaf")+'">'+(l?n.spread?t.branch[1]:t.branch[0]:t.leaf)+"</i><cite>"+(n.name||"未命名")+"</cite></a>","</li>"].join(""));l&&(s.append(c),i.tree(c,n.children)),e.append(s),"function"==typeof r.click&&i.click(s,n),i.spread(s,n),r.drag&&i.drag(s,n)})},r.prototype.click=function(e,a){var o=this.options;e.children("a").on("click",function(e){layui.stope(e),o.click(a)})},r.prototype.spread=function(e,a){this.options;var o=e.children(".layui-tree-spread"),i=e.children("ul"),r=e.children("a"),n=function(){e.data("spread")?(e.data("spread",null),i.removeClass("layui-show"),o.html(t.arrow[0]),r.find(".layui-icon").html(t.branch[0])):(e.data("spread",!0),i.addClass("layui-show"),o.html(t.arrow[1]),r.find(".layui-icon").html(t.branch[1]))};i[0]&&(o.on("click",n),r.on("dblclick",n))},r.prototype.on=function(e){var o=this,r=o.options,t="layui-tree-drag";e.find("i").on("selectstart",function(e){return!1}),r.drag&&a(document).on("mousemove",function(e){var i=o.move;if(i.from){i.to;var r=a('<div class="layui-box '+t+'"></div>');e.preventDefault(),a("."+t)[0]||a("body").append(r);var n=a("."+t)[0]?a("."+t):r;n.addClass("layui-show").html(i.from.elem.children("a").html()),n.css({left:e.pageX+10,top:e.pageY+10})}}).on("mouseup",function(){var e=o.move;e.from&&(e.from.elem.children("a").removeClass(i),e.to&&e.to.elem.children("a").removeClass(i),o.move={},a("."+t).remove())})},r.prototype.move={},r.prototype.drag=function(e,o){var r=this,t=(r.options,e.children("a")),n=function(){var t=a(this),n=r.move;n.from&&(n.to={item:o,elem:e},t.addClass(i))};t.on("mousedown",function(){r.move.from={item:o,elem:e}}),t.on("mouseenter",n).on("mousemove",n).on("mouseleave",function(){var e=a(this),o=r.move;o.from&&(delete o.to,e.removeClass(i))})},e("tree",function(e){var i=new r(e=e||{}),t=a(e.elem);if(!t[0])return o.error("layui.tree 没有找到"+e.elem+"元素");i.init(t)})});