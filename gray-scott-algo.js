// various constants
var scrWidth =1200, scrHeight =700, scale = 1;
var gridWidth = 500;
//var f = 0.055, k = 0.062, diffusionA = 1.0, diffusionB = 0.5;
//var f = 0.04, k = 0.06, diffusionA = 1.0, diffusionB = 0.5;
//var f = 0.0620, k = 0.0630, diffusionA = 1.0, diffusionB = 0.5, fPlusK = f + k;  // see gray images
//var f = 0.098, k = 0.057, diffusionA = 1.0, diffusionB = 0.5, fPlusK = f + k;  
//var f = 0.01, k = 0.0430, diffusionA = 1.0, diffusionB = 0.5, fPlusK = f + k;  

var f = 0.026, k = 0.055, diffusionA = 1.0, diffusionB = 0.5, fPlusK = f + k; 

var diaWeight = 0.05, adjWeight = 0.2, centWeight = -1, dT = 1.05;
var grid = Create2DArray(gridWidth);
var newGrid = Create2DArray(gridWidth);
var numberCycles=0; 
var maxCycles = 20000, noRandom = 30;
function init()
{ 
    screenInit();

    for(var y=0; y<gridWidth; y++)
        for(var x=0; x<gridWidth; x++)
        { 
            grid[x][y] = new Cell(1,0);
            newGrid[x][y] = new Cell(0,0);
        }    
    
    seed();
    calculateDiffusionReaction();
    writeNewValues();
    draw();
    loop();
}

function seed()
{
    

    for(var n =0; n< noRandom; n++)
    {

        var offsetx = rndInt(0, gridWidth-10);
        var offsety = rndInt(0, gridWidth-10);
        for(var c=offsety; c< offsety + 10; c++)
            for(var d=offsetx; d< offsetx+ 10; d++)
                grid[c][d].b = 1.0;
    }
  

}

function loop()
{ 
   // console.log(numberCycles);
    calculateDiffusionReaction();
    numberCycles++;   
    writeNewValues();
    if(numberCycles % 200 == 0)
        draw();
   
    if(numberCycles<maxCycles)
        requestAnimationFrame(loop);  
    else
    alert("done");



}

function calculateDiffusionReaction()
{ 

var a,b, newA, newB, xm1, xp1, ym1, yp1, abbReaction ;
for(var y=0; y<gridWidth; y++)
    for(var x=0; x<gridWidth; x++)
    {
        a = grid[x][y].a;
        b = grid[x][y].b;
        newA = 0, newB = 0;
        abbReaction = a * b * b;
        xm1 = x == 0 ?  gridWidth-1: x-1;
        xp1 = x == gridWidth-1 ?  0: x+1;
        ym1 = y == 0 ?  gridWidth-1: y-1;
        yp1 = y == gridWidth-1 ?  0: y+1;

        newA += a * centWeight;
        newA += grid[xm1][y].a * adjWeight;
        newA += grid[xp1][y].a * adjWeight;
        newA += grid[x][ym1].a * adjWeight;
        newA += grid[x][yp1].a * adjWeight;
        newA += grid[xm1][ym1].a * diaWeight;
        newA += grid[xp1][ym1].a * diaWeight;
        newA += grid[xm1][yp1].a * diaWeight;
        newA += grid[xp1][yp1].a * diaWeight;

        newB += b * centWeight;
        newB += grid[xm1][y].b * adjWeight;
        newB += grid[xp1][y].b * adjWeight;
        newB += grid[x][ym1].b * adjWeight;
        newB += grid[x][yp1].b * adjWeight;
        newB += grid[xm1][ym1].b * diaWeight;
        newB += grid[xp1][ym1].b * diaWeight;
        newB += grid[xm1][yp1].b * diaWeight;
        newB += grid[xp1][yp1].b * diaWeight;

        newGrid[x][y].a = a + (diffusionA * newA - abbReaction + f * (1 - a)) ;
        newGrid[x][y].b = b + (diffusionB * newB + abbReaction - fPlusK * b)  ;

    }
} 

function writeNewValues()
{
    for(var y=0; y<gridWidth; y++)
        for(var x=0; x<gridWidth; x++)
        {
            grid[x][y].a = newGrid[x][y].a
            grid[x][y].b = newGrid[x][y].b;

        }
}

function Create2DArray(gw)
{
	var arr = [];
  
	for (var i=0;i<gw;i++) {
	   arr[i] = [];
	}
  
	return arr;
}

function screenInit()
{

    canvas.width = document.body.clientWidth *.98;
    canvas.height = document.body.clientHeight *.95;
    requestAnimationFrame = window.requestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    

}