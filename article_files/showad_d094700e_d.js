(function(w) {
    //config
    var showinfo = location.search.indexOf('show_f1h_infos') != -1;
    var lib = showinfo ? "//nkispa.nikkei.com/fh/showad_d094700e_info.js" : "//nkispa.nikkei.com/fh/showad_d094700e.js";
    var d = w.document;
    var maxSegments=90;

    //no iframe
    function inlineHandler(ads, instance) {
        ads.forEach(function(ad) {
            var el = d.getElementById(ad.id + '_' + ad.section_id + (!instance ? "" : "_" + ad.instance));
            if (!!el) {
                if (showinfo) {
                    el.innerHTML = '<span style="background: white;margin:0;padding:0;font-size: 2rem;border:1px inset black;position: absolute;z-index:1000002">Section:' + ad.section_id + (!instance ? '' : '  Ins:' + ad.instance) + '  Slot:' + ad.id + '</span>' + ad.data;
                    el.style.display = 'block';
                    el.style.boxShadow = '0 0 25px 3px red';
                    el.style.background = 'black';
                } else {
                    el.innerHTML = ad.data;
                    el.style.display = ad.noad ? 'none' : '';
                }
            }
        });
    }

    function checkInline(p) {
        if (p.inline) {
            delete p.inline;
            p.handler = inlineHandler;
        }
        return p;
    }

    //Krux init
    w.Krux || ((w.Krux = function() { Krux.q.push(arguments); }).q = []);

    function retrieve(n) {
        var m, k = 'kxnikkei_' + n;
        try {
            return w.localStorage[k] || "";
        } catch(e) {
            if (navigator.cookieEnabled) {
                m = d.cookie.match(k + '=([^;]*)');
                return (m && unescape(m[1])) || "";
            } else {
                return '';
            }
        }
    }
    Krux.user = retrieve('kuid');
    Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];

    //Add Krux params
    function addKrux(p) {
        p.custom = p.custom || {};
        p.custom.KSEG = Krux.segments.length > maxSegments ? Krux.segments.slice(0, maxSegments) : Krux.segments;
        return p;
    }

    //Add Common params
    function addCommon(p) {
        p.custom = p.custom || {};
        if (!!w['F1H_CUSTOM_KEY_VALUE']) {
            var s = w.F1H_CUSTOM_KEY_VALUE;
            for (var c in s)
                if (s.hasOwnProperty(c + "") && (!p.custom.hasOwnProperty(c + ""))) p.custom[c] = s[c];
        }
        p.custom['nhost'] = location.hostname.split('.').join('_');
        return p;
    }

    //Add Common params
    function setAdServerUrl(p) {
        if (p.hasOwnProperty('proxy_server_url')) {
            p.ad_server_url = p.proxy_server_url;
            p.cache_safe = false;
            delete p.proxy_server_url;
        }
        if (p.hasOwnProperty('cache_server_url')) {
            p.ad_server_url = p.cache_server_url;
            p.cache_safe = true;
            delete p.cache_server_url;
        }
        return p;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = d.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    function optOut(p) {
        if (getCookie('IPSX_RT_SEGMENT') == 'opt-out') {
            p.custom = p.custom || {};
            p.custom['OPTO'] = 1;
        }
        return p;
    }

    //Add atlasId
    function addAtlasId(p) {
        var atlasId = getCookie('atlasId');
        if (!!atlasId) {
            p.custom = p.custom || {};
            p.custom.atlasId = atlasId;
        }
        return p;
    }

    //modify params before requestAds
    function preProcess(p) {
        //only suppurt async requests
        p.sync = false;
        return addAtlasId(optOut(addKrux(addCommon(setAdServerUrl(checkInline(p))))));
    }

    var url = ("https:" === d.location.protocol ? "https:" : "http:") + lib;
    var tp = w['TagProvider'] = new Tag(w['TagProvider']);
    if (tp.old) {
        var s = tp.old.stack;
        for (var c in s)
	        if (s.hasOwnProperty(c + "")) {
	        	var p = preProcess(s[c]);
	        	delete s[c];
	            tp.stack[p.sectionId + (p.instance ? "_" + p.instance : "")] = p;
	        }
    }

    function g(a) {
        var b = d.createElement("script"),
            c = d.getElementsByTagName("script")[0];
        b.type = "text/javascript";
        b.src = a;
        b.async = !0; - 1 !== navigator.userAgent.indexOf("Opera") ? setTimeout(function() { c.parentNode.insertBefore(b, c) }, 0) : c.parentNode.insertBefore(b, c)
    }
    g(url);
    w['__ASL_LIB_LOADED'] = 1;

    function Tag(old) {
        var me = this;
        me['stack'] = {};
        me['displayAd'] = function() {};
        me.old = old || false;
        me['requestAds'] = function(p) {
            var l = w["__ASL__"];
            if ((p || {})['sectionId'] !== 0 && !(p || {})['sectionId']) { return; }
            p = preProcess(p);
            try {
                l['requestAds'].call(l, p);
            } catch (e) {
                me['stack'][p.sectionId + (p.instance ? "_" + p.instance : "")] = p;
            }
        }
    }
})(window);