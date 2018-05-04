///#source 1 1 /src/1.0.0/load.js
/*! head.load - v1.0.3 */
/*
 * HeadJS     The only script in your <HEAD>
 * Author     Tero Piirainen  (tipiirai)
 * Maintainer Robert Hoffmann (itechnology)
 * License    MIT / http://bit.ly/mit-license
 * WebSite    http://headjs.com
 */
(function (win, undefined) {
    "use strict";

    //#region variables
    var doc = win.document,
        domWaiters = [],
        handlers = {}, // user functions waiting for events
        assets = {}, // loadable items in various states
        isAsync = "async" in doc.createElement("script") || "MozAppearance" in doc.documentElement.style || win.opera,
        isDomReady,

        /*** public API ***/
        headVar = win.head_conf && win.head_conf.head || "iui",
        api = win[headVar] = (win[headVar] || function () {
            api.ready.apply(null, arguments);
        }),

        // states
        PRELOADING = 1,
        PRELOADED = 2,
        LOADING = 3,
        LOADED = 4;
    //#endregion

    //#region PRIVATE functions

    //#region Helper functions
    function noop() {
        // does nothing
    }

    function each(arr, callback) {
        if (!arr) {
            return;
        }

        // arguments special type
        if (typeof arr === "object") {
            arr = [].slice.call(arr);
        }

        // do the job
        for (var i = 0, l = arr.length; i < l; i++) {
            callback.call(arr, arr[i], i);
        }
    }

    /* A must read: http://bonsaiden.github.com/JavaScript-Garden
     ************************************************************/
    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }

    function isFunction(item) {
        return is("Function", item);
    }

    function isArray(item) {
        return is("Array", item);
    }

    function toLabel(url) {
        ///<summary>Converts a url to a file label</summary>
        var items = url.split("/"),
            name = items[items.length - 1],
            i = name.indexOf("?");

        return i !== -1 ? name.substring(0, i) : name;
    }

    // INFO: this look like a "im triggering callbacks all over the place, but only wanna run it one time function" ..should try to make everything work without it if possible
    // INFO: Even better. Look into promises/defered's like jQuery is doing
    function one(callback) {
        ///<summary>Execute a callback only once</summary>
        callback = callback || noop;

        if (callback._done) {
            return;
        }

        callback();
        callback._done = 1;
    }

    //#endregion

    function conditional(test, success, failure, callback) {
        ///<summary>
        /// INFO: use cases:
        ///    head.test(condition, null       , "file.NOk" , callback);
        ///    head.test(condition, "fileOk.js", null       , callback);
        ///    head.test(condition, "fileOk.js", "file.NOk" , callback);
        ///    head.test(condition, "fileOk.js", ["file.NOk", "file.NOk"], callback);
        ///    head.test({
        ///               test    : condition,
        ///               success : [{ label1: "file1Ok.js"  }, { label2: "file2Ok.js" }],
        ///               failure : [{ label1: "file1NOk.js" }, { label2: "file2NOk.js" }],
        ///               callback: callback
        ///    );
        ///    head.test({
        ///               test    : condition,
        ///               success : ["file1Ok.js" , "file2Ok.js"],
        ///               failure : ["file1NOk.js", "file2NOk.js"],
        ///               callback: callback
        ///    );
        ///</summary>
        var obj = (typeof test === "object") ? test : {
            test: test,
            success: !!success ? isArray(success) ? success : [success] : false,
            failure: !!failure ? isArray(failure) ? failure : [failure] : false,
            callback: callback || noop
        };

        // Test Passed ?
        var passed = !!obj.test;

        // Do we have a success case
        if (passed && !!obj.success) {
            obj.success.push(obj.callback);
            api.load.apply(null, obj.success);
        }
        // Do we have a fail case
        else if (!passed && !!obj.failure) {
            obj.failure.push(obj.callback);
            api.load.apply(null, obj.failure);
        } else {
            callback();
        }

        return api;
    }

    function getAsset(item) {
        ///<summary>
        /// Assets are in the form of
        /// {
        ///     name : label,
        ///     url  : url,
        ///     state: state
        /// }
        ///</summary>
        var asset = {};

        if (typeof item === "object") {
            for (var label in item) {
                if (!!item[label]) {
                    asset = {
                        name: label,
                        url: item[label]
                    };
                }
            }
        } else {
            asset = {
                name: toLabel(item),
                url: item
            };
        }

        // is the item already existant
        var existing = assets[asset.name];
        if (existing && existing.url === asset.url) {
            return existing;
        }

        assets[asset.name] = asset;
        return asset;
    }

    function allLoaded(items) {
        items = items || assets;

        for (var name in items) {
            if (items.hasOwnProperty(name) && items[name].state !== LOADED) {
                return false;
            }
        }

        return true;
    }

    function onPreload(asset) {
        asset.state = PRELOADED;

        each(asset.onpreload, function (afterPreload) {
            afterPreload.call();
        });
    }

    function preLoad(asset, callback) {
        if (asset.state === undefined) {

            asset.state = PRELOADING;
            asset.onpreload = [];

            loadAsset({
                url: asset.url,
                type: "cache"
            }, function () {
                onPreload(asset);
            });
        }
    }

    function apiLoadHack() {
        /// <summary>preload with text/cache hack
        ///
        /// head.load("http://domain.com/file.js","http://domain.com/file.js", callBack)
        /// head.load(["http://domain.com/file.js","http://domain.com/file.js"], callBack)
        /// head.load({ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }, callBack)
        /// head.load([{ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }], callBack)
        /// </summary>
        var args = arguments,
            callback = args[args.length - 1],
            rest = [].slice.call(args, 1),
            next = rest[0];

        if (!isFunction(callback)) {
            callback = null;
        }

        // if array, repush as args
        if (isArray(args[0])) {
            args[0].push(callback);
            api.load.apply(null, args[0]);

            return api;
        }

        // multiple arguments
        if (!!next) {
            /* Preload with text/cache hack (not good!)
             * http://blog.getify.com/on-script-loaders/
             * http://www.nczonline.net/blog/2010/12/21/thoughts-on-script-loaders/
             * If caching is not configured correctly on the server, then items could load twice !
             *************************************************************************************/
            each(rest, function (item) {
                // item is not a callback or empty string
                if (!isFunction(item) && !!item) {
                    preLoad(getAsset(item));
                }
            });

            // execute
            load(getAsset(args[0]), isFunction(next) ? next : function () {
                api.load.apply(null, rest);
            });
        } else {
            // single item
            load(getAsset(args[0]));
        }

        return api;
    }

    function apiLoadAsync() {
        ///<summary>
        /// simply load and let browser take care of ordering
        ///
        /// head.load("http://domain.com/file.js","http://domain.com/file.js", callBack)
        /// head.load(["http://domain.com/file.js","http://domain.com/file.js"], callBack)
        /// head.load({ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }, callBack)
        /// head.load([{ label1: "http://domain.com/file.js" }, { label2: "http://domain.com/file.js" }], callBack)
        ///</summary>
        var args = arguments,
            callback = args[args.length - 1],
            items = {};

        if (!isFunction(callback)) {
            callback = null;
        }

        // if array, repush as args
        if (isArray(args[0])) {
            args[0].push(callback);
            api.load.apply(null, args[0]);

            return api;
        }

        // JRH 262#issuecomment-26288601
        // First populate the items array.
        // When allLoaded is called, all items will be populated.
        // Issue when lazy loaded, the callback can execute early.
        each(args, function (item, i) {
            if (item !== callback) {
                item = getAsset(item);
                items[item.name] = item;
            }
        });

        each(args, function (item, i) {
            if (item !== callback) {
                item = getAsset(item);

                load(item, function () {
                    if (allLoaded(items)) {
                        one(callback);
                    }
                });
            }
        });

        return api;
    }

    function load(asset, callback) {
        ///<summary>Used with normal loading logic</summary>
        callback = callback || noop;

        if (asset.state === LOADED) {
            callback();
            return;
        }

        // INFO: why would we trigger a ready event when its not really loaded yet ?
        if (asset.state === LOADING) {
            api.ready(asset.name, callback);
            return;
        }

        if (asset.state === PRELOADING) {
            asset.onpreload.push(function () {
                load(asset, callback);
            });
            return;
        }

        asset.state = LOADING;

        loadAsset(asset, function () {
            asset.state = LOADED;

            callback();

            // handlers for this asset
            each(handlers[asset.name], function (fn) {
                one(fn);
            });

            // dom is ready & no assets are queued for loading
            // INFO: shouldn't we be doing the same test above ?
            if (isDomReady && allLoaded()) {
                each(handlers.ALL, function (fn) {
                    one(fn);
                });
            }
        });
    }

    function getExtension(url) {
        url = url || "";

        var items = url.split("?")[0].split(".");
        return items[items.length - 1].toLowerCase();
    }

    /* Parts inspired from: https://github.com/cujojs/curl
     ******************************************************/
    function loadAsset(asset, callback) {
        callback = callback || noop;

        function error(event) {
            event = event || win.event;

            // release event listeners
            ele.onload = ele.onreadystatechange = ele.onerror = null;

            // do callback
            callback();

            // need some more detailed error handling here
        }

        function process(event) {
            event = event || win.event;

            // IE 7/8 (2 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = readystatechange, s.readyState = loaded

            // IE 7/8 (1 event on reload)
            // 1) event.type = readystatechange, s.readyState = complete

            // event.type === 'readystatechange' && /loaded|complete/.test(s.readyState)

            // IE 9 (3 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = readystatechange, s.readyState = loaded
            // 3) event.type = load            , s.readyState = loaded

            // IE 9 (2 events on reload)
            // 1) event.type = readystatechange, s.readyState = complete
            // 2) event.type = load            , s.readyState = complete

            // event.type === 'load'             && /loaded|complete/.test(s.readyState)
            // event.type === 'readystatechange' && /loaded|complete/.test(s.readyState)

            // IE 10 (3 events on 1st load)
            // 1) event.type = readystatechange, s.readyState = loading
            // 2) event.type = load            , s.readyState = complete
            // 3) event.type = readystatechange, s.readyState = loaded

            // IE 10 (3 events on reload)
            // 1) event.type = readystatechange, s.readyState = loaded
            // 2) event.type = load            , s.readyState = complete
            // 3) event.type = readystatechange, s.readyState = complete

            // event.type === 'load'             && /loaded|complete/.test(s.readyState)
            // event.type === 'readystatechange' && /complete/.test(s.readyState)

            // Other Browsers (1 event on 1st load)
            // 1) event.type = load, s.readyState = undefined

            // Other Browsers (1 event on reload)
            // 1) event.type = load, s.readyState = undefined

            // event.type == 'load' && s.readyState = undefined

            // !doc.documentMode is for IE6/7, IE8+ have documentMode
            if (event.type === "load" || (/loaded|complete/.test(ele.readyState) && (!doc.documentMode || doc.documentMode < 9))) {
                // remove timeouts
                win.clearTimeout(asset.errorTimeout);
                win.clearTimeout(asset.cssTimeout);

                // release event listeners
                ele.onload = ele.onreadystatechange = ele.onerror = null;

                // do callback
                callback();
            }
        }

        function isCssLoaded() {
            // should we test again ? 20 retries = 5secs ..after that, the callback will be triggered by the error handler at 7secs
            if (asset.state !== LOADED && asset.cssRetries <= 20) {

                // loop through stylesheets
                for (var i = 0, l = doc.styleSheets.length; i < l; i++) {
                    // do we have a match ?
                    // we need to tests agains ele.href and not asset.url, because a local file will be assigned the full http path on a link element
                    if (doc.styleSheets[i].href === ele.href) {
                        process({
                            "type": "load"
                        });
                        return;
                    }
                }

                // increment & try again
                asset.cssRetries++;
                asset.cssTimeout = win.setTimeout(isCssLoaded, 250);
            }
        }

        var ele;
        var ext = getExtension(asset.url);

        if (ext === "css") {
            ele = doc.createElement("link");
            ele.type = "text/" + (asset.type || "css");
            ele.rel = "stylesheet";
            ele.href = asset.url;

            /* onload supported for CSS on unsupported browsers
             * Safari windows 5.1.7, FF < 10
             */

            // Set counter to zero
            asset.cssRetries = 0;
            asset.cssTimeout = win.setTimeout(isCssLoaded, 500);
        } else {
            ele = doc.createElement("script");
            ele.type = "text/" + (asset.type || "javascript");
            ele.src = asset.url;
        }

        ele.onload = ele.onreadystatechange = process;
        ele.onerror = error;

        /* Good read, but doesn't give much hope !
         * http://blog.getify.com/on-script-loaders/
         * http://www.nczonline.net/blog/2010/12/21/thoughts-on-script-loaders/
         * https://hacks.mozilla.org/2009/06/defer/
         */

        // ASYNC: load in parallel and execute as soon as possible
        ele.async = false;
        // DEFER: load in parallel but maintain execution order
        ele.defer = false;

        // timout for asset loading
        asset.errorTimeout = win.setTimeout(function () {
            error({
                type: "timeout"
            });
        }, 7e3);

        // use insertBefore to keep IE from throwing Operation Aborted (thx Bryan Forbes!)
        var head = doc.head || doc.getElementsByTagName("head")[0];

        // but insert at end of head, because otherwise if it is a stylesheet, it will not override values
        head.insertBefore(ele, head.lastChild);
    }

    /* Parts inspired from: https://github.com/jrburke/requirejs
     ************************************************************/
    function init() {
        var items = doc.getElementsByTagName("script");

        // look for a script with a data-head-init attribute
        for (var i = 0, l = items.length; i < l; i++) {
            var dataMain = items[i].getAttribute("data-headjs-load");
            if (!!dataMain) {
                api.load(dataMain);
                return;
            }
        }
    }

    function ready(key, callback) {
        ///<summary>
        /// INFO: use cases:
        ///    head.ready(callBack);
        ///    head.ready(document , callBack);
        ///    head.ready("file.js", callBack);
        ///    head.ready("label"  , callBack);
        ///    head.ready(["label1", "label2"], callback);
        ///</summary>

        // DOM ready check: head.ready(document, function() { });
        if (key === doc) {
            if (isDomReady) {
                one(callback);
            } else {
                domWaiters.push(callback);
            }

            return api;
        }

        // shift arguments
        if (isFunction(key)) {
            callback = key;
            key = "ALL"; // holds all callbacks that where added without labels: ready(callBack)
        }

        // queue all items from key and return. The callback will be executed if all items from key are already loaded.
        if (isArray(key)) {
            var items = {};

            each(key, function (item) {
                items[item] = assets[item];

                api.ready(item, function () {
                    if (allLoaded(items)) {
                        one(callback);
                    }
                });
            });

            return api;
        }

        // make sure arguments are sane
        if (typeof key !== "string" || !isFunction(callback)) {
            return api;
        }

        // this can also be called when we trigger events based on filenames & labels
        var asset = assets[key];

        // item already loaded --> execute and return
        if (asset && asset.state === LOADED || key === "ALL" && allLoaded() && isDomReady) {
            one(callback);
            return api;
        }

        var arr = handlers[key];
        if (!arr) {
            arr = handlers[key] = [callback];
        } else {
            arr.push(callback);
        }

        return api;
    }

    /* Mix of stuff from jQuery & IEContentLoaded
     * http://dev.w3.org/html5/spec/the-end.html#the-end
     ***************************************************/
    function domReady() {
        // Make sure body exists, at least, in case IE gets a little overzealous (jQuery ticket #5443).
        if (!doc.body) {
            // let's not get nasty by setting a timeout too small.. (loop mania guaranteed if assets are queued)
            win.clearTimeout(api.readyTimeout);
            api.readyTimeout = win.setTimeout(domReady, 50);
            return;
        }

        if (!isDomReady) {
            isDomReady = true;

            init();
            each(domWaiters, function (fn) {
                one(fn);
            });
        }
    }

    function domContentLoaded() {
        // W3C
        if (doc.addEventListener) {
            doc.removeEventListener("DOMContentLoaded", domContentLoaded, false);
            domReady();
        }

        // IE
        else if (doc.readyState === "complete") {
            // we're here because readyState === "complete" in oldIE
            // which is good enough for us to call the dom ready!
            doc.detachEvent("onreadystatechange", domContentLoaded);
            domReady();
        }
    }

    // Catch cases where ready() is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if (doc.readyState === "complete") {
        domReady();
    }

    // W3C
    else if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", domContentLoaded, false);

        // A fallback to window.onload, that will always work
        win.addEventListener("load", domReady, false);
    }

    // IE
    else {
        // Ensure firing before onload, maybe late but safe also for iframes
        doc.attachEvent("onreadystatechange", domContentLoaded);

        // A fallback to window.onload, that will always work
        win.attachEvent("onload", domReady);

        // If IE and not a frame
        // continually check to see if the document is ready
        var top = false;

        try {
            top = !win.frameElement && doc.documentElement;
        } catch (e) {
        }

        if (top && top.doScroll) {
            (function doScrollCheck() {
                if (!isDomReady) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll("left");
                    } catch (error) {
                        // let's not get nasty by setting a timeout too small.. (loop mania guaranteed if assets are queued)
                        win.clearTimeout(api.readyTimeout);
                        api.readyTimeout = win.setTimeout(doScrollCheck, 50);
                        return;
                    }

                    // and execute any waiting functions
                    domReady();
                }
            }());
        }
    }
    //#endregion

    //#region Public Exports
    // INFO: determine which method to use for loading
    api.load = api.js = isAsync ? apiLoadAsync : apiLoadHack;
    api.test = conditional;
    api.ready = ready;
    //#endregion

    //#region INIT
    // perform this when DOM is ready
    api.ready(doc, function () {
        if (allLoaded()) {
            each(handlers.ALL, function (callback) {
                one(callback);
            });
        }

        if (api.feature) {
            api.feature("domloaded", true);
        }
    });
    //#endregion
}(window));

