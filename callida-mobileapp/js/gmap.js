var selectedPlace = null;

var clearPlace = null;

var map = null;

var inputEl = null;

var currentPosition = null;

var markers = [];

var infowindow = null;

function initialize_gmaps() {

	
	//only initialize gmaps if screen is open?
	if( ! $('#select-building').hasClass('initialized') ) {
		return;
	}
	
	if(map != null) return;
	
	//loading in selected place...
	selectedPlace = appstate.getCurrentPlace();
	
	
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false
	});
	
	
	if(selectedPlace != null) {
		
		onPlacesListChanged([selectedPlace], false);
		
	} else {
		
		var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
//			-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));
				40.697604, -74.022543), new google.maps.LatLng(40.819570, -73.915083));
		map.fitBounds(defaultBounds);
		
	}
	
	
//	//40.7127 N, 74.0059W
//	var position = new google.maps.LatLng(40.7127, -74.0059);
//	map.setCenter(position);

	// Create the search box and link it to the UI element.
	inputEl = /** @type {HTMLInputElement} */
	(document.getElementById('pac-input'));
	
	//XXX don't push search box, only on refresh!
	//map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

	
//	var searchOpts = new google.maps.places.AutocompleteOptions();
	
	
//	var evType = 'places_changed';
//	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */
	var searchBox = new google.maps.places.Autocomplete(
	(inputEl));
	
	var evType = 'place_changed';
	searchBox.setTypes(['address']);

	// [START region_getplaces]
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, evType, function() {
		//var places = searchBox.getPlaces();
		var place = searchBox.getPlace();
		var places = place != null ? [place] : [];
		onPlacesListChanged(places, true);
	});
	// [END region_getplaces]
	
	
	

	function onPlacesListChanged(places, refresh) {
		
		if (places.length == 0) {
			selectedPlace = null;
			onPlaceChanged();
			return;
		}
		
		for ( var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
		}

		// For each place, get the icon, place name, and location.
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		
		var betterBounds = null;
		
		for ( var i = 0, place; place = places[i]; i++) {
			
			if(i == 0) {
				selectedPlace = place;
				betterBounds = selectedPlace.geometry.viewport;
			}
			
			var image = null;
			
			if(place.icon != null) {
				image = {
						url : place.icon,
						size : new google.maps.Size(71, 71),
						origin : new google.maps.Point(0, 0),
						anchor : new google.maps.Point(17, 34),
						scaledSize : new google.maps.Size(25, 25)
				};
			}
			

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map : map,
				icon : image,
				title : place.name,
				position : place.geometry.location
			});

			markers.push(marker);

			bounds.extend(place.geometry.location);
			
		}

		if(betterBounds != null) {
			bounds = betterBounds;
			map.fitBounds(bounds);
		} else {
			map.setCenter(selectedPlace.geometry.location);
			map.setZoom(17);
		}
		

		if(refresh) {
			onPlaceChanged();
		}
		
	}
	

	// Bias the SearchBox results towards places that are within the bounds of
	// the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});
	
	clearPlace = $('#address-box-remove');
	
	clearPlace.on('tap', function(){
		
		selectedPlace = null;
		
		for ( var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
		}
		
		var inputPanel = $('#pac-input');
		inputPanel.val('');
		onPlaceChanged();
		
	});
	
	
	onPlaceChanged();
	
//	google.maps.event.addListener(map, 'tilesloaded', function() {
//		
//		//move the button over top of search box now
//		var c = $('#map-canvas');
//		var inputPanel = $('#pac-input');
//		
//		var pos = inputPanel.offset();
//		
////		var cpos = c.position();
//		
//		clearPlace.css({'top': (/*cpos.top +*/  pos.top) + 'px', 'left': (/*cpos.left + */ pos.left + inputPanel.outerWidth()) + 'px'});
//		
//		if(selectedPlace != null) {
//			clearPlace.show();
//		}
//	});
	
	
	if(true || selectedPlace == null) {
		
		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,
						position.coords.longitude);
				
				
				currentPosition = pos;
				/*
				if(selectedPlace == null) {
					map.setCenter(pos);
					map.setZoom(17);
				}
				*/
				
				if(selectedPlace == null) {
					
					infowindow = new google.maps.InfoWindow({
						map: map,
						position: pos,
						disableAutoPan: true,
						content: '<div style="width:150px;"><a id="current-location-link" style="width: 150px;">Your current location</a></div>'
					});
					
					google.maps.event.addListener(infowindow, 'domready', function() {
						$('#current-location-link').on('tap', onCurrentLocationClicked);
					});
					
					map.setCenter(pos);
					map.setZoom(17);
					
				}
			
				
				
			}, function() {
				handleNoGeolocation(true);
			});
		} else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
		
	}
	

}


function handleNoGeolocation(errorFlag) {
	
	var content = null;
	if (errorFlag) {
		content = 'Error: The Geolocation service failed.';
	} else {
		content = 'Error: Your browser doesn\'t support geolocation.';
	}
	
	console.warn(content);

//	//40.7127 N, 74.0059W
//	var position = new google.maps.LatLng(40.7127, -74.0059);
//	map.setCenter(position);
}


