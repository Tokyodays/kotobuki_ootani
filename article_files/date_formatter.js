/**
 * Copyright 2014-2015 Evernote Corporation. All rights reserved.
 */
var EvernoteClipper = (function(m) {
  m.formatDate = function(date) {
    var lang = navigator.language || navigator.browserLanguage;
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    // See here: http://en.wikipedia.org/wiki/Date_format_by_country
    var formatINTL = "%day %monthName %year";
    var formatUS = "%monthName %day, %year";
    var formatCN = "%year\u5E74%month\u6708%day\u65E5";
    var formatJP = "%year\u5E74%monthName%day\u65E5";

    var format = formatINTL;
    var day = date.getDate();
    if (lang.match(/en-us/i)) {
      format = formatUS;
    } else if (lang.match(/^zh/i)) {
      format = formatCN;
    } else if (lang.match(/^ja/i)) {
      format = formatJP;
    }
    format = format.replace(/%day/, day);
    format = format.replace(/%year/, date.getFullYear());
    format = format.replace(/%monthName/, months[date.getMonth()]);
    format = format.replace(/%month/, date.getMonth() + 1);
    return format;
  };
  return m;
})(EvernoteClipper || {});