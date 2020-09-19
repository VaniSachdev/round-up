const WIDTH = 1000;
const HEIGHT = 500;

const BAR_WIDTH = 8*WIDTH/10;
const BAR_HEIGHT = HEIGHT/10;

var NUM_RECTS = 10;

var RECT_WIDTH = BAR_WIDTH/NUM_RECTS;
const RECT_HEIGHT = BAR_HEIGHT;
const LEFT_RECT_EDGE = (WIDTH - BAR_WIDTH)/2;
const TOP_RECT_EDGE = (HEIGHT - BAR_HEIGHT)/2;

function setup() {
    console.log("setup");
    createCanvas(WIDTH, HEIGHT);
    // noStroke();
}

var circleX = WIDTH/2;
var circleY = HEIGHT/2;

function bound(x, min, max) {
    return x > min ? (x < max ? x : max) : min;
}

function draw() {
    updateNumRects();
    background(255);
    if (mouseIsPressed == true) {
        circleX = bound(mouseX, LEFT_RECT_EDGE, LEFT_RECT_EDGE + BAR_WIDTH);
        // circleY = mouseY;
    }
    fill(255);
    for (var i = 0; i < NUM_RECTS; i++) {
        rect(LEFT_RECT_EDGE + RECT_WIDTH*i, TOP_RECT_EDGE, RECT_WIDTH, RECT_HEIGHT);
    }
    fill(255, 0, 0);
    ellipse(circleX, circleY, 20, 20);
}

function mousePress() {
    
}

function mouseReleased() {
    
}

function updateNumRects() {
    NUM_RECTS = document.getElementById("denominator").value;
    if (NUM_RECTS > BAR_WIDTH/10) {
        document.getElementById("denominator").value = BAR_WIDTH/10;
        NUM_RECTS = BAR_WIDTH/10;
    }
    RECT_WIDTH = BAR_WIDTH/NUM_RECTS;
    
    
}