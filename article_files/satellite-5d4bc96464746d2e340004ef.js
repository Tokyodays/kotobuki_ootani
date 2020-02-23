var gHead = document.getElementsByTagName("head")[0];
var gScript = document.createElement("script");
gScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-142388021-1";
gScript.onload = function(){
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  	function gtag(){dataLayer.push({'event': 'setAtlasId'});}
};
gHead.appendChild(gScript);