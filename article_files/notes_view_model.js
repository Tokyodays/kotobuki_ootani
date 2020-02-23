"use strict";

$(function() {
    var loading = {
        show : function() {
            $('#loading').remove();
            $('body').append($('#loader-template').text());
        },
        hide : function() {
            $('#loading').remove();
        }
    };
    var postMessage = function(size, msg){
        var count = 15;
        var _postMessage = function(size, msg) {
            PARENT_WINDOW.postMessage(size, msg);
//            var $iframe = $(PARENT_WINDOW.document).find('iframe#related_note')
 //           if ($iframe && $iframe.css('height') == size || count <= 0) return
            setTimeout(function(){
                count -= 1;
                if (count <= 0) return;
                _postMessage(size, msg);
            }, 300);
        };
        _postMessage(size, msg);
    };
    var NotesViewModel = function() {
        var self = this;
        var SUCCESS_1_SIZE = '145px';
        var SUCCESS_2_SIZE = '230px';
        var ERROR_SIZE = '75px';
        var UNAUTHORIZATION_SIZE = '50px';
        var ERROR_CODE_UNAUTHORIZATION = 7;
        var ERROR_CODE_INVALID_EVERNOTE_TOKEN = 7;
        self.notes = ko.observableArray([]);
        self.error = ko.observable(null)
        $.ajaxSetup({
            cache: false
        });
        $.getJSON("/rest/related/"+ KIJI_ID +"?max_count=2", function(data){
            if (data.status == "success") {
                if (data.notes.length > 0) {
                    for (var i in data.notes) {
                        var v = data.notes[i];
                        var newDate = new Date();
                        newDate.setTime(parseInt(v.updated));
                        v.created_date = newDate.toLocaleDateString();
                        self.notes.push(v)
                    }
                    if (data.notes.length == 1) {
                        postMessage(SUCCESS_1_SIZE, '*');
                    } else {
                        postMessage(SUCCESS_2_SIZE, '*');
                    }
                } else {
                    self.error({'message': "関連するノートがありません"});
                    postMessage(ERROR_SIZE, '*');
                }
            } else if (data.status == 'warning' && data.error_code == ERROR_CODE_UNAUTHORIZATION){
                postMessage(UNAUTHORIZATION_SIZE, '*');
            } else if (data.status == 'warning' && data.error_code == ERROR_CODE_INVALID_EVERNOTE_TOKEN){
                postMessage(UNAUTHORIZATION_SIZE, '*');
                $.get("/auth/logout", function() {
                    window.location.reload();
                });
            } else {
                self.error({'message': data.message ? data.message : "エラーが発生しました"});
                postMessage(ERROR_SIZE, '*');
            }
            loading.hide();
        }).error(function(jqXHR, textStatus, errorThrown) {
            postMessage(ERROR_SIZE, '*');
            try {
                var error = JSON.parse(jqXHR.responseText);
                self.error({'message': error.message ? error.message : "エラーが発生しました"});
            } catch(e){
                self.error({'message': "エラーが発生しました"});
            }
            loading.hide();
        });
    };
    ko.applyBindings(new NotesViewModel());
});
