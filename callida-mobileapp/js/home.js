function onHomePageShown() {
	
	var home = $('#home');
	
	if(!home.hasClass('initialized')) {
	
		var w = $(window).width();
		var h = $(window).height();
			
		//other elements should be constant height
		
		var hb = $('#home-body');

		var header = $('#main-header').outerHeight();
			
		hb.css('height', ( h - header ) + 'px');
			
				
		home.addClass('initialized');
		
		$('#home-next-button').on('tap', function(){
			
			navigateTo('select-building');
			
		});
		
	}
	
}


function navigateTo(newId) {
	
	var current = $(".ui-page-active").attr('id');
	
	if(current == newId) return;
	
	var currentIndex = -1;
	
	var newIdIndex = -1;
	
	var btn = null;
	
	$('#main-header .ui-btn').each(function(index){
		var $this = $(this);
		var hr = $this.attr('href').substring(1);
		if(hr == current) {
			currentIndex = index;
		} else if(hr == newId) {
			newIdIndex = index;
			btn = $this;
		}
	});	
	
	btn.addClass('ui-btn-active');
	
	console.log("TAP, current: " + current + " " + currentIndex + ", new: " + newId + " " + newIdIndex);
	
//	var rev = currentIndex > newIdIndex ? "reverse " : "";
	//$.mobile.navigate( '#' + newId, { transition : rev + "slide", changeHash:false } );
	
	var reverse = currentIndex > newIdIndex;
	
	$.mobile.changePage( '#' + newId, { changeHash: false, reverse: reverse, transition: 'slide'});
	
}