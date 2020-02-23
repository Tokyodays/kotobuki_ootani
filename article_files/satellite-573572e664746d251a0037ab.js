_satellite.pushAsyncScript(function(event, target, $variables){
  if(typeof visitor !== "undefined" && typeof prop13 !== "undefined" ){
  visitor.setCustomerIDs({
		"dsid":prop13
	});
}


});
