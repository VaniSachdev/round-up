const WIDTH = 1000;
const HEIGHT = 500;

const BAR_WIDTH = 8*WIDTH/10;
const BAR_HEIGHT = HEIGHT/10;

const RECT_HEIGHT = BAR_HEIGHT;
const LEFT_RECT_EDGE = (WIDTH - BAR_WIDTH)/2;
const TOP_RECT_EDGE = (HEIGHT - BAR_HEIGHT)/2;

function bound(x, min, max) {
    return x > min ? (x < max ? x : max) : min;
}

function isMouseOnCanvas() {
    return mouseX > 0 && mouseX < WIDTH && mouseY > 0 && mouseY < HEIGHT;
}

function isMouseOnBar() {
    return mouseX > LEFT_RECT_EDGE && mouseX < LEFT_RECT_EDGE + BAR_WIDTH &&
        mouseY > TOP_RECT_EDGE && mouseY < TOP_RECT_EDGE + BAR_HEIGHT;
}


var numRects = 10;
var filledRects = 5;

var RECT_WIDTH = BAR_WIDTH/numRects;

var circleGoalX = WIDTH/2;
var circleX = WIDTH/2;
const circleY = HEIGHT/2;
var trackingMouse = false;

function setup() {
    console.log("setup");
    createCanvas(WIDTH, HEIGHT);
    // noStroke();
}

function draw() {
    drawRects();
    if (trackingMouse) {
        updateCircleGoal();
    } else {
        updateFilledRects();
    }
    updateCircle();
}


function mousePressed() {
    console.log(isMouseOnBar());
    if (isMouseOnBar()) {
        trackingMouse = true;
    }
}

function mouseReleased() {
    if (trackingMouse) {
        updateCircleGoal();
    }
    trackingMouse = false;

}


function drawRects() {
    updateNumRects();
    background(255);
    fill(255);
    for (var i = 0; i < numRects; i++) {
        rect(LEFT_RECT_EDGE + RECT_WIDTH*i, TOP_RECT_EDGE, RECT_WIDTH, RECT_HEIGHT);
    }
    updateCircle();
}


function updateCircleGoal() {
    filledRects = Math.round((mouseX - LEFT_RECT_EDGE) / RECT_WIDTH);
    document.getElementById("numerator").value = bound(filledRects, 0, numRects);
    circleGoalX = (filledRects * RECT_WIDTH) + LEFT_RECT_EDGE;
}

function updateFilledRects() {
    filledRects = document.getElementById("numerator").value;
    if (filledRects > numRects) {
        document.getElementById("numerator").value = numRects;
    } else if (filledRects < 0) {
        document.getElementById("numerator").value = 0;
    }
    circleGoalX = (filledRects * RECT_WIDTH) + LEFT_RECT_EDGE;
}

function updateNumRects() {
    if (numRects != document.getElementById("denominator").value) {
        numRects = document.getElementById("denominator").value;
        if (numRects > BAR_WIDTH/10) {
            document.getElementById("denominator").value = BAR_WIDTH/10;
            numRects = BAR_WIDTH/10;
        }
        if (numRects < 1) {
            document.getElementById("denominator").value = 1;
            numRects = 1;
        }
        RECT_WIDTH = BAR_WIDTH/numRects;
        updateCircleGoal();
    }
    
    
}

function updateCircle() {
    if (trackingMouse) {
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