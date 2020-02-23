<!--
/* NIKKEI_ID SerialID customize */
//cookie NIKKEI_ID serialID puts into prop13 instead of NikkeiID_code.
	cklng = document.cookie.length;
	ckary = document.cookie.split("; ");
	ckstr = "";

	i = 0;
	while (ckary[i]){
		if (ckary[i].substr(0,18) == "NID-Serial-Cookie="){
			ckstr = ckary[i].substr(18,ckary[i].length);
			break;
		}
		i++;
	}

	prop13=ckstr;

/* You may give each page an identifying name, server, and channel on
the next lines. */
pageName=pageName.replace("%20"," ")
pageName=pageName.replace(/index.(html|aspx|cfm|asp|php|jsp|htm|htmr|cfr|aspr)$/,"")
s.pageName=pageName
s.server=server

/* REFER customize */
if(window.location.search.length > 1 && location.href.indexOf("/r123") > 0 && location.href.indexOf("ak=") > 0)
{
    var query = window.location.search.substring( 1 );
    var parameters = query.split( '&' );
    var result = new Object();
    for( var i = 0; i < parameters.length; i++ )
    {
        var element = parameters[ i ].split( '=' );
        var paramName = decodeURIComponent( element[ 0 ] );
        var paramValue = decodeURIComponent( element[ 1 ] );
        result[ paramName ] = decodeURIComponent( paramValue );
    }

	var strTMP = result[ 'ak' ];
	strTMP=strTMP.replace("%2F","/");
	strTMP=strTMP.replace("%23","#");
	strTMP=strTMP.replace("%3A",":");

	prop43=strTMP;

}

s.channel=channel
s.pageType=pageType
if(typeof(prop1) == "undefined") { s.prop1="" } else { s.prop1=prop1 }
if(typeof(prop2) == "undefined") { s.prop2="" } else { s.prop2=prop2 }
if(typeof(prop3) == "undefined") { s.prop3="" } else { s.prop3=prop3 }
if(typeof(prop4) == "undefined") { s.prop4="" } else { s.prop4=prop4 }
if(typeof(prop5) == "undefined") { s.prop5="" } else { s.prop5=prop5 }
if(typeof(prop6) == "undefined") { s.prop6="" } else { s.prop6=String(prop6) }
s.prop7=s.pageName
if(typeof(prop8) == "undefined") { s.prop8="" } else { s.prop8=prop8 }
if(typeof(prop9) == "undefined") { s.prop9="" } else { s.prop9=prop9 }
if(typeof(prop10) == "undefined") { s.prop10="" } else { s.prop10=prop10 }
if(typeof(prop11) == "undefined") { s.prop11="" } else { s.prop11=prop11 }
if(typeof(prop12) == "undefined") { s.prop12="" } else { s.prop12=prop12 }
if(typeof(prop13) == "undefined") { s.prop13="" } else { s.prop13=prop13 }
if(typeof(prop14) == "undefined") { s.prop14="" } else { s.prop14=prop14 }
if(typeof(prop15) == "undefined") { s.prop15="" } else { s.prop15=prop15 }
if(typeof(prop16) == "undefined") { s.prop16="" } else { s.prop16=prop16 }
if(typeof(prop17) == "undefined") { s.prop17="" } else { s.prop17=prop17 }
if(typeof(prop18) == "undefined") { s.prop18="" } else { s.prop18=prop18 }
if(typeof(prop19) == "undefined") { s.prop19="" } else { s.prop19=prop19 }
if(typeof(prop20) == "undefined") { s.prop20="" } else { s.prop20=prop20 }
if(typeof(prop21) == "undefined") { s.prop21="" } else { s.prop21=prop21 }
if(typeof(prop22) == "undefined") { s.prop22="" } else { s.prop22=prop22 }
if(typeof(prop23) == "undefined") { s.prop23="" } else { s.prop23=prop23 }
if(typeof(prop24) == "undefined") { s.prop24="" } else { s.prop24=prop24 }
if(typeof(prop25) == "undefined") { s.prop25="" } else { s.prop25=prop25 }
if(typeof(prop26) == "undefined") { s.prop26="" } else { s.prop26=prop26 }
if(typeof(prop27) == "undefined") { s.prop27="" } else { s.prop27=prop27 }
if(typeof(prop28) == "undefined") { s.prop28="" } else { s.prop28=prop28 }
if(typeof(prop29) == "undefined") { s.prop29="" } else { s.prop29=prop29 }
if(typeof(prop30) == "undefined") { s.prop30="" } else { s.prop30=prop30 }
if(typeof(prop31) == "undefined") { s.prop31="" } else { s.prop31=prop31 }
if(typeof(prop32) == "undefined") { s.prop32="" } else { s.prop32=prop32 }
if(typeof(prop33) == "undefined") { s.prop33="" } else { s.prop33=prop33 }
if(typeof(prop34) == "undefined") { s.prop34="" } else { s.prop34=prop34 }
if(typeof(prop35) == "undefined") { s.prop35="" } else { s.prop35=prop35 }
if(typeof(prop36) == "undefined") { s.prop36="" } else { s.prop36=prop36 }
if(typeof(prop37) == "undefined") { s.prop37="" } else { s.prop37=prop37 }
if(typeof(prop38) == "undefined") { s.prop38="" } else { s.prop38=prop38 }
if(typeof(prop39) == "undefined") { s.prop39="" } else { s.prop39=prop39 }
if(typeof(prop40) == "undefined") { s.prop40="" } else { s.prop40=prop40 }
if(typeof(prop41) == "undefined") { s.prop41="" } else { s.prop41=prop41 }
if(typeof(prop42) == "undefined") { s.prop42="" } else { s.prop42=prop42 }
if(typeof(prop43) == "undefined") { s.prop43="" } else { s.prop43=prop43 }
if(typeof(prop44) == "undefined") { s.prop44="" } else { s.prop44=prop44 }
if(typeof(prop45) == "undefined") { s.prop45="" } else { s.prop45=prop45 }
if(typeof(prop46) == "undefined") { s.prop46="" } else { s.prop46=prop46 }
if(typeof(prop47) == "undefined") { s.prop47="" } else { s.prop47=prop47 }
if(typeof(prop48) == "undefined") { s.prop48="" } else { s.prop48=prop48 }
if(typeof(prop49) == "undefined") { s.prop49="" } else { s.prop49=prop49 }
if(typeof(prop50) == "undefined") { s.prop50="" } else { s.prop50=prop50 }

