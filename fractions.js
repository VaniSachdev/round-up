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

var circleGoalX = WIDTH/2;
var circleX = WIDTH/2;
const circleY = HEIGHT/2;

function bound(x, min, max) {
    return x > min ? (x < max ? x : max) : min;
}

function draw() {
    updateNumRects();
    background(255);
    fill(255);
    for (var i = 0; i < NUM_RECTS; i++) {
        rect(LEFT_RECT_EDGE + RECT_WIDTH*i, TOP_RECT_EDGE, RECT_WIDTH, RECT_HEIGHT);
    }
    updateCircle();
}

function isMouseOnCanvas() {
    return mouseX > 0 && mouseX < WIDTH && mouseY > 0 && mouseY < HEIGHT;
}

function updateCircleGoal() {
    var numerator = Math.round((mouseX - LEFT_RECT_EDGE) / RECT_WIDTH);
    document.getElementById("numerator").value = numerator;
    circleGoalX = (numerator * RECT_WIDTH) + LEFT_RECT_EDGE;
}

function mouseReleased() {
    if (isMouseOnCanvas()) {
        updateCircleGoal();
    }

}

function updateFilledRects() {
    var numerator = Math.round(document.getElementById("numerator").value);


}

function updateNumRects() {
    if (NUM_RECTS != document.getElementById("denominator").value) {
        NUM_RECTS = document.getElementById("denominator").value;
        if (NUM_RECTS > BAR_WIDTH/10) {
            document.getElementById("denominator").value = BAR_WIDTH/10;
            NUM_RECTS = BAR_WIDTH/10;
        }
        RECT_WIDTH = BAR_WIDTH/NUM_RECTS;
        updateCircleGoal();
    }
    
    
}

function updateCircle() {
    if (mouseIsPressed == true) {
        circleGoalX = bound(mouseX, LEFT_RECT_EDGE, LEFT_RECT_EDGE + BAR_WIDTH);
        // circleY = mouseY;
    }
        circleX += 0.5 * (circleGoalX - circleX);
    
    fill(255, 0, 0);
    noStroke();
    rect(LEFT_RECT_EDGE, TOP_RECT_EDGE, circleX - LEFT_RECT_EDGE, BAR_HEIGHT);
    ellipse(circleX, circleY, 20, 20);
    stroke(0);

}