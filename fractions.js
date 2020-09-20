const WIDTH = 1000;
const HEIGHT = 500;

const BAR_WIDTH = 8*WIDTH/10;
const BAR_HEIGHT = HEIGHT/10;
const PIZZA_HEIGHT = HEIGHT/2;
const CHEESE_HEIGHT = PIZZA_HEIGHT * 0.9;
const PEPPERONI_HEIGHT = PIZZA_HEIGHT / 10;

const RECT_HEIGHT = BAR_HEIGHT;
const LEFT_RECT_EDGE = (WIDTH - BAR_WIDTH)/2;
const VERTICAL_MARGIN = (HEIGHT - BAR_HEIGHT - PIZZA_HEIGHT)/3
const TOP_RECT_EDGE = VERTICAL_MARGIN;

const PIZZA_X = WIDTH/2;
const PIZZA_Y = HEIGHT - (PIZZA_HEIGHT/2 + VERTICAL_MARGIN);

function setup() {
    var canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("sketch-holder")
    
}

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

function isMouseOnPizza() {
    return (PIZZA_HEIGHT/2) > Math.sqrt(Math.pow(mouseX - PIZZA_X, 2) + Math.pow(mouseY - PIZZA_Y, 2));
}

function getDenominator() {
    return parseInt(document.getElementById("denominator").value)
}

function getNumerator() {
    return parseInt(document.getElementById("numerator").value)
}


var denominator = 10;
var numerator = 5;

var RECT_WIDTH = BAR_WIDTH/denominator;

var circleGoalX = WIDTH/2;
var circleX = WIDTH/2;
const circleY = TOP_RECT_EDGE + BAR_HEIGHT/2;
var trackingMouse = false;

var selectedSlices = [];
for (let i = 0; i < BAR_WIDTH/10; i++) {
    selectedSlices.push(false);
}



function draw() {
    background(255);
    if (trackingMouse) {
        updateCircleGoal();
    } else {
        updateFilledRects();
    }
    updateCircle();
    drawFilled();
    drawRects();
    drawPizzaCuts();
    // updateFraction();
}


function mousePressed() {
    if (isMouseOnBar()) {
        trackingMouse = true;
    }
    if (isMouseOnPizza()) {
        selectSlice();
    }
}

function mouseReleased() {
    if (trackingMouse) {
        updateCircleGoal();
    }
    trackingMouse = false;

}

function drawFilled() {
    fill(103, 203, 244);
    noStroke();
    rect(LEFT_RECT_EDGE, TOP_RECT_EDGE, circleX - LEFT_RECT_EDGE, BAR_HEIGHT);
    ellipse(circleX, circleY, 20, 20);
}

function drawRects() {
    updateNumRects();
    // fill(255);
    noFill();
    stroke(0);
    for (let i = 0; i < denominator; i++) {
        rect(LEFT_RECT_EDGE + RECT_WIDTH*i, TOP_RECT_EDGE, RECT_WIDTH, RECT_HEIGHT);
    }
}

function drawPizzaCuts() {
    stroke(0);
    fill(145, 100, 15);
    circle(PIZZA_X, PIZZA_Y, PIZZA_HEIGHT);
    noStroke();
    fill(250, 215, 15);
    circle(PIZZA_X, PIZZA_Y, CHEESE_HEIGHT);
    fill(255, 0, 0);
    circle(PIZZA_X + PIZZA_HEIGHT/4, PIZZA_Y + PIZZA_HEIGHT/7, PEPPERONI_HEIGHT);
    circle(PIZZA_X + PIZZA_HEIGHT/8, PIZZA_Y + PIZZA_HEIGHT/3, PEPPERONI_HEIGHT);
    circle(PIZZA_X + PIZZA_HEIGHT/4, PIZZA_Y - PIZZA_HEIGHT/5, PEPPERONI_HEIGHT);
    circle(PIZZA_X + PIZZA_HEIGHT/7, PIZZA_Y - PIZZA_HEIGHT/11, PEPPERONI_HEIGHT);
    circle(PIZZA_X + PIZZA_HEIGHT/24, PIZZA_Y - PIZZA_HEIGHT/3, PEPPERONI_HEIGHT);
    circle(PIZZA_X, PIZZA_Y + PIZZA_HEIGHT/6, PEPPERONI_HEIGHT);
    circle(PIZZA_X - PIZZA_HEIGHT/12, PIZZA_Y - PIZZA_HEIGHT/20, PEPPERONI_HEIGHT);
    circle(PIZZA_X - PIZZA_HEIGHT/8, PIZZA_Y - PIZZA_HEIGHT/4, PEPPERONI_HEIGHT);
    circle(PIZZA_X - PIZZA_HEIGHT/5, PIZZA_Y - PIZZA_HEIGHT/8, PEPPERONI_HEIGHT);
    circle(PIZZA_X - PIZZA_HEIGHT/9, PIZZA_Y + 3*PIZZA_HEIGHT/10, PEPPERONI_HEIGHT);
    circle(PIZZA_X - PIZZA_HEIGHT/3, PIZZA_Y + PIZZA_HEIGHT/9, PEPPERONI_HEIGHT);
    
    let angle = 2*PI / denominator;

    noStroke();
    fill(255);
    for (let i = 0; i < denominator; i++) {
        if (selectedSlices[i]) {
            arc(PIZZA_X, PIZZA_Y, PIZZA_HEIGHT*1.1, PIZZA_HEIGHT*1.1, angle*i, angle*(i+1));
        }
    }

    stroke(0);
    for (let i = 0; i < denominator; i++) {
        line(PIZZA_X, PIZZA_Y, PIZZA_X + PIZZA_HEIGHT/2 * Math.cos(angle * i), PIZZA_Y + PIZZA_HEIGHT/2 * Math.sin(angle * i));
    }
}