/* E-commerce Variables */
s.campaign=""
s.state=""
s.zip=""
if(typeof(events) == "undefined") { s.events="event1" } else { s.events=events }
if(typeof(products) == "undefined") { s.products="" } else { s.products=products }
if(typeof(purchaseID) == "undefined") { s.purchaseID="" } else { s.purchaseID=purchaseID }
s.eVar1=pageName
if(typeof(sKeyword) == "undefined") { s.eVar2="" } else { s.eVar2=sKeyword }
if(typeof(sKeyword_stock) == "undefined") { s.eVar3="" } else { s.eVar3=sKeyword_stock }
if(typeof(eVar4) == "undefined") { s.eVar4="" } else { s.eVar4=eVar4 }
if(typeof(sKeywordEvar5) == "undefined") { s.eVar5="" } else { s.eVar5=sKeywordEvar5 }
if(typeof(eVar6) == "undefined") { s.eVar6="" } else { s.eVar6=eVar6 }
if(typeof(eVar7) == "undefined") { s.eVar7="" } else { s.eVar7=eVar7 }
if(typeof(eVar8) == "undefined") { s.eVar8="" } else { s.eVar8=eVar8 }
if(typeof(eVar9) == "undefined") { s.eVar9="" } else { s.eVar9=eVar9 }
if(typeof(eVar10) == "undefined") { s.eVar10="" } else { s.eVar10=eVar10 }
if(typeof(eVar11) == "undefined") { s.eVar11="" } else { s.eVar11=eVar11 }
if(typeof(eVar21) == "undefined") { s.eVar21="" } else { s.eVar21=eVar21 }
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code)//-->