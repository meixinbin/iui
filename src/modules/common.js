/**
 * Created by meixinbin on 2018/1/7.
 */
(function ($) {
    /**
     * 表格多选，全选，单选
     *
     */
    $(document).on('click','.J_check_all+',function () {
        var checks = $(this).parents().find('.iui-table').find('.J_check');
        var _this = $(this);
        if(_this.hasClass('iui-form-checked')){
            checks.each(function () {
                $(this).next().addClass('iui-form-checked');
                $(this).prop('checked',true);
            });
        }else{
            checks.each(function () {
                $(this).next().removeClass('iui-form-checked');
                $(this).prop('checked',false);
            });
        }
    });
    $(document).on('click','.J_check+',function(){
        var table = $(this).parents().find('.iui-table');
        var checks = table.find('.J_check'),J_check_all = table.find('.J_check_all');
        var checkall = true;
        checks.each(function () {
            if(!$(this).is(':checked')){
                checkall = false;
            }
        });
        if(checkall){
            J_check_all.prop('checked',true);
            J_check_all.next().addClass('iui-form-checked');
        }else {
            J_check_all.prop('checked',false);
            J_check_all.next().removeClass('iui-form-checked');
        }
    });
})(jQuery);