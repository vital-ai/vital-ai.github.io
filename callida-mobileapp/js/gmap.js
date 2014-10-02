var selectedPlace = null;

var clearPlace = null;

var map = null;

function initialize_gmaps() {

	var markers = [];
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
			-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));
	map.fitBounds(defaultBounds);

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */
	(document.getElementById('pac-input'));
	
	//XXX don't push search box!
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */
	(input));

	// [START region_getplaces]
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

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
		for ( var i = 0, place; place = places[i]; i++) {
			
			if(i == 0) {
				selectedPlace = place;
			}
			
			var image = {
				url : place.icon,
				size : new google.maps.Size(71, 71),
				origin : new google.maps.Point(0, 0),
				anchor : new google.maps.Point(17, 34),
				scaledSize : new google.maps.Size(25, 25)
			};

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

		map.fitBounds(bounds);

		onPlaceChanged();
		
	});
	// [END region_getplaces]

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
	
	

}

function onPlaceChanged() {
	
	console.log("place selected: ", selectedPlace);
	
	var selBox = $('#address-box-selected');
	var notSelBox = $('#address-box-notselected');
	
	var text = $('#selected-address-text, #address-box-selected-address');
	
	var pi = $('#pac-input');
	
	var selectedLocationPanel = $('#selected-location-panel');
	
	if(selectedPlace != null) {
		
		notSelBox.hide();
		selBox.show();
		
		pi.hide();
		
//		clearPlace.show();
		
		
		text.text(selectedPlace.formatted_address).addClass('selected');
		
		selectedLocationPanel.show();
		
	} else {

		pi.show();
		selBox.hide();
		notSelBox.show();
		
//		clearPlace.hide();
		
		selectedLocationPanel.hide();
		
		text.text(text.attr('data-default')).removeClass('selected');
		
		
	}
	
	dial_onPlaceChanged(selectedPlace);
	
	
}

function onMapPageShown() {

	var sb = $('#select-building');
	
	if( ! sb.hasClass('initialized') ) {

		var mc = $('#map-canvas');

		var w = $(window).width();
		var h = $(window).height();
		
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
		
		$('#selected-address-next-button').on('tap', function(){
			
			navigateTo('comfort-level');
			
		});
		
		onPlaceChanged();
		
	}
	
}