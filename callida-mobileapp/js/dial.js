function onDialPageShown() {

	var cl = $('#comfort-level');
	
	if( ! cl.hasClass('initialized') ) {
		
		dial_initialize();
		
		cl.addClass('initialized');
		
	}
	
	
	
}

function dial_onPlaceChanged(event, place) {
	
	if($submitButton == null) return;
	
	dial_place = place;
	
	var label = $('#dial-selected-address');
	
	if(dial_place == null) {
		
		label.removeClass('selected').addClass('notselected');
		
		label.text(label.attr('data-default'));
		
		$submitButton.attr('disabled', 'disabled');
		
		
	} else {
		
		
		label.removeClass('notselected').addClass('selected');
		
		label.text(place.formatted_address);
		
		$submitButton.removeAttr('disabled');
		
		
		//new place ? 
		
	}
	
	if(event != null) {
		dial_locked = false;
		dial_refreshLock();
	}

	//always change the label?
	$submitButton.find('.inner').text('Submit');
	
	$submittedLabel.hide();
	
}

var $submitButton = null;
var $submitStatus = null;

var $circle = null;
var $innerC = null;
var dial_rad = null;
var dial_handler = null;
var PI2 = Math.PI/180;
var handlerW2 = null;
var $comfNumber = null;
var $comfLabel = null;
var $submittedLabel = null;

//3 variables that control the look of the dial
var dial_locked = false;
var dial_place = null;
//read the value from 
var dial_deg = null;
var dial_level = null;
var dial_comfort = null;

var dial_innerH = null; 

