/* AOne common tag */
"use strict";
!function(e,r,t,a){if(!e.a1tracker){var n=e.a1tracker={};n.VERSION="v0.6.5",n.queue=n.queue||[];for(var s=0;s<t.length;s++){var u=t[s];n[u]=n[u]||function(e){return function(){for(var r=arguments.length,t=Array(r),a=0;a<r;a++)t[a]=arguments[a];n.queue.push({name:e,arguments:t.slice()})}}(u)}var c=r.createElement("script"),i=r.getElementsByTagName("script")[0];c.async=!0,c.src="//img.ak.impact-ad.jp/ut/a1/tracking.min.js",i.parentNode.insertBefore(c,i)}}(window,document,["ready","send","sendEvent","setParams","initParams","sendCustomerId","getSegments","getUserId"]);
/* F1H DMP Plugin(AOne) */
(function(w){
  /* AOne owner id hash */
  var a1_id = 'f9647ca0f4a5e33f';
  /* AOne owner id hash */
  var f1h_lib = '__ASL__';
  var adProvider = w[f1h_lib];
  var f1h_cb = function(error, data) {
    if (!error) {
      if (adProvider && typeof adProvider['processDmp'] === 'function') adProvider['processDmp'].call(w, data.segments);
    }
  };

  var a1_cookie_name = adProvider['dmpSegCookieName'];
  if (a1tracker.completeDcCall) {
    a1tracker.getSegments(a1_id, f1h_cb);
  } else {
    var propParams = (function() {
      var props = [];
      var evars = [];
      if (!w['s']) {
        if (!w['rnTrackVars']) return props;
        if (rnTrackVars.category && rnTrackVars.category.level2 && rnTrackVars.category.level2.id) {
          evars.push("ev6=" + encodeURIComponent(rnTrackVars.category.level2.id));
        }
        if (rnTrackVars.category && rnTrackVars.category.level3 && rnTrackVars.category.level3.id) {
          evars.push("ev7=" + encodeURIComponent(rnTrackVars.category.level3.id));
        }
        return evars;
      }
      for(var val in s) {
        if(val.indexOf("prop") !== -1 && s[val]) {
          var key = "tm" + val.replace("prop", "");
          props.push(key + "=" + encodeURIComponent(s[val]));
        }
        if(val.indexOf("eVar") !== -1 && s[val]) {
          var key = "ev" + val.replace("eVar", "");
          evars.push(key + "=" + encodeURIComponent(s[val]));
        }
      }
      return props.concat(evars);
    })();
    if (propParams.length > 0) a1tracker.setParams(a1_id, 'url', location.href + ((location.search) ? "&" : "?") + propParams.join("&"));
    if (!!a1_cookie_name)
      a1tracker.send(a1_id, f1h_cb, {
        storeSegmentIds: {
          cookieName: a1_cookie_name,
          delimiter: ',',
          expire: 90
        }
      });
    else
      a1tracker.send(a1_id, f1h_cb);
    a1tracker.completeDcCall = true;
  }
})(window);