(function () {
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {
        // Configure
        atlasTracking.config({
            'system': {
                'endpoint': 'astat.nikkei.com',
                'cookieDomain': 'nikkei.com'
            },
            'defaults': {
                'pageUrl': rnTrackVars.pageUrl,
                'pageReferrer': rnTrackVars.pageReferrer,
                'pageTitle': rnTrackVars.pageTitle,
            },
            'product': {
                'productFamily': rnTrackVars.productFamily || 'DS',
                'productName': rnTrackVars.product || 'DS-Responsive'
            },
            'options': {
                'useGet': true,
                'exchangeAtlasId': {
                    'pass': false,
                    'passParamKey': 'atlas_id',
                    'passTargetDomains': [],
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
                    'internalDomains': ['www.nikkei.com', 'mw.nikkei.com', 'r.nikkei.com', 'next.nikkei.com', 'id.nikkei.com', 'style.nikkei.com'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackDownload': {
                    'enable': true,
                    'fileExtensions': ['pdf', 'zip', 'laz', 'tar', 'gz', 'tgz', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt'],
                    'nameAttribute': 'data-atlas-link-name',
                },
                'trackPerformance': {
                    'enable': false,
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
                    'target': rnTrackVars.trackReadTarget,
                    'granularity': 25,
                    'milestones': [4, 15, 30, 60, 90, 120],
                },
                'trackViewability': {
                    'enable': true,
                    'targets': rnTrackVars.trackViewabilityTargets,
                },
                'trackMedia': {
                    'enable': true,
                    'selector': 'video, audio',
                    'heartbeat': 5,
                },
                'trackForm': {
                    'enable': false,
                    'target': null,
                },
                'trackUnload': {
                    'enable': true,
                }
            }
        });

        window.makeContext = function() {
          return {
            'app': rnTrackVars.app,
            'app_version': null,
            'source': rnTrackVars.source || null,
            'edition': rnTrackVars.edition,
            'id': null,
            'root_id': null,
            'content_id': rnTrackVars.contentId,
            'content_name': rnTrackVars.contentName,
            'content_status': rnTrackVars.contentStatus || 'none',
            'page_name': rnTrackVars.pageName,
            'page_num': rnTrackVars.pageNumber,
            'category_l1': rnTrackVars.category.level1.name,
            'category_l2': rnTrackVars.category.level2.name,
            'category_l3': rnTrackVars.category.level3.name,
            'tracking_code': atlasTracking.getQueryValue('n_cid'),
            'events': rnTrackVars.events,
            'custom_object': rnTrackVars.customObject || {},
            'published_at': rnTrackVars.printEditionDate,
            'action': rnTrackVars.action,
            'url': rnTrackVars.pageUrl,
            'page_title': rnTrackVars.pageTitle,
            'funnel': {}
          }
        }

        window.updateContext = function () {
          const context = makeContext()

          Object.keys(context).forEach(function (key) {
            atlasTracking.setCustomVars(key, context[key]);
          });
        }

        // Init Page data
        window.sendAtlasPageView = function () {
            atlasTracking.initPage({
                user: {
                    'user_id': atlasTracking.getCookieValue('NID-Serial-Cookie'),
                    'user_status': rnTrackVars.userRank,
                    'site_session': null
                },
                context: makeContext()
            });

            // Set R-Nikkei flags
            atlasTracking.setCustomVars('flags', rnTrackVars.flags);
            // Set PWA metrics
            atlasTracking.setCustomVars('pwa', rnTrackVars.pwa);
            // Set Search info
            atlasTracking.setCustomVars('search', rnTrackVars.search);
            // Set published_at info
            atlasTracking.setCustomVars('published_at', rnTrackVars.printEditionDate);

            // Set RToaster ID
            var rtoaster_id = atlasTracking.getCookieValue('_rt.uid');
            if (rtoaster_id) {
                atlasTracking.setCustomId('rtoaster', rtoaster_id);
            }

            // Send PV
            atlasTracking.trackPage();

        };

        if (!rnTrackVars.doNotSendPageViewOnLoad) {
            sendAtlasPageView();
        }
    }
}());