function updateCircleGoal() {
    numerator = Math.round((mouseX - LEFT_RECT_EDGE) / RECT_WIDTH);
    document.getElementById("numerator").value = bound(numerator, 0, denominator);
    circleGoalX = (numerator * RECT_WIDTH) + LEFT_RECT_EDGE;
}

function updateFilledRects() {
    numerator = getNumerator();
    if (numerator > denominator) {
        document.getElementById("numerator").value = denominator;
        numerator = denominator;
    } else if (numerator < 0) {
        document.getElementById("numerator").value = 0;
        numerator = 0;
    }
    circleGoalX = (numerator * RECT_WIDTH) + LEFT_RECT_EDGE;
    if (getSlicesSelected() != denominator - numerator) {
        correctSlices(getSlicesSelected() - (denominator - numerator));
    }
}

function updateNumRects() {
    if (denominator != getDenominator()) {
        denominator = getDenominator();
        if (denominator > BAR_WIDTH/10) {
            document.getElementById("denominator").value = BAR_WIDTH/10;
            denominator = BAR_WIDTH/10;
        }
        if (denominator < 1) {
            document.getElementById("denominator").value = 1;
            denominator = 1;
        }
        RECT_WIDTH = BAR_WIDTH/denominator;
        updateCircleGoal();
    }
    
    
}

function updateCircle() {
    if (trackingMouse) {
        circleGoalX = bound(mouseX, LEFT_RECT_EDGE, LEFT_RECT_EDGE + BAR_WIDTH);
        // circleY = mouseY;
    }
        circleX += 0.5 * (circleGoalX - circleX);
        circlex = bound(circleX, LEFT_RECT_EDGE, LEFT_RECT_EDGE + BAR_WIDTH);

}

function selectSlice() {
    let angle = PI*2 / denominator;
    let angleOfClick = Math.atan2(mouseY - PIZZA_Y, mouseX - PIZZA_X);
    if (angleOfClick < 0) {
        angleOfClick += PI*2;
    }
    let sliceNumber = Math.round((angleOfClick / angle) - 0.5);
    selectedSlices[sliceNumber] = !selectedSlices[sliceNumber];
    
    let numSlicesSelected = getSlicesSelected();
    if (denominator - numSlicesSelected != getNumerator()) {
        document.getElementById("numerator").value = denominator - numSlicesSelected;
        updateFilledRects();
    }
}

function getSlicesSelected() {
    let numSlicesSelected = 0;
    for (let i = 0; i < denominator; i++) {
        if (selectedSlices[i]) {
            numSlicesSelected++;
        }
    }
    return numSlicesSelected;
}

function correctSlices(slicesToDeselect) {
    let slicesRemaining = slicesToDeselect;
    for (let i = 0; i < denominator; i++) {
        if (selectedSlices[i] && slicesRemaining > 0) {
            selectedSlices[i] = !selectedSlices[i];
            slicesRemaining--;
        } else if (!selectedSlices[i] && slicesRemaining < 0) {
            selectedSlices[i] = !selectedSlices[i];
            slicesRemaining++;
        } else if (slicesRemaining == 0) {
            return;
        }
    }
}