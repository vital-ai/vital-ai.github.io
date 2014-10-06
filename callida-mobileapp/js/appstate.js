
var KEY_LAST_VISITED_SCREEN = 'LAST_VISITED_SCREEN';

var KEY_DIAL_DEG = 'DIAL_DEG';

var KEY_CURRENT_PLACE = 'CURRENT_PLACE';

var KEY_LAST_SUBMIT_STATUS = 'KEY_LAST_SUBMIT_STATUS';

var KEY_LOCKED_FLAG = 'KEY_LOCKED_FLAG';


var EVENT_CURRENT_PLACE_CHANGED = 'CURRENT_PLACE_CHANGED';

 

/**
 * The singleton used to control the app state and notify of changes
 */
AppState = function() {
	
}

AppState.prototype.setLastVisitedScreen = function(current) {
	
	localStorage.setItem(KEY_LAST_VISITED_SCREEN, current);
	
}

AppState.prototype.getLastVisitedScreen = function() {
	
	var lastScreen = localStorage.getItem(KEY_LAST_VISITED_SCREEN);
	
	if(lastScreen == null || lastScreen == '') {
		return null;
	}
	
	return lastScreen;
	
}

//set the dial deg
AppState.prototype.setDialDeg = function(deg) {
	
	localStorage.setItem(KEY_DIAL_DEG, '' + deg);
	
}

AppState.prototype.getDialDeg = function(deg) {
	
	var v = 0;
	
	var stored = localStorage.getItem(KEY_DIAL_DEG);
	
	if(stored != null && stored != '') {
		
		v = parseInt(stored);
		
	}
	
	return v;
	
}

/**
 * current place is a simple json object
 */
AppState.prototype.setCurrentPlace = function(currentPlace) {

	console.log("set current place:" , currentPlace);
	
	if( currentPlace != null ) {
		
		var cloned = null;
		
		cloned = jQuery.extend(true, {}, currentPlace);
		cloned.geometry = {};
			
		/*
		for(var fn in currentPlace){
				
				if(fn == 'geometry' || fn == 'address_components' || fn == 'aspects' || fn == 'photos' || fn == 'reviews') continue;
				
				cloned[fn] = jQuery.clone( currentPlace[fn] );
			}
			*/
			
			
		cloned.geometry.location = {lat: currentPlace.geometry.location.lat(), lng: currentPlace.geometry.location.lng()};
		if(currentPlace.geometry.viewport != null) {
			cloned.geometry.viewport = {
					sw: {lat: currentPlace.geometry.viewport.getSouthWest().lat(), lng: currentPlace.geometry.viewport.getSouthWest().lng()},
					ne: {lat: currentPlace.geometry.viewport.getNorthEast().lat(), lng: currentPlace.geometry.viewport.getNorthEast().lng()}
			};
		} else {
			cloned.geometry.viewport = null;
		}
			
		//handle other non simple objects!
			
		var placeJSON = JSON.stringify(cloned);
		localStorage.setItem(KEY_CURRENT_PLACE, placeJSON);
		
	} else {
		
		localStorage.removeItem(KEY_CURRENT_PLACE);
		
	}
	
	
	$(document).trigger(EVENT_CURRENT_PLACE_CHANGED, [currentPlace]);
}

AppState.prototype.getCurrentPlace = function(currentPlace) {
	
	var json = localStorage.getItem(KEY_CURRENT_PLACE);
	
	if(json == null || json == '') {
		console.log("current place:" , null);
		return null;
	}
	
	var v = $.parseJSON(json);
	
	v.geometry.location = new google.maps.LatLng(v.geometry.location.lat, v.geometry.location.lng);
	
	if(v.geometry.viewport != null) {
		
		var sw = new google.maps.LatLng(v.geometry.viewport.sw.lat, v.geometry.viewport.sw.lng);
		
		var ne = new google.maps.LatLng(v.geometry.viewport.ne.lat, v.geometry.viewport.ne.lng);
		
		v.geometry.viewport = new google.maps.LatLngBounds(sw, ne);
	}
	
	console.log("current place:" , v);
	
	return v;
	
}

AppState.prototype.getLastSubmitStatus = function() {
	
	var status = localStorage.getItem(KEY_LAST_SUBMIT_STATUS);
	
	if(status == null) status = '';
	
	return status;
	
}

AppState.prototype.setLastSubmitStatus = function(status) {
	
	localStorage.setItem(KEY_LAST_SUBMIT_STATUS, status);
}


AppState.prototype.getLockedFlag = function() {
	
	var locked = localStorage.getItem(KEY_LOCKED_FLAG);
	
	if(locked != null && locked == 'true') {
		return true;
	}
	
	return false;
	
}

AppState.prototype.setLockedFlag = function(_locked) {
	
	if(_locked == true) {
	
		localStorage.setItem(KEY_LOCKED_FLAG, 'true');
		
	} else {
	
		localStorage.removeItem(KEY_LOCKED_FLAG);
		
	}
	
}