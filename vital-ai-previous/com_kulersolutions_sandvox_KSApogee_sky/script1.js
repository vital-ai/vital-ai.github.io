


jQuery(document).ready(function(jQuery){	
	
	jQuery('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">');
	

	jQuery("#sitemenu h2.hidden, #sidebar-content h3.hidden, #page-bottom-contents .hidden").remove();
	jQuery('<div style="clear:both;"></div>').insertAfter('#sitemenu-container');
	
	if (jQuery('#myExtraContent1').length){
		jQuery('<div id="extraContainer1"></div>').insertAfter('.clear.below-content');		
	}	
	jQuery('#myExtraContent1').appendTo('#extraContainer1');
	jQuery('<div style="clear:both;"></div>').insertAfter('#myExtraContent1');
	
	if (jQuery('#mySocialLinks').length){	
		jQuery('#page-top').prepend('<div id="socialDiv"></div>');	
	}
	jQuery('#mySocialLinks').appendTo('#socialDiv');
	
	if (jQuery('#feed').length){
		jQuery('<div class="feed_top"></div>').insertBefore('#feed');
		jQuery('<div class="feed_bottom"></div>').insertAfter('#feed');
	}
	
});

jQuery(function(jQuery) {
 jQuery('#ddsmoothmenu').remove();
 // Changes the name of the default menu container to prevent the built-in script from trying to activate
 
 jQuery("#sitemenu-content").attr("id", "main-nav"); 
 jQuery('#main-nav ul').attr('id', 'main-nav-menu');
 jQuery('#main-nav ul').addClass('nav-menu sixteen');
 jQuery('#main-nav ul ul').removeClass('nav-menu sixteen');
 jQuery('#main-nav').addClass('sixteen omega');
 jQuery('#main-nav').removeClass('ddsmoothmenu');
 jQuery('.photogrid-index .gridItem').addClass('one');
 jQuery('.photogrid-index .gridItem a img').addClass('scale-with-grid');
 
 jQuery('<a href="#main-nav-menu" class="mobileNavTab button">+ Menu</a>').insertBefore('#main-nav');
 
 jQuery('#main-nav ul li ul').addClass('navSub');
 jQuery('#main-nav ul li ul').removeClass('isSubMenu');
 
 jQuery('#main-nav ul > li > ul').parents('li').attr("class", "parent");
 jQuery('#main-nav ul > li.parent').prepend('<span class="subIndicator"></span>');
 jQuery("#main-nav ul li ul li .subIndicator").remove();
 jQuery('#main-nav ul > li.parent').hover(function() {
   jQuery('.subIndicator').addClass('pretty-hover');
 }, function() {
   jQuery('.subIndicator').removeClass('pretty-hover');
 });
});

function init_connect() {
	var full_width = 0;
	var b_width = 0;
	var flag = true;
	
	jQuery('#connect_social a').each(function() {
		var mar = parseInt(jQuery(this).css('margin-left'));
		full_width = full_width + mar + jQuery(this).width();
	});
	
	jQuery('#connect_social .inner').css({'width' : full_width + 'px'});
	full_width = jQuery('#connect_social .inner').outerWidth();
	
	jQuery('a.lnk_connect').live('click', function() {
		if(flag) {
			flag = false;
			b_width = (jQuery('#connect_social').hasClass('opened')) ? 1 : full_width;
			jQuery('#connect_social').animate({
					width : b_width
				},
				300,
				function() {
					flag = true;
					jQuery('#connect_social').toggleClass('opened');
				}
			);
		}
	});
}

jQuery(document).ready(function() {
	init_connect();
	
	jQuery('.block_show_code a').live('click' , function(e){
		jQuery(this).parent().toggleClass('expanded');
		jQuery(this).parent().next().slideToggle();
		
		e.preventDefault();
	});
	
	
});

(function(a){a.fn.slideto=function(b){var c={slide_duration:"slow",highlight_duration:3e3,highlight:!0,highlight_color:"#FFFF99",offset:0},b=a.extend(c,b);return this.each(function(){var c=!1;obj=a(this),a("html,body").animate({scrollTop:obj.offset().top+b.offset},b.slide_duration,function(){c==0&&(b.highlight&&a.ui.version&&obj.effect("highlight",{color:b.highlight_color},b.highlight_duration),c=!0)})})}})(jQuery);

