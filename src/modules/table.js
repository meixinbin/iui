(function ($,iui) {
  "use strict";
    var pluginName = 'table';
    //字符常量
    var ELEM = '.iui-table', THIS = 'iui-this', SHOW = 'iui-show', HIDE = 'iui-hide', DISABLED = 'iui-disabled', NONE = 'iui-none',
        ELEM_VIEW = 'iui-table-view', ELEM_HEADER = '.iui-table-header', ELEM_BODY = '.iui-table-body', ELEM_MAIN = '.iui-table-main', ELEM_FIXED = '.iui-table-fixed', ELEM_FIXL = '.iui-table-fixed-l', ELEM_FIXR = '.iui-table-fixed-r', ELEM_TOOL = '.iui-table-tool', ELEM_PAGE = '.iui-table-page', ELEM_SORT = '.iui-table-sort', ELEM_EDIT = 'iui-table-edit', ELEM_HOVER = 'iui-table-hover'

    var defaults={
      fields:{
        id:''
      }
    };
    var template = '\
      <div class="iui-form iui-border-box iui-table-view">\
        <div class="iui-table-box">\
          <div class="iui-table-header">\
            <table class="iui-table" cellpadding="0" cellspacing="0" border="0">\
              <thead>\
                <tr>\
                  <% iui.each(fields,function(index,field){%>\
                  <th data-field="<%=field%>">\
                    <div class="iui-table-cell">\
                      <span>\
                        <%=field%>\
                      </span>\
                      <span class="iui-table-sort iui-inline">\
                        <i class="iui-edge iui-table-sort-asc"></i>\
                        <i class="iui-edge iui-table-sort-desc"></i>\
                      </span>\
                    </div>\
                  </th>\
                  <%}%>\
                </tr>\
              </thead>\
            </table>\
          </div>\
        </div>\
    </div>';
  function Plugin( options ) {
      this.options = $.extend( {}, defaults, options) ;
      this.elem = null;
      this.init();
  }
  Plugin.prototype.init = function () {
      var options = this.options;
      var html = iui.tmpl(template,options);//替换模板
      var elem = (options.id ? $('#' + options.id) : ''),hasRender = elem.next('.' + ELEM_VIEW);
      
  }
  var table = iui[pluginName] = function(options) {
      return new Plugin( options );
  };
  table.init();
})(jQuery,iui||{});