/*********iui JS*********/
/*
 * 防止浏览器不支持console报错
 */
if (!window.console) {
    window.console = {};
    var funs = ["profiles", "memory", "_commandLineAPI", "debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd"];
    for (var i = 0; i < funs.length; i++) {
        console[funs[i]] = function () {
        };
    }
}

/*
 *解决ie6下不支持背景缓存
 */
iui.ready(function () {
    if (!+'\v1' && !('maxHeight' in document.body.style)) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {
        }
    }
});

/*
 *iui core
 */
(function (win) {
    var doc = document,
        ver = typeof win.GV !== 'undefined' && typeof win.GV.VERSION !== 'undefined' ? win.GV.VERSION.replace(/(\s)/g, '_') : '1.0',
        config = {
            modules: {} //记录模块物理路径
            ,
            event: {} //记录模块自定义事件
        },
        getPath = function () {
            var jsPath = doc.currentScript ? doc.currentScript.src : function () {
                var js = doc.scripts,
                    last = js.length - 1,
                    src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
        _assetRoot = typeof win.GV !== 'undefined' && typeof win.GV.ASSETS_ROOT !== 'undefined' ? win.GV.ASSETS_ROOT : getPath,
        modules = {
            layer3: 'libs/layer3/layer' //弹出层
            ,
            validate: 'modules/validate' //表单验证
            ,
            ajaxForm: 'modules/ajaxForm' //表单异步提交
            ,
            toast: 'modules/iui.dialog.toast' //表单异步提交
            ,
            mui: 'libs/mui/js/mui.min' //mui框架
            ,
            vue: 'libs/vue/vue.min',
            umeditor: 'libs/umeditor/umeditor.min',
            jeditor: 'libs/jeditor/jeditor',
            'jquery-support': 'modules/jquery-support',
            'iui.core': 'modules/iui.core' //表单验证
            ,
            laydate: 'modules/laydate' //日期
            ,
            laypage: 'modules/laypage' //分页
            ,
            laytpl: 'modules/laytpl' //模板引擎
            ,
            layim: 'modules/layim' //web通讯
            ,
            layedit: 'modules/layedit' //富文本编辑器
            ,
            form: 'modules/form' //表单集
            ,
            upload: 'modules/upload' //上传
            ,
            tree: 'modules/tree' //树结构
            ,
            table: 'modules/table' //表格
            ,
            element: 'modules/element' //常用元素操作
            ,
            util: 'modules/util' //工具块
            ,
            flow: 'modules/flow' //流加载
            ,
            carousel: 'modules/carousel' //轮播
            ,
            code: 'modules/code' //代码修饰器
            ,
            jquery: 'libs/jquery/jquery' //DOM库（第三方）
            ,
            mobile: 'modules/mobile' //移动大模块 | 若当前为开发目录，则为移动模块入口，否则为移动模块集合
            ,
            'layui.all': '../layui.all' //PC模块合并版
        };

    //add suffix and version
    for (var i in modules) {
        if (modules.hasOwnProperty(i)) {
            modules[i] = _assetRoot + modules[i] + '.js?v=' + ver;
        }
    }

    //
    //	for(var i in alias_css) {
    //		if (alias_css.hasOwnProperty(i)) {
    //			alias_css[i] = root + alias_css[i] +'.css?v=' + ver;
    //		}
    //	}

    //css loader

    //!TODO old webkit and old firefox does not support
    //	iui.css = function(alias/*alias or path*/,callback) {
    //		var url = alias_css[alias] ? alias_css[alias] : alias_js;
    //		var link = document.createElement('link');
    //      link.rel = 'stylesheet';
    //      link.href = url;
    //      link.onload = link.onreadystatechange = function() {//chrome link无onload事件
    //          var state = link.readyState;
    //          if (callback && !callback.done && (!state || /loaded|complete/.test(state))) {
    //              callback.done = true;
    //              callback();
    //          }
    //      }
    //      document.getElementsByTagName('head')[0].appendChild(link);
    //	};

    //==依赖关系配置
    var dependencies = {
        //ajaxForm:['jquery','form'],
        //form:['validate']
    }
    var getDps = (function dps(dependency) {
        var d = dependencies.hasOwnProperty(dependency),
            arr = [];
        while (d) {
            var dp = dependencies[dependency];
            var has = false;
            for (var i = 0; i < dp.length; i++) {
                arr.push(dp[i]);
                dependency = dp[i];
                d = dependencies.hasOwnProperty(dp[i]);
                if (d) {
                    has = d;
                }
            }
            if (!has) {
                return arr;
            }
        }
        return arr;
    });

    //数组去重
    Array.prototype.unique = function () {
        var res = [];
        var json = {};
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    }
    //
    //Using the alias to load the script file
    iui.use = function () {
        var args = arguments,
            len = args.length,
            all = [];
        for (var i = 0; i < len; i++) {
            if (typeof args[i] === 'string' && modules[args[i]]) {
                //获取依赖关系
                var dps = getDps(args[i]);
                for (var j = 0; j < dps.length; j++) {
                    all.push(dps[j]);
                }
            }
            all.push(args[i]);
        }
        var res = all.unique();
        for (var i = 0; i < res.length; i++) {
            if (typeof res[i] === 'string' && modules[res[i]]) {
                res[i] = modules[res[i]];
            }
        }
        iui.load.apply(null, res);
    };

    //iui javascript template (author: John Resig http://ejohn.org/blog/javascript-micro-templating/)
    var cache = {};
    iui.tmpl = function (str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(str) :
            new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
    //设备信息
    iui.device = function (key) {
        var agent = navigator.userAgent.toLowerCase()

            //获取版本号
            ,
            getVersion = function (label) {
                var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
                label = (agent.match(exp) || [])[1];
                return label || false;
            }

            //返回结果集
            ,
            result = {
                os: function () { //底层操作系统
                    if (/windows/.test(agent)) {
                        return 'windows';
                    } else if (/linux/.test(agent)) {
                        return 'linux';
                    } else if (/iphone|ipod|ipad|ios/.test(agent)) {
                        return 'ios';
                    } else if (/mac/.test(agent)) {
                        return 'mac';
                    }
                }(),
                ie: function () { //ie版本
                    return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
                        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
                    ) : false;
                }(),
                weixin: getVersion('micromessenger') //是否微信
            };

        //任意的key
        if (key && !result[key]) {
            result[key] = getVersion(key);
        }

        //移动设备
        result.android = /android/.test(agent);
        result.ios = result.os === 'ios';

        return result;
    };
    iui.each = function (obj, fn) {
        var key, that = this;
        if (typeof fn !== 'function') return that;
        obj = obj || [];
        if (obj.constructor === Object) {
            for (key in obj) {
                if (fn.call(obj[key], key, obj[key])) break;
            }
        } else {
            for (key = 0; key < obj.length; key++) {
                if (fn.call(obj[key], key, obj[key])) break;
            }
        }
        return that;
    }
    //自定义模块事件
    iui.onevent = function (modName, events, callback) {
        if (typeof modName !== 'string' ||
            typeof callback !== 'function') return this;

        return Layui.event(modName, events, null, callback);
    };

    //执行自定义模块事件
    iui.event = function (modName, events, params, fn) {
        var that = this,
            result = null,
            filter = events.match(/\((.*)\)$/) || [] //提取事件过滤器字符结构，如：select(xxx)
            ,
            eventName = (modName + '.' + events).replace(filter[0], '') //获取事件名称，如：form.select
            ,
            filterName = filter[1] || '' //获取过滤器名称,，如：xxx
            ,
            callback = function (_, item) {
                var res = item && item.call(that, params);
                res === false && result === null && (result = false);
            };

        //添加事件
        if (fn) {
            config.event[eventName] = config.event[eventName] || {};
            //这里不再对多次事件监听做支持，避免更多麻烦
            //config.event[eventName][filterName] ? config.event[eventName][filterName].push(fn) :
            config.event[eventName][filterName] = [fn];
            return this;
        }

        //执行事件回调
        iui.each(config.event[eventName], function (key, item) {
            //执行当前模块的全部事件
            if (filterName === '{*}') {
                iui.each(item, callback);
                return;
            }

            //执行指定事件
            key === '' && iui.each(item, callback);
            key === filterName && iui.each(item, callback);
        });

        return result;
    };

    iui.getPath = getPath;
    iui.util = {};
    win.iui = win.iui || {};
})(window);