function dial_initialize() {
	
	dial_deg = appstate.getDialDeg();
	console.log("Initial dial deg value: " + dial_deg);
	
	$submitButton = $('#submit-button');
	$submitButton.on('tap', dial_onSubmitClicked);
	
	$submitStatus = $('#submit-status');
	
	var lastStatus = appstate.getLastSubmitStatus();
	if(lastStatus != null && lastStatus != '') {
		$submitStatus.text(lastStatus);
	} else {
		$submitStatus.html('&nbsp;');
	}
	
	
	dial_locked = appstate.getLockedFlag();
	
	//set the circles size now!
	
	var w = $(window).width();
	var h = $(window).height();
	
	//other elements should be constant height
	console.log("w: " + w + " h: " + h);
	
	var cl = $('#comfort-level');
	var clb = $('#comfort-level-body');
	
	var header = $('#main-header').outerHeight();
	
	var innerHeight = clb.outerHeight();
	
	console.log("header height: " + header);
	
	console.log("panel height: " + cl.height() + " outer: " + cl.outerHeight());
	
	console.log("inner panel height: " + clb.height() + " outer: " + clb.outerHeight());
	
	
	//create circle manually...

	var $height = (h - header - innerHeight - 90);
	
	var diff = 0;
	
	if(2 * $height > w - 50 ) {
		
		diff = $height - (w - 50)/2; 
		
		$height = (w - 50)/2;
		
	}

	
	//clb.append(
	$('<div>', {'id': 'circle'}).append(
			$('<div>', {'id': 'circle-left-arrow', 'class': 'circle-arrow'})
	).append(
			$('<div>', {'id': 'circle-right-arrow', 'class': 'circle-arrow'})
	).append(
			$('<div>', {'id': 'circle-too-warm', 'class': 'circle-label'}).text('too warm')
	).append(
			$('<div>', {'id': 'circle-too-cold', 'class': 'circle-label'}).text('too cold')
	).append(
			$('<div>', {'id': 'handler'}).text('')
	).append(
			$('<div>', {'id': 'inner-circle'}).append(
				$('<p>', {'id': 'comfort-number'}).text('')
			).append(
				$('<p>', {'id': 'comfort-label'}).text('')
			)
	).append(
			$('<div>', {'id': 'submitted-label'}).text('submitted').css('display', 'none')
	).insertBefore('#bottom-buttons');
	//);
	
	
//	<div id="circle">
//	<div id="handler">0</div>
//	<p id="test">0</p>
//</div>
	
	
	$circle = $('#circle');
	
	$innerC = $('#inner-circle');
	
	$comfNumber = $('#comfort-number');
	
	$comfLabel = $('#comfort-label');
	
	$submittedLabel= $('#submitted-label');
	
	if(diff > 0) {
		$submitStatus.css({'margin-top': diff + 'px'});
	}
	
	
	var $width = 2 * $height;
	$circle.css({
		'height': $height + 'px', 
		'width': $width,
		'border-radius': $height + 'px ' + $height + 'px 0 0'
	});
	
	dial_innerH = $height/2;
	
	$innerC.css({
		'height': (dial_innerH) + 'px', 
		'width': $width/2,
		'border-radius': (dial_innerH) + 'px ' + (dial_innerH) + 'px 0 0',
		'top': (dial_innerH) + 'px', 
		'left': (dial_innerH) + 'px' 
	});
	
	$comfNumber.css('font-size', dial_innerH/2 + 'px');
	$comfLabel.css('font-size', dial_innerH/4 + 'px');
	$submittedLabel.css({'font-size': dial_innerH/2 + 'px', 'top': ($height / 4)+ 'px' });
	
	dial_handler = $('#handler');
	
	var dialHeight = dial_handler.height();
	
	dial_handler.css({'left': ($height - dialHeight/2) + 'px'});
	
	
	
	
	
	//center the label
	var ctw = $('#circle-too-warm');
	var ctw_width  = ctw.width();
	var ctw_height = ctw.height();
//	var ctw_deg = (ctw_width * 360)/(Math.PI * $width);
	var ctw_rad = (ctw_width) / (Math.PI * $width);
	var ctw_top = $height - Math.sin( Math.PI / 4 -  ctw_rad / 2 ) * $height - ctw_height+5;
	var ctw_left = $height -  Math.cos( Math.PI / 4 -  ctw_rad / 2 ) * $height - ctw_width+5;
	
	ctw.css({'top': ctw_top + 'px', 'left': ctw_left + 'px', 'transform': 'rotate(-50deg)'});
	ctw.arctext({ radius: $height -20, dir: 1, rotate: true });
	
	
	var ctc = $('#circle-too-cold');
	var ctc_width = ctc.width();
	var ctc_height = ctc.height();
	var ctc_rad = (ctc_width) / (Math.PI * $width);
	var ctc_top = $height - Math.sin( Math.PI / 4 -  ctc_rad / 2 ) * $height - ctc_height+5;
	var ctc_right = $height -  Math.cos( Math.PI / 4 -  ctc_rad / 2 ) * $height - ctc_width+5;
	
	ctc.css({'top': ctc_top + 'px', 'right': ctc_right+ 'px', 'transform': 'rotate(50deg)'});
	ctc.arctext({ radius: $height -20, dir: 1, rotate: true });
	
	
	handlerW2 = dial_handler.width()/2;
	dial_rad = $circle.width()/2;
	//moved to be calculated correctly!
	//var offs = $circle.offset();
	//var elPos = {x:offs.left, y:offs.top};
	var mHold = false;
	
	var offs = null;
	var elPos = null; 
	
	/*
	dial_handler.mousedown(function() { 
		mHold = true; 
	});
	*/
	dial_handler.on('vmousedown', function(e) {
		
		mHold = true; 
	});
	
//	$(document).mousemove(function(e) {
	$(document).on('vmousemove', function(e) {
		//e.preventDefault();
		if (mHold && !dial_locked) {

			if(offs == null) {
				offs = $circle.offset();
				elPos = {x:offs.left, y:offs.top};
			}
			
			//var pos = $circle.position();
			//var elPos = {x:pos.left, y:pos.top * -1 };
			
			var mPos = {x:e.pageX-elPos.x, y:e.pageY-elPos.y};
//			console.log("page XY: " +  e.pageX + ", " + e.pageY);
//			console.log("pos", pos);
//			console.log("elPos", elPos);
//			console.log("mPos", mPos);
			var atan = Math.atan2(mPos.x-dial_rad, mPos.y-dial_rad);
			var deg  = -atan/PI2+180;
            
            if(deg > 90.0 && deg < 180.0) {
            	deg = 90;
            } else if(deg >= 180.0 && deg < 270.0) {
            	deg = 270;
            }
          
            dial_deg = deg;
            
            dial_update();
            
		}
	});
	
//	$(document).mouseup (function() { 
	$(document).on('vmouseup', function() {
		
		if(mHold == true) {
			
			mHold = false;
			
			//persist it once!
			appstate.setDialDeg(dial_deg);
			
		}
		
	});
	
	var cp = appstate.getCurrentPlace();
	dial_onPlaceChanged(null, cp);
	
	//register the listener
	$(document).on(EVENT_CURRENT_PLACE_CHANGED, dial_onPlaceChanged);
	
	dial_refreshLock();
	
	dial_update();
	
	
}

