cX.callQueue.push(["invoke",function(){cxAddCP()}]);cX.callQueue.push(["invoke",function(){cxSendPV()}]);if(!document.querySelector("p.m-articleRegist_countText,p.m-articleRegist_text")){cX.callQueue.push(["invoke",function(){cXcustom("scrollDepth3",cxj_dmp_params,1,"div.cmn-article_text")}])}function cxAddCP(){var cx_status;if(location.pathname==="/"){var user_info_base64=cX.getCookie("RNikkeiUserInfo");if(user_info_base64&&window.atob){try{var user_info=JSON.parse(window.atob(user_info_base64));if(user_info.ds_rank==="DSR3"){cx_status="有料会員"}else if(user_info.ds_rank==="DSR2"){cx_status="無料会員"}}catch(e){}}}else{var ds_s=cX.getCookie("NK_DS_S");var ds_r3=cX.getCookie("NK_DS_R3");if(ds_s){if(ds_r3){cx_status="有料会員"}else{cx_status="無料会員"}}}if(cx_status){cX.setCustomParameters({status:cx_status})}var cx_eu=cX.getCookie("NID-Serial-Cookie");if(cx_eu){cX.addExternalId({id:cx_eu,type:cx_args.prefix})}}
//# sourceMappingURL=www.nikkei.com.js.map