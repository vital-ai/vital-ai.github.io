//window.addEventListener('onorientationchange', function () {
//	
//	var b = $('body');
//	
//	var t = '';
//	
//	alert('rotation: ' + window.orientation);
//	
//    if (window.orientation == -90) {
////        document.getElementById('orient').className = 'orientright';
//    	t = 'rotate(-90deg)';
//    }
//    if (window.orientation == 90) {
////        document.getElementById('orient').className = 'orientleft';
//    	t = 'rotate(90deg)';
//    }
//    if(window.orientation == 180) {
//    	t = 'rotate(180deg)';
//    }
//    if (window.orientation == 0) {
////        document.getElementById('orient').className = '';
//    }
//    
//    b.css('transform', t);
//    
//}, true);

$( window ).on( "orientationchange", function( event ) { 

	var t = '';
	
	alert(event.orientation + " - " + window.orientation);
	
	var o = window.orientation;
	
	if( o == 0) {
		
	} else if( o == 90 ) {
		
		t = 'rotate(-90deg)';
		
		
	} else if ( o == -90 ) {
	
		t = 'rotate(90deg)';
		
	} else {
		
	}
	
	$('body').css('transform', t);
	

} );