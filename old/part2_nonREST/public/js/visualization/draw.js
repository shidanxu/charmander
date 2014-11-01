function drawpath(way){
	console.log("script running");
	pad = Pad(document.getElementById('canvas'));

	var LINE_WIDTH = 20;
	var color = Color(0, 0, 0);
	

	for(var i = 0; i < way.length; i++){
		pad.draw_line(Coord(way[i][1], way[i][0]), Coord(way[i][3],way[i][2]), LINE_WIDTH, color);
	}
};
