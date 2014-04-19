/*!
 * This script is merely to test if adding scripts via the plist will work in Preview mode
 * Date: Sat Feb 18 2012
 */
 
jQuery(document).ready(function(jQuery){
	jQuery('#page-top, #page-content, #page-bottom-contents').addClass('container');
	jQuery('#main').addClass('single columns');
	jQuery('#sidebar-container').addClass('five columns');
	jQuery('#main').attr('role', 'main');
	jQuery('#sidebar-container').insertAfter('#main');
	
	if (jQuery('body.no-sidebar').length){
		jQuery('#main').addClass('sixteen'); 
	}	
	else if (jQuery('body.allow-sidebar').length)
	{
		jQuery('#main').addClass('eleven'); 
			
	}
	
	
});

	
jQuery(document).ready(function($){

		
	/* DROP PANEL */
	$('#panelReveal, #panelCloser').click(function(e){
		e.preventDefault();
		$('#myExtraContent1').slideToggle();
		$('#panelCloser').toggleClass('reveal');		
	});	
		

	/* Style for JS-enabled */
	
	$('body').addClass('js-enabled');
	
	
	/* Keep track of the width for use in mobile browser displays */
	var currentWindowWidth = $(window).width();
	$(window).resize(function(){
		currentWindowWidth = $(window).width();
	});
	
	
	
	/* MOBILE MENU */
    $('.mobileNavTab').click(function(e){
    	e.preventDefault();
    	var $menu = $($(this).attr('href'));
    	$menu.toggleClass('menu-open'); //toggle()
    	
    	if(typeof $navClose !== 'undefined' && !$menu.hasClass('menu-open') ){
    		console.log('hide');
    		$navClose.hide();
    	}
    });
	

	
    
    //IPHONE, IPAD, IPOD
    var deviceAgent = navigator.userAgent.toLowerCase();    
	var is_iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
	
	if (is_iOS) {
        
        $('#main-nav').prepend('<a href="#" class="nav-close">&times;</a>'); // Close Submenu
        
        var $navClose = $('.nav-close');
        $navClose.hide().click(function(e){
        	e.preventDefault();
        	if(currentWindowWidth >= 767){
        		$(this).hide();
        	}
        });
		
        $('#main-nav > ul > li').hover(function(e){
        	e.preventDefault();
        	if(currentWindowWidth < 767){
        		$navClose.css({ 
        			top : $(this).position().top + 33,
        			left : 240,
        			right : ''
        		}).show();
        	}
        	else{
        		$navClose.css({
        			left : $(this).position().left + parseInt($(this).css('marginLeft')),
        			top : '',
        			right : 'auto'
        		}).show();
        	}
        });
              
	}

		
});



