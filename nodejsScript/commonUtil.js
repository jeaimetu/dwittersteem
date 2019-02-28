exports.isEmpty = function(obj){
	if ( undefined == obj || null == obj || "" == obj )
		return true;
	else
		return false;
}

exports.timeConverter = function(timestamp){
	//UTC+9  한국시간 적용
	  // 9시간  / 540분
	  var a = new Date( timestamp+ (540*60*1000) );
	  //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month	= fnZeroAdd(a.getMonth()+1 );
	  var date	= fnZeroAdd(a.getDate()    );
	  var hour	= fnZeroAdd(a.getHours()   );
	  var min	= fnZeroAdd(a.getMinutes() );
	  var sec	= fnZeroAdd(a.getSeconds() );
	  //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  
	  var time = year + '-' + month + '-' + date + ' ' 
			  + hour + ':' + min + ':' + sec ;
	  return time;
}

function fnZeroAdd(str){
	return String(str).length==1?"0"+str:str;
}
