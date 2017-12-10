var input = $('#equation-input');
var canvas = $('#colors-canvas');
var ctx = canvas[0].getContext('2d');

var colorMap = {
	'0': '#FE2712',
	'1': '#FC600A',
	'2': '#FCCB1A',
	'3': '#FDED2A',
	'4': '#CBE432',
	'5': '#7FBD32',
	'6': '#347B98',
	'7': '#0247FE',
	'8': '#5A18C9',
	'9': '#C21460'
}

var pi = "";

var numDots = 20;
var dotWidthFactor = 0.65;

var populateGraph = function() {
	try {
		ls = math.eval(input.val()).toFixed((2 * numDots * numDots)).replace('.', '').split('');
	}
	catch(err) {
		return;
	}

	ctx.clearRect(0, 0, canvas.width(), canvas.height());

	if (ls[0] == 0) {
		ls.shift();
	}

	var dotBaseWidth = size / numDots;
	var dotWidth = dotBaseWidth * dotWidthFactor;
	var spaceWidth = (size * (1 - dotWidthFactor)) / (numDots + 1);

	var dotRadius = dotWidth / 2;
	var iterSpace = dotWidth + spaceWidth;
	for (var row=spaceWidth; row < size; row += iterSpace) {
		for (var coll=spaceWidth; coll < size; coll += iterSpace) {
			ctx.beginPath();
			ctx.arc(coll + dotRadius, row + dotRadius, dotRadius, 0, 2 * Math.PI, false);
			ctx.fillStyle = colorMap[ls.shift()];
			ctx.fill();
		}
	}
};

var resizeCanvas = function() {
	size = $('.pic-container').width();
	canvas.attr({
		'height': size,
		'width': size
	});
};

math.config({
	number: 'BigNumber',
	precision: (2 * numDots * numDots)
});

resizeCanvas();
populateGraph();
$(window).resize(function(){
	resizeCanvas();
	populateGraph();
});
input.on('propertychange change click keyup input paste', function(){
	populateGraph();
});
