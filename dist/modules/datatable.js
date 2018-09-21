/*!
 * =====================================================
 * iui v1.0.0 ()
 * =====================================================
 */

!function(e){"use strict";var i=iui.tpl,t=iui.laypage,a=iui.layer,n=iui.form,l={config:{checkName:"LAY_CHECKED",indexName:"LAY_TABLE_INDEX"},cache:{},index:iui.table?iui.table.index+1e4:0,set:function(i){var t=this;return t.config=e.extend({},t.config,i),t},on:function(e,i){return iui.onevent.call(this,r,e,i)}},o=function(){var e=this,i=e.config,t=i.id;return t&&(o.config[t]=i),{reload:function(i){e.reload.call(e,i)},config:i}},r="table",d="iui-none",c=".iui-table-sort",s="iui-table-edit",u=function(e){return e=e||{},['<table cellspacing="0" cellpadding="0" border="0" class="iui-table" ','{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>',"<thead>","{{# iui.each(d.data.cols, function(i1, item1){ }}","<tr>","{{# iui.each(item1, function(i2, item2){ }}",'{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}','{{# if(item2.fixed === "right"){ right = true; } }}',e.fixed&&"right"!==e.fixed?'{{# if(item2.fixed && item2.fixed !== "right"){ }}':"right"===e.fixed?'{{# if(item2.fixed === "right"){ }}':"",'<th data-field="{{ item2.field||i2 }}" {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}} {{# if(item2.unresize){ }}data-unresize="true"{{# } }}>','<div class="iui-table-cell laytable-cell-',"{{# if(item2.colspan > 1){ }}","group","{{# } else { }}","{{d.index}}-{{item2.field || i2}}",'{{# if(item2.type !== "normal"){ }}'," laytable-cell-{{ item2.type }}","{{# } }}","{{# } }}",'" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>','{{# if(item2.type === "checkbox"){ }}','<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>',"{{# } else { }}",'<span>{{item2.title||""}}</span>',"{{# if(!(item2.colspan > 1) && item2.sort){ }}",'<span class="iui-table-sort iui-inline"><i class="iui-edge iui-table-sort-asc"></i><i class="iui-edge iui-table-sort-desc"></i></span>',"{{# } }}","{{# } }}","</div>","</th>",e.fixed?"{{# }; }}":"","{{# }); }}","</tr>","{{# }); }}","</thead>","</table>"].join("")},h=['<table cellspacing="0" cellpadding="0" border="0" class="iui-table" ','{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>',"<tbody></tbody>","</table>"].join(""),f=['<div class="iui-form iui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">',"{{# if(d.data.toolbar){ }}",'<div class="iui-table-tool"></div>',"{{# } }}",'<div class="iui-table-box">',"{{# var left, right; }}",'<div class="iui-table-header">',u(),"</div>",'<div class="iui-table-body iui-table-main">',h,"</div>","{{# if(left){ }}",'<div class="iui-table-fixed iui-table-fixed-l">','<div class="iui-table-header">',u({fixed:!0}),"</div>",'<div class="iui-table-body">',h,"</div>","</div>","{{# }; }}","{{# if(right){ }}",'<div class="iui-table-fixed iui-table-fixed-r">','<div class="iui-table-header">',u({fixed:"right"}),'<div class="iui-table-mend"></div>',"</div>",'<div class="iui-table-body">',h,"</div>","</div>","{{# }; }}","</div>","{{# if(d.data.page){ }}",'<div class="iui-table-page">','<div id="iui-table-page{{d.index}}"></div>',"</div>","{{# } }}","<style>","{{# iui.each(d.data.cols, function(i1, item1){","iui.each(item1, function(i2, item2){ }}",".laytable-cell-{{d.index}}-{{item2.field||i2}}{ ","{{# if(item2.width){ }}","width: {{item2.width}}px;","{{# } }}"," }","{{# });","}); }}","</style>","</div>"].join(""),p=e(window),y=e(document),m=function(i){var t=this;t.index=++l.index,t.config=e.extend({},t.config,l.config,i),t.render()};m.prototype.config={limit:10,loading:!0,cellMinWidth:60},m.prototype.render=function(){var t=this,a=t.config;if(a.elem=e(a.elem),a.where=a.where||{},a.id=a.id||a.elem.attr("id"),a.request=e.extend({pageName:"page",limitName:"limit"},a.request),a.response=e.extend({statusName:"code",statusCode:0,msgName:"msg",dataName:"data",countName:"count"},a.response),"object"==typeof a.page&&(a.limit=a.page.limit||a.limit,a.limits=a.page.limits||a.limits,t.page=a.page.curr=a.page.curr||1,delete a.page.elem,delete a.page.jump),!a.elem[0])return t;t.setArea();var n=a.elem,l=n.next(".iui-table-view"),o=t.elem=e(i(f).render({VIEW_CLASS:"iui-table-view",data:a,index:t.index}));if(a.index=t.index,l[0]&&l.remove(),n.after(o),t.layHeader=o.find(".iui-table-header"),t.layMain=o.find(".iui-table-main"),t.layBody=o.find(".iui-table-body"),t.layFixed=o.find(".iui-table-fixed"),t.layFixLeft=o.find(".iui-table-fixed-l"),t.layFixRight=o.find(".iui-table-fixed-r"),t.layTool=o.find(".iui-table-tool"),t.layPage=o.find(".iui-table-page"),t.layTool.html(i(e(a.toolbar).html()||"").render(a)),a.height&&t.fullSize(),a.cols.length>1){var r=t.layFixed.find(".iui-table-header").find("th");r.height(t.layHeader.height()-1-parseFloat(r.css("padding-top"))-parseFloat(r.css("padding-bottom")))}t.pullData(t.page),t.events()},m.prototype.initOpts=function(e){this.config;var i={checkbox:48,space:15,numbers:40};e.checkbox&&(e.type="checkbox"),e.space&&(e.type="space"),e.type||(e.type="normal"),"normal"!==e.type&&(e.unresize=!0,e.width=e.width||i[e.type])},m.prototype.setArea=function(){var e=this,i=e.config,t=0,a=0,n=0,l=0,o=i.width||function(){var e=function(t){var a,n;a=(t=t||i.elem.parent()).width();try{n="none"===t.css("display")}catch(e){}return!t[0]||a&&!n?a:e(t.parent())};return e()}();e.eachCols(function(){t++}),o-="line"===i.skin||"nob"===i.skin?2:t+1,iui.each(i.cols,function(i,t){iui.each(t,function(i,n){var r;n?(e.initOpts(n),r=n.width||0,n.colspan>1||(/\d+%$/.test(r)?n.width=r=Math.floor(parseFloat(r)/100*o):r||(n.width=r=0,a++),l+=r)):t.splice(i,1)})}),e.autoColNums=a,o>l&&a&&(n=(o-l)/a),iui.each(i.cols,function(e,t){iui.each(t,function(e,t){var a=t.minWidth||i.cellMinWidth;t.colspan>1||0===t.width&&(t.width=Math.floor(n>=a?n:a))})}),i.height&&/^full-\d+$/.test(i.height)&&(e.fullHeightGap=i.height.split("-")[1],i.height=p.height()-e.fullHeightGap)},m.prototype.reload=function(i){var t=this;t.config.data&&t.config.data.constructor===Array&&delete t.config.data,t.config=e.extend({},t.config,i),t.render()},m.prototype.page=1,m.prototype.pullData=function(i,t){var n=this,l=n.config,o=l.request,r=l.response,d=function(){"object"==typeof l.initSort&&n.sort(l.initSort.field,l.initSort.type)};if(n.startTime=(new Date).getTime(),l.url){var c={};c[o.pageName]=i,c[o.limitName]=l.limit,e.ajax({type:l.method||"get",url:l.url,data:e.extend(c,l.where),dataType:"json",success:function(e){if(e[r.statusName]!=r.statusCode)return n.renderForm(),n.layMain.html('<div class="iui-none">'+(e[r.msgName]||"返回的数据状态异常")+"</div>");n.renderData(e,i,e[r.countName]),d(),l.time=(new Date).getTime()-n.startTime+" ms",t&&a.close(t),"function"==typeof l.done&&l.done(e,i,e[r.countName])},error:function(e,i){n.layMain.html('<div class="iui-none">数据接口请求异常</div>'),n.renderForm(),t&&a.close(t)}})}else if(l.data&&l.data.constructor===Array){var s={},u=i*l.limit-l.limit;s[r.dataName]=l.data.concat().splice(u,l.limit),s[r.countName]=l.data.length,n.renderData(s,i,l.data.length),d(),"function"==typeof l.done&&l.done(s,i,s[r.countName])}},m.prototype.eachCols=function(i){var t=e.extend(!0,[],this.config.cols),a=[],n=0;iui.each(t,function(e,i){iui.each(i,function(i,l){if(l.colspan>1){var o=0;n++,l.CHILD_COLS=[],iui.each(t[e+1],function(e,i){i.PARENT_COL||o==l.colspan||(i.PARENT_COL=n,l.CHILD_COLS.push(i),o+=i.colspan>1?i.colspan:1)})}l.PARENT_COL||a.push(l)})});var l=function(e){iui.each(e||a,function(e,t){if(t.CHILD_COLS)return l(t.CHILD_COLS);i(e,t)})};l()},m.prototype.renderData=function(n,o,r,c){var s=this,u=s.config,h=n[u.response.dataName]||[],f=[],p=[],y=[],m=function(){if(!c&&s.sortKey)return s.sort(s.sortKey.field,s.sortKey.sort,!0);iui.each(h,function(t,a){var n=[],r=[],d=[],h=t+u.limit*(o-1)+1;0!==a.length&&(c||(a[l.config.indexName]=t),s.eachCols(function(t,o){var c=o.field||t,f=a[c];s.getColElem(s.layHeader,c);if(void 0!==f&&null!==f||(f=""),!(o.colspan>1)){var p=['<td data-field="'+c+'" '+function(){var e=[];return o.edit&&e.push('data-edit="'+o.edit+'"'),o.align&&e.push('align="'+o.align+'"'),o.templet&&e.push('data-content="'+f+'"'),o.toolbar&&e.push('data-off="true"'),o.event&&e.push('lay-event="'+o.event+'"'),o.style&&e.push('style="'+o.style+'"'),o.minWidth&&e.push('data-minwidth="'+o.minWidth+'"'),e.join(" ")}()+">",'<div class="iui-table-cell laytable-cell-'+function(){var e=u.index+"-"+c;return"normal"===o.type?e:e+" laytable-cell-"+o.type}()+'">'+function(){var t=e.extend(!0,{LAY_INDEX:h},a);return"checkbox"===o.type?'<input type="checkbox" name="layTableCheckbox" lay-skin="primary" '+function(){var e=l.config.checkName;return o[e]?(a[e]=o[e],o[e]?"checked":""):t[e]?"checked":""}()+">":"numbers"===o.type?h:o.toolbar?i(e(o.toolbar).html()||"").render(t):o.templet?i(e(o.templet).html()||String(f)).render(t):f}(),"</div></td>"].join("");n.push(p),o.fixed&&"right"!==o.fixed&&r.push(p),"right"===o.fixed&&d.push(p)}}),f.push('<tr data-index="'+t+'">'+n.join("")+"</tr>"),p.push('<tr data-index="'+t+'">'+r.join("")+"</tr>"),y.push('<tr data-index="'+t+'">'+d.join("")+"</tr>"))}),s.layBody.scrollTop(0),s.layMain.find("."+d).remove(),s.layMain.find("tbody").html(f.join("")),s.layFixLeft.find("tbody").html(p.join("")),s.layFixRight.find("tbody").html(y.join("")),s.renderForm(),s.syncCheckAll(),s.haveInit?s.scrollPatch():setTimeout(function(){s.scrollPatch()},50),s.haveInit=!0,a.close(s.tipsIndex)};return s.key=u.id||u.index,l.cache[s.key]=h,c?m():0===h.length?(s.renderForm(),s.layFixed.remove(),s.layMain.find("tbody").html(""),s.layMain.find("."+d).remove(),s.layMain.append('<div class="iui-none">无数据</div>')):(m(),void(u.page&&(u.page=e.extend({elem:"iui-table-page"+u.index,count:r,limit:u.limit,limits:u.limits||[10,20,30,40,50,60,70,80,90],groups:3,layout:["prev","page","next","skip","count","limit"],prev:'<i class="iui-icon">&#xe603;</i>',next:'<i class="iui-icon">&#xe602;</i>',jump:function(e,i){i||(s.page=e.curr,u.limit=e.limit,s.pullData(e.curr,s.loading()))}},u.page),u.page.count=r,t.render(u.page))))},m.prototype.getColElem=function(e,i){var t=this.config;return e.eq(0).find(".laytable-cell-"+t.index+"-"+i+":eq(0)")},m.prototype.renderForm=function(e){n.render(e,"LAY-table-"+this.index)},m.prototype.sort=function(i,t,a,n){var o,d=this,s={},u=d.config,h=u.elem.attr("lay-filter"),f=l.cache[d.key];"string"==typeof i&&d.layHeader.find("th").each(function(t,a){var n=e(this),l=n.data("field");if(l===i)return i=n,p=l,!1});try{var p=p||i.data("field");if(d.sortKey&&!a&&p===d.sortKey.field&&t===d.sortKey.sort)return;var y=d.layHeader.find("th .laytable-cell-"+u.index+"-"+p).find(c);d.layHeader.find("th").find(c).removeAttr("lay-sort"),y.attr("lay-sort",t||null),d.layFixed.find("th")}catch(e){return hint.error("Table modules: Did not match to field")}d.sortKey={field:p,sort:t},"asc"===t?o=iui.sort(f,p):"desc"===t?o=iui.sort(f,p,!0):(o=iui.sort(f,l.config.indexName),delete d.sortKey),s[u.response.dataName]=o,d.renderData(s,d.page,d.count,!0),n&&iui.event.call(i,r,"sort("+h+")",{field:p,type:t})},m.prototype.loading=function(){var e=this,i=e.config;if(i.loading&&i.url)return a.msg("数据请求中",{icon:16,offset:[e.elem.offset().top+e.elem.height()/2-35-p.scrollTop()+"px",e.elem.offset().left+e.elem.width()/2-90-p.scrollLeft()+"px"],time:-1,anim:-1,fixed:!1})},m.prototype.setCheckData=function(e,i){var t=this,a=t.config,n=l.cache[t.key];n[e]&&n[e].constructor!==Array&&(n[e][a.checkName]=i)},m.prototype.syncCheckAll=function(){var e=this,i=e.config,t=e.layHeader.find('input[name="layTableCheckbox"]'),a=function(t){return e.eachCols(function(e,a){"checkbox"===a.type&&(a[i.checkName]=t)}),t};t[0]&&(l.checkStatus(e.key).isAll?(t[0].checked||(t.prop("checked",!0),e.renderForm("checkbox")),a(!0)):(t[0].checked&&(t.prop("checked",!1),e.renderForm("checkbox")),a(!1)))},m.prototype.getCssRule=function(e,i){var t=this,a=t.elem.find("style")[0],n=a.sheet||a.styleSheet||{},l=n.cssRules||n.rules;iui.each(l,function(a,n){if(n.selectorText===".laytable-cell-"+t.index+"-"+e)return i(n),!0})},m.prototype.fullSize=function(){var e,i=this,t=i.config,a=t.height;i.fullHeightGap&&((a=p.height()-i.fullHeightGap)<135&&(a=135),i.elem.css("height",a)),e=parseFloat(a)-parseFloat(i.layHeader.height())-1,t.toolbar&&(e-=i.layTool.outerHeight()),t.page&&(e=e-i.layPage.outerHeight()-1),i.layMain.css("height",e)},m.prototype.getScrollWidth=function(e){var i=0;return e?i=e.offsetWidth-e.clientWidth:((e=document.createElement("div")).style.width="100px",e.style.height="100px",e.style.overflowY="scroll",document.body.appendChild(e),i=e.offsetWidth-e.clientWidth,document.body.removeChild(e)),i},m.prototype.scrollPatch=function(){var i=this,t=i.layMain.children("table"),a=i.layMain.width()-i.layMain.prop("clientWidth"),n=i.layMain.height()-i.layMain.prop("clientHeight"),l=i.getScrollWidth(i.layMain[0]),o=t.outerWidth()-i.layMain.width();if(i.autoColNums&&o<5&&!i.scrollPatchWStatus){var r=i.layHeader.eq(0).find("thead th:last-child"),d=r.data("field");i.getCssRule(d,function(e){var t=e.style.width||r.outerWidth();e.style.width=parseFloat(t)-l-o+"px",i.layMain.height()-i.layMain.prop("clientHeight")>0&&(e.style.width=parseFloat(e.style.width)-1+"px"),i.scrollPatchWStatus=!0})}if(a&&n){if(!i.elem.find(".iui-table-patch")[0]){var c=e('<th class="iui-table-patch"><div class="iui-table-cell"></div></th>');c.find("div").css({width:a}),i.layHeader.eq(0).find("thead tr").append(c)}}else i.layHeader.eq(0).find(".iui-table-patch").remove();var s=i.layMain.height()-n;i.layFixed.find(".iui-table-body").css("height",t.height()>s?s:"auto"),i.layFixRight[o>0?"removeClass":"addClass"]("iui-hide"),i.layFixRight.css("right",a-1)},m.prototype.events=function(){var t,n=this,o=n.config,d=e("body"),u={},h=n.layHeader.find("th"),f=o.elem.attr("lay-filter");h.on("mousemove",function(i){var t=e(this),a=t.offset().left,n=i.clientX-a;t.attr("colspan")>1||t.data("unresize")||u.resizeStart||(u.allowResize=t.width()-n<=10,d.css("cursor",u.allowResize?"col-resize":""))}).on("mouseleave",function(){e(this);u.resizeStart||d.css("cursor","")}).on("mousedown",function(i){var t=e(this);if(u.allowResize){var a=t.data("field");i.preventDefault(),u.resizeStart=!0,u.offset=[i.clientX,i.clientY],n.getCssRule(a,function(e){var i=e.style.width||t.outerWidth();u.rule=e,u.ruleWidth=parseFloat(i),u.minWidth=t.data("minwidth")||o.cellMinWidth})}}),y.on("mousemove",function(e){if(u.resizeStart){if(e.preventDefault(),u.rule){var i=u.ruleWidth+e.clientX-u.offset[0];i<u.minWidth&&(i=u.minWidth),u.rule.style.width=i+"px",a.close(n.tipsIndex)}t=1}}).on("mouseup",function(e){u.resizeStart&&(u={},d.css("cursor",""),n.scrollPatch()),2===t&&(t=null)}),h.on("click",function(){var i,a=e(this),l=a.find(c),o=l.attr("lay-sort");if(!l[0]||1===t)return t=2;i="asc"===o?"desc":"desc"===o?null:"asc",n.sort(a,i,null,!0)}).find(c+" .iui-edge ").on("click",function(i){var t=e(this),a=t.index(),l=t.parents("th").eq(0).data("field");iui.stope(i),0===a?n.sort(l,"asc",null,!0):n.sort(l,"desc",null,!0)}),n.elem.on("click",'input[name="layTableCheckbox"]+',function(){var i=e(this).prev(),t=n.layBody.find('input[name="layTableCheckbox"]'),a=i.parents("tr").eq(0).data("index"),o=i[0].checked,d="layTableAllChoose"===i.attr("lay-filter");d?(t.each(function(e,i){i.checked=o,n.setCheckData(e,o)}),n.syncCheckAll(),n.renderForm("checkbox")):(n.setCheckData(a,o),n.syncCheckAll()),iui.event.call(this,r,"checkbox("+f+")",{checked:o,data:l.cache[n.key]?l.cache[n.key][a]||{}:{},type:d?"all":"one"})}),n.layBody.on("mouseenter","tr",function(){var i=e(this).index();n.layBody.find("tr:eq("+i+")").addClass("iui-table-hover")}).on("mouseleave","tr",function(){var i=e(this).index();n.layBody.find("tr:eq("+i+")").removeClass("iui-table-hover")}),n.layBody.on("change","."+s,function(){var i=e(this),t=this.value,a=i.parent().data("field"),o=i.parents("tr").eq(0).data("index"),d=l.cache[n.key][o];d[a]=t,iui.event.call(this,r,"edit("+f+")",{value:t,data:d,field:a})}).on("blur","."+s,function(){var t,a=e(this),o=a.parent().data("field"),r=a.parents("tr").eq(0).data("index"),d=l.cache[n.key][r];n.eachCols(function(e,i){i.field==o&&i.templet&&(t=i.templet)}),a.siblings(".iui-table-cell").html(t?i(e(t).html()||this.value).render(d):this.value),a.parent().data("content",this.value),a.remove()}),n.layBody.on("click","td",function(){var i=e(this),t=(i.data("field"),i.data("edit")),l=i.children(".iui-table-cell");if(a.close(n.tipsIndex),!i.data("off"))if(t)if("select"===t);else{var r=e('<input class="iui-input '+s+'">');r[0].value=i.data("content")||l.text(),i.find("."+s)[0]||i.append(r),r.focus()}else l.find(".iui-form-switch,.iui-form-checkbox")[0]||Math.round(l.prop("scrollWidth"))>Math.round(l.outerWidth())&&(n.tipsIndex=a.tips(['<div class="iui-table-tips-main" style="margin-top: -'+(l.height()+16)+"px;"+("sm"===o.size?"padding: 4px 15px; font-size: 12px;":"lg"===o.size?"padding: 14px 15px;":"")+'">',l.html(),"</div>",'<i class="iui-icon iui-table-tips-c">&#x1006;</i>'].join(""),l[0],{tips:[3,""],time:-1,anim:-1,maxWidth:device.ios||device.android?300:600,isOutAnim:!1,skin:"iui-table-tips",success:function(e,i){e.find(".iui-table-tips-c").on("click",function(){a.close(i)})}}))}),n.layBody.on("click","*[lay-event]",function(){var t=e(this),a=t.parents("tr").eq(0).data("index"),o=n.layBody.find('tr[data-index="'+a+'"]'),d=l.cache[n.key][a];iui.event.call(this,r,"tool("+f+")",{data:l.clearCacheKey(d),event:t.attr("lay-event"),tr:o,del:function(){l.cache[n.key][a]=[],o.remove(),n.scrollPatch()},update:function(t){t=t||{},iui.each(t,function(t,a){if(t in d){var l,r=o.children('td[data-field="'+t+'"]');d[t]=a,n.eachCols(function(e,i){i.field==t&&i.templet&&(l=i.templet)}),r.children(".iui-table-cell").html(l?i(e(l).html()||a).render(d):a),r.data("content",a)}})}}),o.addClass("iui-table-click").siblings("tr").removeClass("iui-table-click")}),n.layMain.on("scroll",function(){var i=e(this),t=i.scrollLeft(),l=i.scrollTop();n.layHeader.scrollLeft(t),n.layFixed.find(".iui-table-body").scrollTop(l),a.close(n.tipsIndex)}),p.on("resize",function(){n.fullSize(),n.scrollPatch()})},l.init=function(i,t){t=t||{};var a=this,n="Table element property lay-data configuration item has a syntax error: ";return e(i?'table[lay-filter="'+i+'"]':".iui-table[lay-data]").each(function(){var a=e(this),o=a.attr("lay-data");try{o=new Function("return "+o)()}catch(e){hint.error(n+o)}var r=[],d=e.extend({elem:this,cols:[],data:[],skin:a.attr("lay-skin"),size:a.attr("lay-size"),even:"string"==typeof a.attr("lay-even")},l.config,t,o);i&&a.hide(),a.find("thead>tr").each(function(i){d.cols[i]=[],e(this).children().each(function(t){var a=e(this),l=a.attr("lay-data");try{l=new Function("return "+l)()}catch(e){return hint.error(n+l)}var o=e.extend({title:a.text(),colspan:a.attr("colspan")||0,rowspan:a.attr("rowspan")||0},l);o.colspan<2&&r.push(o),d.cols[i].push(o)})}),a.find("tbody>tr").each(function(i){var t=e(this),a={};t.children("td").each(function(i,t){var n=e(this),l=n.data("field");if(l)return a[l]=n.html()}),iui.each(r,function(e,i){var n=t.children("td").eq(e);a[i.field]=n.html()}),d.data[i]=a}),l.render(d)}),a},l.checkStatus=function(e){var i=0,t=0,a=[],n=l.cache[e]||[];return iui.each(n,function(e,n){n.constructor!==Array?n[l.config.checkName]&&(i++,a.push(l.clearCacheKey(n))):t++}),{data:a,isAll:!!n.length&&i===n.length-t}},o.config={},l.reload=function(i,t){var a=o.config[i];return t=t||{},a?(t.data&&t.data.constructor===Array&&delete a.data,l.render(e.extend(!0,{},a,t))):hint.error("The ID option was not found in the table instance")},l.render=function(e){var i=new m(e);return o.call(i)},l.clearCacheKey=function(i){return i=e.extend({},i),delete i[l.config.checkName],delete i[l.config.indexName],i},l.init()}(jQuery);