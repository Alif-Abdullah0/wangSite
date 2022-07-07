//NOTES: 
// http://jsfiddle.net/eso8gkw7/ 


//retrieve node in DOM via ID
let c = document.getElementById("slate");

//instantiate a CanvasRenderingContext2d object
let ctx = c.getContext("2d");

//init global state var
let size = 50;
let circularity = 0.5; 
let density = 50;
let convexity = 0.5;
let inertia = 0.5;
let red = 255;
let green = 255; 
let blue = 255;

//size slider 
// have multiple variables to establish the characterisitcs of an isolate
// smth is. every time you change a slider, you clear the canvas,
// redraw everything but with the changed characteristics. Using input and percent on to 
// make slider change automatically


//TODO: need to figure out how to store percentage stuff,, why won't this 
//code below compile??

var $percent=$('#sizeRange');
$percent.on('input',function(){
    draw(parseInt($percent.val()));
});


//circularity slider
//density slider 
//convexity slider
//inertia slider 
//red slider
//green slider
//blue slider 


// draw function is called wheenver slider changes, draw function will call 
// separate js functions that changae color, intertia...the values will be 
// stored variables 

function draw(x) {
    
}