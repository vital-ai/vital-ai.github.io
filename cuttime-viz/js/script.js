var colors = [
	"#51574a",
	"#447c69",
	"#74c493",
	"#8e8c6d",
	"#e4bf80",
	"#e9d78e",
	"#e2975d",
	"#f19670",
	"#e16552",
	"#c94a53",
	"#be5168",
	"#a34974",
	"#993767",
	"#65387d",
	"#4e2472",
	"#9163b6",
	"#e279a3",
	"#e0598b",
	"#7c9fb0",
	"#5698c4",
	"#9abf88",
	
	"#ff1417",
	"#ff6611",
	"#ff8844",
	"#ffee55",
	"#fefe38",
	"#ffff99",
	"#aacc22",
	"#bbdd77" /*    #c8cf82    
	#92a77e    #5599ee    #0088cc    
	#226688    #175279    #557777    
	#ddbb33    #d3a76d    #a9834b    
	#aa6688    #767676
	*/    
];

function drawPlot(targetID, record) {
	
	$(targetID).empty();
	
	if(record == null) return;

	var width = 500,
	    height = 500,
	    radius = Math.min(width, height) / 2,
	    innerRadius = 0.3 * radius;
	
	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.width; });
	
	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([0, 0])
	  .html(function(d) {
	    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
	  });
	
	var arc = d3.svg.arc()
	  .innerRadius(innerRadius)
	  .outerRadius(function (d) { 
	    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
	  });
	
	var outlineArc = d3.svg.arc()
	        .innerRadius(innerRadius)
	        .outerRadius(radius);
	
	var svg = d3.select(targetID).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	svg.call(tip);
	
	var labels = Band_Histogram_Vectors[0];
	
	var data = [];
	
	console.log("record", record);
	
	for(var i = 0 ; i < record.length; i++) {

		if(i == 0) continue;
		
		var r = {
			id: labels[i],
			order: i,
			score: record[i] * 500,
			weight: 1,
			color: colors[i-1],
			label: labels[i]
		};
		
		data.push(r);
		
	}
	
	console.log("data", data);
	
//		id = record[0],
//		id 
//			"id","order","score","weight","color","label"
//	};
	
//	d3.csv('astor_plot_files/astor_data.csv', function(error, data) {
	
	  data.forEach(function(d) {
	    d.id     =  d.id;
	    d.order  = +d.order;
	    d.color  =  d.color;
	    d.weight = +d.weight;
	    d.score  = +d.score;
	    d.width  = +d.weight;
	    d.label  =  d.label;
	  });
	  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
	  
	  var path = svg.selectAll(".solidArc")
	      .data(pie(data))
	    .enter().append("path")
	      .attr("fill", function(d) { return d.data.color; })
	      .attr("class", "solidArc")
	      .attr("stroke", "gray")
	      .attr("d", arc)
	      .on('mouseover', tip.show)
	      .on('mouseout', tip.hide);
	
	  var outerPath = svg.selectAll(".outlineArc")
	      .data(pie(data))
	    .enter().append("path")
	      .attr("fill", "none")
	      .attr("stroke", "gray")
	      .attr("class", "outlineArc")
	      .attr("d", outlineArc);  
	
	
	  // calculate the weighted mean score
	  var score = 
	    data.reduce(function(a, b) {
	      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
	      return a + (b.score * b.weight); 
	    }, 0) / 
	    data.reduce(function(a, b) { 
	      return a + b.weight; 
	    }, 0);
	
	  svg.append("svg:text")
	    .attr("class", "aster-score")
	    .attr("dy", ".35em")
	    .attr("text-anchor", "middle") // text-align: right
	    .text(Math.round(score));
	
//	});
	
}

var Band_Histogram_Vectors = null;

var Brand_Histogram_Vectors = null;

var Affinity_List = null;

$(function(){

	var filesToLoad = 3;
	
	function onDone() {
		filesToLoad--;
		if(filesToLoad == 0) {
			onDataReady();
		}
	};
	
	function errorHandler(error, file) {
		alert(error);
	}
	
	Papa.parse("data/Band_Histogram_Vectors.csv", {
		download: true,
		error: errorHandler,
		complete: function(results) {
			// executed after all files are complete
			Band_Histogram_Vectors = results.data;
			onDone();
		}
	});
	
	Papa.parse("data/Brand_Histogram_Vectors.csv", {
		download: true,
		error: errorHandler,
		complete: function(results) {
			// executed after all files are complete
			Brand_Histogram_Vectors = results.data;
			onDone();
		}
	});
	
	Papa.parse("data/Affinity_List.csv", {
		download: true,
		error: errorHandler,
		complete: function(results) {
			// executed after all files are complete
			Affinity_List = results.data;
			onDone();
		}
	});
	
});

var selectedBand = null;
var selectedBrand = null;

function onDataReady() {

	console.log("Band_Histogram_Vectors", Band_Histogram_Vectors);
	console.log("Brand_Histogram_Vectors", Brand_Histogram_Vectors);
	console.log("Affinity_List", Affinity_List);
	
	
	var bandNameSel = $('#band-name');
	for(var i = 0 ; i < Band_Histogram_Vectors.length; i++) {
		if(i == 0) continue;
		var name = Band_Histogram_Vectors[i][0];
		bandNameSel.append($('<option>', {value: name}).text(name));
	}
	
	
	var brandNameSel = $('#brand-name');
	for(var i = 0 ; i < Brand_Histogram_Vectors.length; i++) {
		if(i == 0) continue;
		var name = Brand_Histogram_Vectors[i][0];
		brandNameSel.append($('<option>', {value: name}).text(name));
	}
	
	var findVal = function(_data, _v) {
		if(_v == '-') return null;
		for(var i = 0; i < _data.length; i++) {
			if(_data[i][0] == _v) {
				return _data[i];
			}
		}
		alert("Data not found: " + _v);
	}
	
	var onSelectionChanged = function(sel) {
		
		var v = sel.val();
		
		var srcData = null;
		var targetID = null;
		if(bandNameSel == sel) {
			selectedBand = findVal(Band_Histogram_Vectors, v);
			targetID = "#band-chart";
			srcData = selectedBand; 
		} else if(brandNameSel == sel){
			selectedBrand = findVal(Brand_Histogram_Vectors, v);
			targetID = "#brand-chart";
			srcData = selectedBrand;
		} else alert("Invalid select");
	
		drawPlot(targetID, srcData);
		
		refreshAfinity();
		
	}
	
	bandNameSel.change(function(){
		onSelectionChanged(bandNameSel);
	});
	
	brandNameSel.change(function(){
		onSelectionChanged(brandNameSel);
	});
	
	
}

function refreshAfinity() {
	
	var scoreEl = $('#affinity-score');
	
	if(selectedBand != null && selectedBrand != null) {
		
		for(var i = 0 ; i < Affinity_List.length; i++ ) {
			if(i == 0) continue;
			var r = Affinity_List[i];
			if(r[1] == selectedBand[0] && r[2] == selectedBrand[0]) {
				scoreEl.text(r[3]);
				return;
			}
		}
		
		alert("Affinity data not found for: " + selectedBand[0] + " and " + selectedBrand[0]);
		
	} else {
		
		scoreEl.text('-');
		
	}
	
}