function dial_update() {
	
	if(dial_handler == null) {
		console.warn("No handler initialized!");
		return;
	}
	
	
//	$innerC.css('background-color', 'gray');
	
	
	var measure  =  90.0 / 20.0;
	
	var comf = 0;
	
	var deg = dial_deg;
	
	
	if(deg >= 0 && deg < 180) {
		
		for(var i = 0; i <= 10; i++) {
			
			var n = measure * 2 * i;
			
			var min = n - measure;
			var max = n + measure;
			
			if(deg >= min && deg < max) {
				comf = -1 * i;
				break;
			} 
			
		}
		
	} else {
		//scale 
		var ndeg = -1 * (deg - 360);
		
		for(var i = 0; i <= 10; i++) {
			
			var n = measure * 2 * i;
			
			var min = n - measure;
			var max = n + measure;
			
			if(ndeg >= min && ndeg < max) {
				comf = i;
				break;
			} 
			
		}
		
	}
	
		
	
	//var perc = (deg*100/360)|0;
    
	var X = Math.round(dial_rad*  Math.sin(deg*PI2));
	var Y = Math.round(dial_rad* -Math.cos(deg*PI2));
	
	dial_handler.css({
		left:X+dial_rad-handlerW2, 
		top:Y+dial_rad-handlerW2/*don't rotate!, 
		transform:'rotate('+deg+'deg)'
		*/
	});
	
	// --------------------- That's it.
	
//	dial_handler.text( deg|0 );
	
	//$circle.css({borderColor: "hsl(200,70%,"+ (perc*70/100+30) +"%)"});
	
	dial_level = comf;
	
	dial_comfort = comfortLabels[dial_level + 10];
	
//	var bc = null;
	
	if( comf == 0 ) {
	
		
//		$comfNumber.text(dial_comfort);
		$comfNumber.hide();
		$comfLabel.html(dial_comfort);
		
//		bc = 'hsl(120'
		
		$comfLabel.css({
			'font-size': dial_innerH/3 + 'px',
			'padding-top': dial_innerH/2 + 'px'
		});
		
	} else {
		
		
		$comfLabel.css({
			'font-size': dial_innerH/4 + 'px',
			'padding-top': ''
		});
		
		$comfNumber.text(dial_level);
		
		$comfNumber.show();
		
		$comfLabel.text(dial_comfort);
		
		
	}
	
	//$comfLabel.html( "" + comf );//.css({	color:       "hsl(200,70%,"+ (perc*70/100+30) +"%)"});
	
	var _max = comf >= 0 ? 120 : 90;
	
	var hue = 120 + ( -1 * comf * _max / 10);
	
	$innerC.css('background-color', 'hsl(' + hue + ',100%,50%)');
	
	
	
	
}

var comfortLabels = [
    //-10
    'freezing',
    //-9 - -7
    'very cold',
    'very cold',
    'very cold',
    //-6 - -4
    'cold',
    'cold',
    'cold',
    //-3 - -1
    'slightly cold',
    'slightly cold',
    'slightly cold',
    //0
    'comfortable',
    //1 - 3
    'slightly warm',
    'slightly warm',
    'slightly warm',
    //4 - 6
    'warm',
    'warm',
    'warm',
    //7 - 9
    'very warm',
    'very warm',
    'very warm',
    //10
    'hot'
];

function dial_onSubmitClicked() {

	if($submitButton.attr('disabled') == 'disabled') {
		return;
	}
	
	
	if(dial_locked) {
		
		//unlock
		dial_locked = false;
		
	} else {
		
		dial_locked = true;
		
		var date = new Date();
		
		var h = date.getHours()
		
		var ampm = h < 12 ? 'am' : 'pm';
		
		var hs = '';
		if(h == 0) {
			hs = '12';
		} else if(h < 13) {
			hs = h;
		} else {
			hs = ( h - 12 );
		}
		
		var m = date.getMinutes();
		
		var ms = m > 9 ? ('' + m) : ('0' + m); 
		
		var ds = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + hs + ':' + ms + ampm;    
		
		var l = "Last submission: " + ds;
		
		$submitStatus.text(l);
		
		appstate.setLastSubmitStatus(l);
		
	}

	appstate.setLockedFlag(dial_locked);
	
	dial_refreshLock();
	
}


function dial_refreshLock() {
	
	if(dial_locked) {
		
		$submitButton.find('.inner').text('Update');
		
		$submittedLabel.show();
		
	} else {
		
		$submitButton.find('.inner').text('Submit');
		
		$submittedLabel.hide();
		
	}
	
}