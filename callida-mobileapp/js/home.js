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
		
		$('#home-next-button').click(function(){
			
			$.mobile.navigate( '#select-building', {});
			
		});
		
	}
	
}