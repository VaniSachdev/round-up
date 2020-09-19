const WIDTH = 1000;
const HEIGHT = 500;

const BAR_WIDTH = 8*WIDTH/10;
const BAR_HEIGHT = HEIGHT/10;

const RECT_WIDTH = BAR_WIDTH/10;
const RECT_HEIGHT = BAR_HEIGHT;
const LEFT_RECT_EDGE = (WIDTH - BAR_WIDTH)/2;
const TOP_RECT_EDGE = (HEIGHT - BAR_HEIGHT)/2;

void setup() {
    size(WIDTH, HEIGHT);
    // noStroke();
}

var circleX = WIDTH/2;
var circleY = HEIGHT/2;

void draw() {
    background(255);
    if (mousePressed == true) {
        circleX = mouseX;
        circleY = mouseY;
    }
    fill(255);
    for (var i = 0; i < 10; i++) {
        rect(LEFT_RECT_EDGE + RECT_WIDTH*i, TOP_RECT_EDGE, RECT_WIDTH, RECT_HEIGHT);
    }
    fill(255, 0, 0);
    ellipse(circleX, circleY, 20, 20);
}