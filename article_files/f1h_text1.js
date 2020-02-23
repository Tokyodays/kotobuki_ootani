/* Json返却方式の第１テキスト広告出力 */
function dssv_f1h_text1_callback(data){

	try{
		/* dataの中身がある場合 */
		if(data[0]){

			/* 返却されたテキスト広告件数 */
			var length = data[0].creatives.length;
			/* 第１テキストの番号 */
			var j = 1;

			if(length > 0){

				/* 取得した広告の件数分処理 */
				for(var i = 0; i < length; i++){
				
					/* レスポンス値取得 */
					var link_url = data[0].creatives[i].image_click_url;
					var sub_title = data[0].creatives[i].body;
					
					/* レスポンスが取得できた場合、書替え処理 */
					if(link_url && sub_title){
					
						/* レスポンスからリンクタグの生成 */
						var link_tag = '<li><a href="'+ link_url + '" target="_blank">' + sub_title + '</a></li>';
						
						/* 第１テキスト表示領域取得 */
						var elem = "";
						var elem = document.getElementById("dssv_f1h_text1_" + j);

						/* 表示領域が存在するかチェック */
						if(elem == undefined){

							/* 表示領域が存在しない場合、次の存在する表示領域に書出す 
							 * 次の表示領域も存在しない場合は、最大で6件目の表示領域までチェックする
							 */
							for(var k=j+1 ; k <= 6; k++){

								/* 第１テキスト表示領域再取得 */
								elem = document.getElementById("dssv_f1h_text1_" + k);
							
								/* 再取得した表示領域が存在するかチェック */
								if(elem){
									/* 表示領域が存在した場合、書替え */
									$('#dssv_f1h_text1_' + k).after(link_tag);
									break;
								}
							}
							
							/* 表示する領域が見つからなかった場合、1件目表示領域に書き出し */
							if(document.getElementById("dssv_f1h_text1_1")){
								$('#dssv_f1h_text1_1').after(link_tag);
							}
						}else{
							/* 表示領域が存在する場合、書替え*/
							$('#dssv_f1h_text1_' + j).after(link_tag);
						}
					}
					/* インクリメント */
					j++;
				}
			}
		}
	}catch (e) {
		// no program
	}
};
