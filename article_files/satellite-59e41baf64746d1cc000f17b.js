(function() {
  var targets = document.getElementsByClassName('cmn-article_list');
  var now = (new Date()).getTime();
  var results = {};
  var viewedFlags = {}
  window.addEventListener('atlasVisibilityStatus', function() {
      for (var i = 0; i < targets.length; i++) {
        if (targets[i]) {
          results[i] = atlasTracking.getVisibility(targets[i]);
          if (results[i].status.isInView == true && results[i].detail.documentIsVisible != 'hidden' && results[i].detail.documentIsVisible != 'prerender' && results[i].detail.targetViewableRate >= 0.5 && !viewedFlags[i]) {
            setTimeout(function(i) {
              if (typeof results[i] != "undefined" && results[i].detail.targetViewableRate >= 0.5 && !viewedFlags[i]) {
                now = (new Date()).getTime();
                viewedFlags[i] = true;
                var link_list = [];
                var name = '';
                var link_tags = targets[i].getElementsByTagName('a');
                var parent = targets[i].parentNode.previousElementSibling;
                if(parent.childElementCount == 1){
                  if(parent.getElementsByClassName('cmnc-title').length == 1){
                    name = parent.getElementsByClassName('cmnc-title')[0].innerText;
                  }else if(parent.getElementsByClassName('m-headline_medium-title').length == 1){
                    name = parent.getElementsByClassName('m-headline_medium-title')[0].innerText;
                  }else if(document.getElementsByClassName('cmn-large_headline').length == 2){
                    name = document.getElementsByClassName('cmn-large_headline')[1].getElementsByClassName('cmnc-title')[0].innerText;
                  }else{
                    name = "not_detected";
                  }
                }else{
                  name = "No Name";
                }
                for (var c = 0; c < link_tags.length; c++) {
                    var parser = document.createElement('a');
                    parser.href = link_tags[c];
                    link_list[c] = parser.pathname.replace(/article|\//gi, '');
                }
                atlasTracking.trackAction('inview', 'element', '', {
                    'content_name': name,
                    'custom_vars': {
                      'page_height': results[i].detail.documentHeight,
                      'element_height': results[i].detail.targetHeight,
                      'links': link_list
                    }
                });
              }
            }, 1000, i);
          }
        }
      }
  }, false);
}());
