(function () {
    // Cutting The Mustard!
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {

        // Paywall Status
        var paywallStatus = "none";
        if (document.location.href.match("/article/")) {
            var paywallElement = document.getElementsByClassName("m-articleRegist");
            if (paywallElement.length > 0) {
                paywallStatus = "locked";
            } else {
                paywallStatus = "opened";
            }
        }

        // Conversion Flow
        var funnel = {};
        if (window.parent.nkTrackVars) {
            funnel = {
                funnel_name: window.parent.nkTrackVars.funnel_name ? window.parent.nkTrackVars.funnel_name : undefined,
                funnel_steps: window.parent.nkTrackVars.funnel_steps ? window.parent.nkTrackVars.funnel_steps : undefined,
                step_name: window.parent.nkTrackVars.step_name ? window.parent.nkTrackVars.step_name : undefined,
                step_number: window.parent.nkTrackVars.step_number ? window.parent.nkTrackVars.step_number : undefined,
                step_state: window.parent.nkTrackVars.step_state ? window.parent.nkTrackVars.step_state : undefined
            }

        } else {
            funnel = undefined;
        }

        // Product Definition
        var productName = 'DS-Web-PC';
        if(window.parent.location.hostname === 'www.nikkei.com'){
            productName = 'DS-Web-PC';
        }else if(window.parent.location.hostname === 'mw.nikkei.com'){
            productName = 'DS-Web-Mobile';
        }else if(window.parent.location.hostname === 'r.nikkei.com'){
            productName = 'DS-Responsive';
        }else if(window.parent.location.hostname === 'vdata.nikkei.com'){
            productName = 'DS-Web-VData';
        }else if(window.parent.location.hostname === 'style.nikkei.com'){
            productName = 'DS-Style';
        }else if(window.parent.location.hostname === 'regist.nikkei.com'){
            productName = 'DS-Web-Regist';
        }else if(window.parent.location.hostname === 'id.nikkei.com'){
            productName = 'DS-Web-ID';
        }else if(window.parent.location.hostname === 'markets.mw.nikkei.com'){
            productName = 'DS-Web-Mobile-Market';
        }

        // Configure
        atlasTracking.config({
            'system': {
                'endpoint': 'astat.nikkei.com',
                'cookieDomain': 'nikkei.com'
            },
            'defaults': {
                'pageUrl': window.parent.document.location.href,
                'pageReferrer': window.parent.document.referrer,
                'pageTitle': '-',
            },
            'product': {
                'productFamily': 'DS',
                'productName': productName
            },
            'options': {
                'useGet': true,
                'exchangeAtlasId': {
                    'pass': true,
                    'passParamKey': 'atlas_id',
                    'passTargetDomains': ['comemo.io'],
                    'catch': false,
                    'catchParamKey': 'atlas_id',
                    'catchTargetDomains': [],
                },
                'trackClick': {
                    'enable': true,
                    'targetAttribute': 'data-atlas-trackable',
                },
                'trackLink': {
                    'enable': true,
                    'internalDomains': ['www.nikkei.com', 'mw.nikkei.com', 'r.nikkei.com', 'next.nikkei.com', 'id.nikkei.com', 'asia.nikkei.com', 'style.nikkei.com'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackDownload': {
                    'enable': true,
                    'fileExtensions': ['pdf', 'zip', 'laz', 'tar', 'gz', 'tgz', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackPerformance': {
                    'enable': true,
                },
                'trackScroll': {
                    'enable': true,
                    'granularity': 25,
                    'threshold': 2,
                },
                'trackInfinityScroll': {
                    'enable': false,
                    'step': 600,
                    'threshold': 2,
                },
                'trackRead': {
                    'enable': true,
                    'target': window.parent.document.querySelector('div.cmn-article_text'),
                    'granularity': 25,
                    'milestones': [4, 15, 30, 60, 90, 120],
                },
                'trackViewability': {
                    'enable': false,
                    'targets': [],
                },
                'trackMedia': {
                    'enable': true,
                    'selector': 'video, audio',
                    'heartbeat': 5,
                },
                'trackForm': {
                    'enable': true,
                    'target': window.parent.document.querySelector('form#ChargeActionForm'),
                },
                'trackUnload': {
                    'enable': true,
                }
            }
        });

        // Init Page data
        atlasTracking.initPage({
            user: {
                'user_id': atlasTracking.getCookieValue('NID-Serial-Cookie'),
                'user_status': window.prop39 ? window.prop39 : undefined,
                'site_session': undefined
            },
            context: {
                'app': window.prop24 ? window.prop24 : undefined,
                'app_version': undefined,
                'source': window.prop22 ? window.prop22 : undefined,
                'edition': window.prop21 ? window.prop21 : undefined,
                'content_id': window.prop14 ? window.prop14 : undefined,
                'content_name': window.prop3 ? window.prop3 : undefined,
                'content_status': paywallStatus,
                'page_name': window.prop25 || '',
                'page_num': atlasTracking.getQueryValue('df') || 1,
                'category_l1': window.channel ? window.channel : undefined,
                'category_l2': window.prop1 ? window.prop1 : undefined,
                'category_l3': window.prop2 ? window.prop2 : undefined,
                'tracking_code': atlasTracking.getQueryValue('n_cid'),
                'events': undefined,
                'custom_object': {},
                'funnel': funnel
            }
        });

        // Set Custom Data
        if (window.prop25) {
            atlasTracking.setCustomVars('article_attributes', {
                'topic_name': window.prop25 ? window.prop25 : undefined
            });
        }

        if (window.prop31 || window.prop32 || window.prop33) {
            atlasTracking.setCustomVars('company_attributes', {
                'ticker_symbol': window.prop31 ? window.prop31 : undefined,
                'company_code': window.prop32 ? window.prop32 : undefined,
                'fund_code': window.prop33 ? window.prop33 : undefined
            });
        }

        // Fund Code for NKD
        var fund_code = atlasTracking.getQueryValue('fcode') || undefined;
        if (fund_code) {
            atlasTracking.setCustomObject('fund_code', fund_code);
        }

        // Set Custom IDs
        var rtoaster_id = atlasTracking.getCookieValue('_rt.uid');
        if (rtoaster_id) {
            atlasTracking.setCustomId('rtoaster', rtoaster_id);
        }

        if (window.original_site) {
            atlasTracking.setCustomObject('nid', {
                original_site: window.original_site
            });
        }

        if (window.parent.kiteIsMigrated && window.parent.kiteIsMigrated === "1") {
          atlasTracking.setCustomObject('kiteIsMigrated', true);
        } else {
          atlasTracking.setCustomObject('kiteIsMigrated', false);
        }

        switch (window.parent.kiteOptMigration) {
          case "1":
            atlasTracking.setCustomObject('kiteOptMigration', "1");
            break;
          case "0":
            atlasTracking.setCustomObject('kiteOptMigration', "0");
            break;
        }

        switch (window.parent.kiteForceMigration) {
          case "1":
            atlasTracking.setCustomObject('kiteForceMigration', "1");
            break;
          case "0":
            atlasTracking.setCustomObject('kiteForceMigration', "0");
            break;
        }

        // Send PV
        atlasTracking.trackPage();

        // Rtoaster Integration
        if(window.parent.Rtoaster && window.parent.Rtoaster.existingContent && window.parent.Rtoaster.existingContent.length > 0){
            for(var i = 0; i < window.parent.Rtoaster.existingContent.length; i++){
                atlasTracking.trackAction('dispatch', 'rtoaster', null, {
                    "name": 'rtoaster-impression',
                    "custom_vars": window.parent.Rtoaster.existingContent[i]
                });
            }
        }

        /*
        Action Tracking
        */

        // Global
        var headerLogin = document.getElementById('JSID_LOGIN');
        if (headerLogin) {
            headerLogin.addEventListener('click', function () {
                atlasTracking.trackAction('click', 'button', 'header_login', {})
            });
        }
        var headerRegist = document.querySelector('#PAGE_TOP .subpage-header__btn--subscribe');
        if (!window.location.pathname.indexOf('/nkd/')) {
          headerRegist = document.querySelector('#PAGE_TOP .l-miH02_H02d_btn')
        }
        if (headerRegist) {
            headerRegist.addEventListener('click', function () {
                atlasTracking.trackAction('click', 'button', 'header_register', {})
            });
        }
        var footerRegist = document.querySelector('#cmn-rtfooter-var .messageWindow_detail-link a');
        if (footerRegist) {
            footerRegist.addEventListener('click', function () {
                atlasTracking.trackAction('click', 'button', 'footer_register', {})
            });
        }
        var footerClose = document.querySelector('#cmn-rtfooter-var .messageWindow_close a');
        if (footerClose) {
            footerClose.addEventListener('click', function () {
                atlasTracking.trackAction('click', 'button', 'footer_close', {})
            });
        }

        // Article
        if (!window.location.pathname.indexOf('/article/')) {
            var articleRegist = document.getElementById("JSID_R1FT");
            if (articleRegist) {
                articleRegist.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'article_register', {})
                });
            }
            var articleLogin = document.getElementById("JSID_R1LOGIN");
            if (articleLogin) {
                articleLogin.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'article_login', {})
                });
            }
            var freeArticleUpgrad = document.querySelector('#CONTENTS_MAIN .m-articleRegist .m-articleRegist_regist a');
            if (freeArticleUpgrad) {
                freeArticleUpgrad.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'article_upgrade', {})
                });
            }
            var paidArticleUnlock = document.querySelector('#JSID_consume .m-articleRegist_open a');
            if (paidArticleUnlock) {
                paidArticleUnlock.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'article_unlock', {})
                });
            }
            var paidArticleUpgrade = document.querySelector('#JSID_consume .cmnc-teaser_button a');
            if (paidArticleUpgrade) {
                paidArticleUpgrade.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'article_upgrade', {})
                });
            }
        }

        // FT Table
        if (!window.location.pathname.indexOf('/r123')) {
            var ftTableRegistDigital = document.querySelector('.plan_subscribe .plan1 button');
            if (ftTableRegistDigital) {
                ftTableRegistDigital.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'register_to_digital', {})
                });
            }
            var ftTableRegistPaper = document.querySelector('.plan_subscribe .plan2 button');
            if (ftTableRegistPaper) {
                ftTableRegistPaper.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'register_to_paper', {})
                });
            }
            var ftTableRegistDouble = document.querySelector('.plan_subscribe .plan3').getElementsByTagName('button')[0];
            if (ftTableRegistDouble) {
                ftTableRegistDouble.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'register_to_double', {})
                });
            }
            var ftTableRegistUpgrade = document.querySelector('.plan_subscribe .plan3').getElementsByTagName('button')[1];
            if (ftTableRegistUpgrade) {
                ftTableRegistUpgrade.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'upgrade_double', {})
                });
            }
            var ftTableRegistFree = document.querySelector(".ds_regist .btn3");
            if (ftTableRegistFree) {
                ftTableRegistFree.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'register_to_free', {})
                });
            }
            var ftTableGoToPro = document.querySelector(".tab_pro_link");
            if (ftTableGoToPro) {
                ftTableGoToPro.addEventListener('click', function () {
                    atlasTracking.trackAction('click', 'button', 'go_to_pro', {})
                });
            }
        }
    }
}());
