
/*!
 * This script is merely to test if adding scripts via the plist will work in Preview mode
 * Date: Sat Feb 18 2012
 */
 
jQuery(document).ready(function(jQuery){
	jQuery('#page-top').wrap('<div class="topbar"></div>');
	jQuery('#page-container').append('<div class="clearer"></div>');
	jQuery('#feed ul li span').addClass('tweetContent');
	jQuery('#feed ul li a').addClass(function() { return $(this).attr('title'); });
	jQuery('<div class="clear" />').insertAfter('#feed ul li a.Tweet');
		
	
	jQuery('<div class="clear"></div>').insertAfter('#main');
	if (jQuery('body.has-custom-banner').length){
		jQuery('.topbar').append('<div class="outBanner"><div class="inBanner"><div class="shadow"></div><div class="banner"></div></div></div>'); 
		 
	}	
	else if (jQuery('body.no-custom-banner').length)
	{
		jQuery('.banner').remove();	
	}
	
	jQuery('body.has-custom-banner .topbar .outBanner .inBanner .banner').addClass('sixteen scale-with-grid');
	jQuery('body.has-custom-banner #sitemenu-container').addClass('hasBanner');
	jQuery('body.no-custom-banner #sitemenu-container').addClass('noBanner');
	
	
	
});


