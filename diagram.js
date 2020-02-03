 
 
function draw(){

	var canvas = document.getElementById('canvas');
 
	 if (canvas.getContext)
	 { 
        var ctx = canvas.getContext('2d');  
 		ctx.clearRect(0, 0, canvas.width, canvas.height); 
		
		for(var y=0; y<gridWidth; y++)
			for(var x=0; x<gridWidth; x++)
				drawSquare(ctx, x *scale, y *scale, scale, grid[x][y].a * 255,   grid[x][y].a * 255, 255 - grid[x][y].a * 255 )
		 
	


	} 
}

function drawSquare(ctx, x,  y, sqWidth, shadeR, shadeG, shadeB)
{ 	 
	ctx.fillStyle =  'rgb(' + shadeR +',' + shadeG +',' + shadeB+ ' )'; 
	ctx.fillRect(x , y, sqWidth, sqWidth);
	ctx.strokeStyle = "#FF0000"; 
	//ctx.strokeRect(x , y, sqWidth, sqWidth);
}


function Vector(i,j)
{

	this.i = i;
	this.j = j; 
}

function Coord(x,y){

	this.x = x;
	this.y = y; 
}

function randomXToY(minVal,maxVal,floatVal){

 	var randVal = minVal+(Math.random()*(maxVal-minVal));
  	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

class Cell {
    constructor(a, b)
    { 
        this.a = a;
        this.b = b;
    }
}

function rndInt(min, max) 
{
	return Math.floor(Math.random() * (max - min)) + min;
}