function onPlaceChanged() {
	
	console.log("place selected: ", selectedPlace);
	
	var selBox = $('#address-box-selected');
	var notSelBox = $('#address-box-notselected');
	
	var text = $('#selected-address-text, #address-box-selected-address');
	
	var pi = $('#pac-input');
	
	var selectedLocationPanel = $('#selected-location-panel');
	
	if(selectedPlace != null) {
		
		pi.hide();
		notSelBox.hide();
		selBox.show();
//		clearPlace.show();
		
		text.text(selectedPlace.formatted_address).addClass('selected');
		
		selectedLocationPanel.show();
		
		if(infowindow != null) {
			infowindow.close();
			infowindow = null;
		}
		
	} else {

		pi.show();
		
		if(!pi.hasClass('initialized')) {
			map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputEl);
			pi.addClass('initialized');
		} 
		
		selBox.hide();
		notSelBox.show();
		
//		clearPlace.hide();
		
		
		text.text(text.attr('data-default')).removeClass('selected');
		
		
		selectedLocationPanel.hide();
		
		if(currentPosition != null) {
			
			infowindow = new google.maps.InfoWindow({
				map: map,
				position: currentPosition,
				disableAutoPan: selectedPlace != null,
				content: '<div style="width:150px;"><a id="current-location-link" style="width: 150px;">Your current location</a></div>'
			});
			
			google.maps.event.addListener(infowindow, 'domready', function() {
				$('#current-location-link').on('tap', onCurrentLocationClicked);
			});
			
			map.setCenter(currentPosition);
			map.setZoom(17);
		}
		
		
	}
	
	
	//clone and update the value of geometry...
	
//	LatLngBounds(sw?:LatLng, ne?:LatLng)
	
//	var v = $.parseJSON(json);
//	v.geometry.location = new google.maps.LatLng(v.geometry.location.k, v.geometry.location.B);
//	appstate.setCurrentPlace(selectedPlace);
	
	appstate.setCurrentPlace(selectedPlace);
	
}

function onMapPageShown() {

	var sb = $('#select-building');
	
	
	if( ! sb.hasClass('initialized') ) {
		

		var mc = $('#map-canvas');

		var w = $(window).width();
		var h = $(window).height();
		
		$('#pac-input').width((w - 50) + 'px');
		
		//other elements should be constant height
		console.log("w: " + w + " h: " + h);
		
		var slb = $('#select-building-body');
		
		var header = $('#main-header').outerHeight();
		
		var innerHeight = slb.outerHeight();

		var searchP = $('#address-box-panel').outerHeight();
		
		mc.css('height', ( h - header - searchP - 5) + 'px');
		
		if(map != null) {
			
			//make it refresh
			console.log("resizing gmap...");
			
			google.maps.event.trigger(map, 'resize');
			
		}
		
		
		sb.addClass('initialized');
		
		/*
		$('#selected-address-next-button').on('tap', function(){
			
			navigateTo('comfort-level');
			
		});
		*/
		
		initialize_gmaps();
	}
	
}

function onCurrentLocationClicked(event) {
	
	event.preventDefault();
	
	var p = $('#popupBasic');
	
	p.empty();
	p.append($('<p>').text('Looking up current location address...'));
	
	p.popup( "open", {positionTo: '#current-location-link', transition: 'pop'});
	
	var geocoder = new google.maps.Geocoder(); 

	//Array.<GeocoderResult>, GeocoderStatus
	geocoder.geocode({location: currentPosition}, function(geocoderResults, geocoderStatus){
		if(geocoderStatus == google.maps.GeocoderStatus.OK) {
			
			p.empty();
			
			//google.maps.GeocoderResult
			var fr = geocoderResults[0];
			
			var l = $('<a>').text('select').on('tap', function(tapEvent){
				
				tapEvent.preventDefault();
				
				for ( var i = 0, marker; marker = markers[i]; i++) {
					marker.setMap(null);
				}
				
				selectedPlace = fr;
				var betterBounds = selectedPlace.geometry.viewport;
				
				/*
				var image = {
					url : selectedPlace.icon,
					size : new google.maps.Size(71, 71),
					origin : new google.maps.Point(0, 0),
					anchor : new google.maps.Point(17, 34),
					scaledSize : new google.maps.Size(25, 25)
				};
				*/

				// Create a marker for each place.
				var marker = new google.maps.Marker({
					map : map,
					//icon : image,
					title : selectedPlace.formatted_address,
					position : selectedPlace.geometry.location
				});
				
				markers.push(marker);

				if(betterBounds != null) {
					
					map.fitBounds(betterBounds);
					
				} else {
					
					map.setCenter(selectedPlace.geometry.location);
					
					map.setZoom(17);
					
				}
				
				p.popup( "close" );
				
				onPlaceChanged();
				
				
			});
			
			p.append(
				$('<p>').append(
						$('<span>').text('Address: ')
				).append(
						$('<b>').text(fr.formatted_address)
				).append(
						$('<span>').html('&nbsp;&nbsp;&nbsp;')
				).append(
						l
				)
				
			);
			
			
			
			
		} else {
			
			p.append($('<p>', {style: 'color: red;'}).error(geocoderStatus));
			
		}
	});
	
}
