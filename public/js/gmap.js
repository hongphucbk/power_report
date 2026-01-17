$(function(){
	'user strick';
	
	var map;
	var mapDiv = document.getElementById('map');
	function initMap(){
		map = new google.maps.Map(mapDiv,{
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
        });
	};
	initMap();
});