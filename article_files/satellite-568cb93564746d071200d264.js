var rt_tagctrl_flg = 0;
var rt_tagctrl_path = location.pathname.split("/");

if(rt_tagctrl_path[1] == "ds"){
	if(location.pathname.match(/^\/ds\/etc\/ds-paper.do|^\/ds\/etc\/w-paper.do/)){
		rt_tagctrl_flg = 1;
	}else if(rt_tagctrl_path[2] == "lp"){
		if(rt_tagctrl_path[3].match(/^bbc$|^tr$/)){
			rt_tagctrl_flg = 1;
		}
	}else if(rt_tagctrl_path[2] == "setup"){
		if(rt_tagctrl_path[3].match(/^subscribe$/)){
			rt_tagctrl_flg = 1;
		}
		if(location.pathname.match(/^\/ds\/setup\/subscribe\/kaiyaku\/charge\/attention.do/)){
			rt_tagctrl_flg = 2;
		}
	}else if(rt_tagctrl_path[2] == "signup"){
		if(rt_tagctrl_path[3].match(/^bbc$|^charge$|^free$|^tr$/)){
			rt_tagctrl_flg = 1;
		}
		if(location.pathname.match(/^\/ds\/signup\/charge\/card.do|^\/ds\/signup\/charge\/complete.do/)){
			rt_tagctrl_flg = 2;
		}
	}
}else if(rt_tagctrl_path[1] == "pk"){
	if(rt_tagctrl_path[2] == "setup"){
		rt_tagctrl_flg = 1;
	}else if(rt_tagctrl_path[2] == "signup"){
		if(rt_tagctrl_path[3] == "charge"){
			rt_tagctrl_flg = 1;
		}
	}
}else if(location.pathname.match(/^\/r123\/|^\/r123\/plan\/|^\/r123sp\//)){
	rt_tagctrl_flg = 1;
}else if(location.pathname.match(/^\/support\//)){
	rt_tagctrl_flg = 2;
}

if(rt_tagctrl_flg == 1){
	rt_tag_measure="";
	rt_tag_measure+="<"+"script type=\"text/javascript\"> \n";
	rt_tag_measure+="Rtoaster.init(\"RTA-11f6-2891c82c231b\",Rtoaster.Cookie.get(\"NID-Serial-Cookie\")); \n";
	rt_tag_measure+="Rtoaster.track(); \n";
	rt_tag_measure+="</"+"script> \n";
	rt_tag_measure+=" ";
	document.write(rt_tag_measure);
}
