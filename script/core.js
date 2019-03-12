
		$(function(){
			//gfGetUserInfo();
			//gfContentList();
			//시스템 기본 색상 
			//00548e
		});
		function fnContentList(page){
			if (-2 == page){
				$('#frmRead #page').val( Number($('#frmRead #page').val()) - 1);
			}else{
				$('#frmRead #page').val( Number($('#frmRead #page').val()) + 1);
			}
			//$('#frmRead #page').val(page);
			$("#frmRead").attr("action", "/");
			$('#frmRead').submit();
		}
		
		function fnLoginChkContentInsert(){
			var fnCallback = fnLoginChkContentInsertCallback;
			gfIsLoginAction(fnCallback);
		}
		//일반 글쓰기
		function fnLoginChkContentInsertCallback(data){
			if ( "true" == data.result ){
				gfImageBoxEmpty();
				$("#myModal").modal("show");
			}else{
				alert("로그인 후 사용하세요.");
			}
		}
		
		//로그인 체크 후 팝업
		function fnLoginChkContentDetailAction(type, idx){
			console.log("fnLoginChkContentDetailAction type idx", type, idx);
			$("#frmTemp #postid").val(idx);
			var fnCallback;
			if ( 0 == type ){
				fnCallback = fnLoginChkContentReplyInsertCallback;
			}else if ( 1 == type ){
				fnCallback = fnLoginChkContentDetailInsertCallback;
			}else if ( 2 == type ){
				fnCallback = fnLoginChkContentDetailUpdateCallback;
			}
			
			gfIsLoginAction(fnCallback);
		}
		
		//일반 댓글쓰기 팝업
		function fnLoginChkContentReplyInsertCallback(data){
			console.log("fnLoginChkContentReplyInsertCallback", data.result);
			var idx = $("#frmTemp #postid").val();
			if ( "true" == data.result ){
				$("#contentReplyTextarea").val("");
				gfImageBoxEmpty();
				if($("input[name='hBoardParentId']").eq(idx).val() == ""){
					$("#frmReply #parentid").val($("input[name='hBoardId']").eq(idx).val());
				}else{
					$("#frmReply #parentid").val($("input[name='hBoardParentId']").eq(idx).val());
				}
				$("#frmReply #account").val($("input[name='hAccount']").eq(idx).val());
				$("#popupContentReplyInsert").modal("show");							
				
			}else{
				alert("로그인 후 사용하세요.");
			}
		}
		
		//상세 댓글쓰기 팝업
		function fnLoginChkContentDetailInsertCallback(data){
			var idx = $("#frmTemp #postid").val();
			if ( "true" == data.result ){
				$("#contentDetailReplyTextarea").val("");
				gfImageBoxEmpty();
				$("#frmReply #parentid").val($("input[name='hBoardId']").eq(idx).val());
				$("#frmReply #account").val($("input[name='hAccount']").eq(idx).val());
				$("#popupContentDetail").modal("hide");
				$("#popupContentDetailReplyInsert").modal("show");
				
			}else{
				alert("로그인 후 사용하세요.");
			}
		}
		
		//상세 댓글수정 팝업
		function fnLoginChkContentDetailUpdateCallback(data){
			var idx = $("#frmTemp #postid").val();
			if ( "true" == data.result ){
				gfImageBoxEmpty();
				var tagImg =  $("div[name='viewDefault']").eq(idx).find("img");
				var len = tagImg.length;
				
				for ( var x = 0 ; x < len ; x++ ){
					var strRep = tagImg.eq(x).attr("src").replace("/image/upload/","/image/upload/c_limit,h_60,w_90/");
					var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + strRep + '"/>'
								+ '<input type="hidden" name="imgUrl" value="' + tagImg.eq(x).attr("src") + '" />';
					$("#imgListContentDetailUpdate").append(strHtml);
				}
				
				$("#contentDetailReplyUpdateTextarea").val($("div[name='viewDefault']").eq(idx).text());
				
				$("#frmReplyUpdate #postid").val($("input[name='hBoardId']").eq(idx).val());
				//$("#frmReply #account").val($("input[name='hAccount']").eq(idx).val());
				$("#popupContentDetail").modal("hide");
				$("#popupContentDetailReplyUpdate").modal("show");
				
			}else{
				alert("로그인 후 사용하세요.");
			}
		}
		
		function fnContentImagePopup(idx){
			var param = {	cloud_name: 'hgnmrexj6'
							, upload_preset: 'lnv4zcoi'
							, sources : [ "local", "url"]
				};
			var fnCallback;
			if ( 1 == idx ){
				fnCallback = fnContentWriteImagePopupCallback;
			}else if ( 2 == idx ){
				fnCallback = fnContentEditImagePopupCallback;
			}else if ( 3 == idx ){
				fnCallback = fnContentReplyImagePopupCallback;
			}else if ( 4 == idx ){
				fnCallback = fnContentDetailReplyInsertImagePopupCallback;
			}else if ( 5 == idx ){
				fnCallback = fnContentDetailReplyUpdateImagePopupCallback;
			}		
			console.log(fnCallback);
			cloudinary.openUploadWidget( param, fnCallback );
		}
		function fnContentWriteImagePopupCallback( error, result ){
			console.log("fnContentWriteImagePopupCallback called");
			if ( null != error ){
				console.log("cloudinary error", error);
				return ;
			}
			for ( var x = 0 ; x < result.length ; x++ ){
				var splitArray = result[x].secure_url.split("/image/upload/");
				var url = splitArray[0] + "/image/upload/c_limit,h_"+ result[x].height +",w_"+ result[x].width +"/" + splitArray[1];
				var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + result[x].thumbnail_url + '"/>'
							+ '<input type="hidden" name="imgUrl" value="' + url + '" />';
							console.log("adding", strHtml);
				$("#imgListContentInsert").append(strHtml);
			}
		}
		function fnContentEditImagePopupCallback( error, result ){
			if ( null != error ){
				return ;
			}
			for ( var x = 0 ; x < result.length ; x++ ){
				var splitArray = result[x].secure_url.split("/image/upload/");
				var url = splitArray[0] + "/image/upload/c_limit,h_"+ result[x].height +",w_"+ result[x].width +"/" + splitArray[1];
				var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + result[x].thumbnail_url + '"/>'
							+ '<input type="hidden" name="imgUrl" value="' + url + '" />';
				$("#imgListContentUpdate").append(strHtml);
			}
		}
		function fnContentReplyImagePopupCallback( error, result ){
			if ( null != error ){
				return ;
			}
			for ( var x = 0 ; x < result.length ; x++ ){
				var splitArray = result[x].secure_url.split("/image/upload/");
				var url = splitArray[0] + "/image/upload/c_limit,h_"+ result[x].height +",w_"+ result[x].width +"/" + splitArray[1];
				var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + result[x].thumbnail_url + '"/>'
							+ '<input type="hidden" name="imgUrl" value="' + url + '" />';
				$("#imgListContentReplyInsert").append(strHtml);
			}
		}
		function fnContentDetailReplyInsertImagePopupCallback( error, result ){
			if ( null != error ){
				return ;
			}
			for ( var x = 0 ; x < result.length ; x++ ){
				var splitArray = result[x].secure_url.split("/image/upload/");
				var url = splitArray[0] + "/image/upload/c_limit,h_"+ result[x].height +",w_"+ result[x].width +"/" + splitArray[1];
				var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + result[x].thumbnail_url + '"/>'
							+ '<input type="hidden" name="imgUrl" value="' + url + '" />';
				$("#imgListContentDetailInsert").append(strHtml);
			}
		}
		function fnContentDetailReplyUpdateImagePopupCallback( error, result ){
			if ( null != error ){
				return ;
			}
			for ( var x = 0 ; x < result.length ; x++ ){
				var splitArray = result[x].secure_url.split("/image/upload/");
				var url = splitArray[0] + "/image/upload/c_limit,h_"+ result[x].height +",w_"+ result[x].width +"/" + splitArray[1];
				var strHtml = '<img name="imgThumbNail" onClick="javascript:fnImageDelete(this);" style="width: auto; display: inline-block; padding: 2px;" src="' + result[x].thumbnail_url + '"/>'
							+ '<input type="hidden" name="imgUrl" value="' + url + '" />';
				$("#imgListContentDetailUpdate").append(strHtml);
			}
		}
		function fnImageDelete(obj){
			var imgArray = $("img[name='imgThumbNail']");
			var hideArray = $("input[name='imgUrl']");
			var idx = imgArray.index(obj);
			imgArray.eq(idx).remove();
			hideArray.eq(idx).remove();
		}
		
		//목록댓글
		function fnContentReplyInsertAction(){
			
			if ( '' == $("#contentReplyTextarea").val().trim() ){
				alert("댓글이 공백입니다.");
				return;
			}
			var strText = '@' + $("#frmReply #account").val() + ' ' + $("#contentReplyTextarea").val();
			var strImg = "";
			var len = $("input[name='imgUrl']").length;
			
			for ( var x = 0 ; x < len ; x++ ){
				strImg += '<img src="' + $("input[name='imgUrl']").eq(x).val() + '" />';
			}
			$("#frmReply #data").val( strText + strImg );
			
			var sAction = "/addreply";
			var fnCallback = fnContentReplyInsertActionCallback;
			gfAjaxCallWithForm(sAction,$('#frmReply'),fnCallback,"POST");
		}
		function fnContentReplyInsertActionCallback(data){
			if ( "success" == data ){
				//alert("댓글작성을 하였습니다");
				fnContentDetailPopup($("#frmTemp #postid").val());
				//gfContentList();
			}else{
				alert("댓글작성 실패");
			}
		}
		
		//상세댓글 작성 액션
		function fnContentDetailReplyInsertAction(){
			
			if ( '' == $("#contentDetailReplyTextarea").val().trim() ){
				alert("댓글이 공백입니다.");
				return;
			}
			var strText = '@' + $("#frmReply #account").val() + ' ' + $("#contentDetailReplyTextarea").val();
			var strImg = "";
			var len = $("input[name='imgUrl']").length;
			
			for ( var x = 0 ; x < len ; x++ ){
				strImg += '<img src="' + $("input[name='imgUrl']").eq(x).val() + '" />';
			}
			$("#frmReply #data").val( strText + strImg );
			
			var sAction = "/addreply";
			var fnCallback = fnContentDetailReplyInsertActionCallback;
			gfAjaxCallWithForm(sAction,$('#frmReply'),fnCallback,"POST");
		}
		function fnContentDetailReplyInsertActionCallback(data){
			if ( "success" == data ){
				//alert("댓글작성을 하였습니다");
				$("#popupContentData").empty();
				var sAction = "/readdetailpage";
				var fnCallback = fnContentDetailPopupCallback;
				gfAjaxCallWithForm(sAction,$('#frmDetail'),fnCallback,"POST");
				fnContentDetailPopupOpen();
				
			}else{
				alert("댓글작성 실패");
			}
		}
		
		//상세댓글 수정 액션
		function fnContentDetailReplyUpdateAction(){
			if ( '' == $("#contentDetailReplyUpdateTextarea").val().trim() ){
				alert("댓글이 공백입니다.");
				return;
			}
			var strText = $("#contentDetailReplyUpdateTextarea").val();
			var strImg = "";
			var len = $("input[name='imgUrl']").length;
			
			for ( var x = 0 ; x < len ; x++ ){
				strImg += '<img src="' + $("input[name='imgUrl']").eq(x).val() + '" />';
			}
			$("#frmReplyUpdate #data").val( strText + strImg );
			var sAction = "/edit";
			var fnCallback = fnContentDetailReplyUpdateActionCallback;
			gfAjaxCallWithForm(sAction,$('#frmReplyUpdate'),fnCallback,"POST");				
			
		}
		function fnContentDetailReplyUpdateActionCallback(data){
			if ( "success" == data ){
				//alert("댓글작성을 하였습니다");
				
				var hBoardId = $("#frmReplyUpdate #postid").val();
				if ( 1 < $("input[name='hBoardId'][value='" + hBoardId + "']").length ){
					var idx = $("input[name='hBoardId']").index($("input[name='hBoardId'][value='" + hBoardId + "']").eq(0));
					$("div[name='viewDefault']").eq(idx).text($("#frmReplyUpdate #data").val());
				} 
				
				$("#popupContentData").empty();
				var sAction = "/readdetailpage";
				var fnCallback = fnContentDetailPopupCallback;
				gfAjaxCallWithForm(sAction,$('#frmDetail'),fnCallback,"POST");
				fnContentDetailPopupOpen();
				
			}else{
				alert("댓글수정 실패");
			}
		}
		
		function fnContentDetailPopup(idx){
			var postId = $("input[name='hBoardParentId']").eq(idx).val()
			if ( "" == postId ){
				postId = $("input[name='hBoardId']").eq(idx).val();
			}
			$("#frmDetail").attr("action", "/contentDetail");
			$("#frmDetail #postid").val(postId);
			$('#frmDetail').submit();
			
			
		}
		function fnContentDetailPopupCallback(data){
			var arrCnt = $("input[name='hBoardId']").length;
			for ( var x = 0 ; x < data.length ; x++ ){
				
				var btnVoteEnable = "";
				if ( undefined != data[x].votingenable  && "false" == data[x].votingenable ){
					btnVoteEnable = "disabled";
				}
				
				var strProfile = (data[x].profile == null) ? "" : data[x].profile ;
				var profilePath = (strProfile.length == 5) ? "./images/user/" + strProfile : strProfile;
				
				var editBtn = '';
				var replyBtn = '';
				if ( $("#frmUserInfo #id").val() == data[x].account ){
					editBtn = '	<button type="button" name="btnUpdate" class="btn btn-outline-light text-dark" onClick="javascript:fnLoginChkContentDetailAction(2, ' + (x+arrCnt) + ');" ><i class="fa fa-edit"></i></button>';
				}
				if ( 0 == x ) {
					replyBtn = '	<button type="button" name="btnDetail"  class="btn btn-outline-light text-dark" onClick="javascript:fnLoginChkContentDetailAction(1, ' + (x+arrCnt) + ');" ><i class="fa fa-commenting-o"></i></button>';
				}
				
				var strHtml	= '<div class="element tile-reply home calc bg-change">'
							+ '	<table style="width: 100%;">'
							+ '		<tr>'
							+ '			<td>'
							+ '				<h4 class="header icon-to-the-right">' + data[x].account + '</h4>'
//							+ '				<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Tooltip on bottom" aria-describedby="tooltip113771">Bottom</button>'
							+ '			</td>'
							+ '			<td  style="text-align:right; margin: 0px;" onClick="javascript:gfFollowPopup(' + (x+arrCnt) + ');">'
							+ '				<img name="userImage" style="padding: 0px 0px 0px 0px; display: inline; max-height: 40px; max-width: 40px;" src="' + profilePath + '">'
							+ '			</td>'
							+ '		</tr>'
							+ '	</table>'
							+ '	<div name="viewDefault" onClick="javascript:fnContentDetailPopupClose();" class="preConDetail">' + data[x].data + '</div>'
							+ '	<div style="margin: 5px;"></div>'
							+ '	<div class="hint" name="createTime">'+ timeConverter(data[x].date) + '</div>'
							+ '	<div style="margin: 5px;"></div>'
							
							+ '	<button type="button" name="btnVote" ' + btnVoteEnable +  '  class="btn btn-outline-light text-dark" onClick="javascript:gfContentVoteAction(\''+ data[x].id + '\');" ><i name="viewVoteCount"  class="fa fa-thumbs-o-up"> ' + data[x].voting + '</i></button>'
							+ editBtn
							//+ '	<button type="button" name="btnDetail" style="width:20%;" class="btn btn-outline-light text-dark" onClick="javascript:fnContentDetail(' + x + ');" ><i class="fa fa-folder-open"></i></button>'
							+ replyBtn
							
							+ '	<input type="hidden" name="hBoardId" value="' + data[x].id + '" >'
							+ '	<input type="hidden" name="hVoteCnt" value="' + data[x].voting + '" >'
							+ '	<input type="hidden" name="hAccount" value="' + data[x].account + '" >'
							+ '</div>';
				
				$("#popupContentData").append(strHtml);
				/*
				var obj = $("div[name='viewDefault']").eq(x);
				if ( gfTextOverCheck(obj) ){
					$("button[name='btnDetail']").eq(x).show();
				}
				*/
			}				
		}
		
		
		//글쓰기 팝업닫기 
		function fnContentDetailPopupClose(){
			$("#popupContentDetail").modal("hide");
		}
		
		//상세 팝업열기
		function fnContentDetailPopupOpen(){
			$("#popupContentDetail").modal("show");
		}
		
		//상세 댓글 쓰기 취소
		function fnContentDetailReplyInsertPopupClose(){
			$("#popupContentDetailReplyInsert").modal("hide");
			setTimeout("fnContentDetailPopupOpen()", 500); 
		}
		//상세 댓글 수정 취소
		function fnContentDetailReplyUpdatePopupClose(){
			$("#popupContentDetailReplyUpdate").modal("hide");
			setTimeout("fnContentDetailPopupOpen()", 500); 
		}
		
		
		/*
			사용안함?
		*/
		function fnContentDetailInsertCancel(){
			console.log("사용안함 CHk");
			$("#popupContentDetailReplyInsert").modal("hide");
		}
		function fnDetailReplyCancel(){
			console.log("사용안함 CHk");
			$("#popupReply").modal("hide");
			setTimeout("fnContentDetailPopupOpen()", 500);			
		}

