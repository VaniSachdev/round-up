const WIDTH = 1000;
const HEIGHT = 300;


function setup() {
    console.log("setup");

    var canvas = createCanvas(1000, HEIGHT);
    canvas.parent('sketch-holder');

   
}


function draw() {
    clear()
    if (document.getElementById("angle2").value >= 112) {
        document.getElementById("angle2").value = 112
    }

    if (document.getElementById("angle2").value <= 0) {
        document.getElementById("angle2").value = 1
    }
    generate_triangle(60, document.getElementById("angle2").value)
}

function get_triangle_type(a1, a2, a3) {
    let angles = [degrees(a1), degrees(a2), degrees(a3)]
    var type = ""
    var num_acute = 0
    angles.forEach(function(item, index, array) {
        if (Math.round(item) == 90) {
            type = "This is a Right triangle!"
        } else if (item > 90) {
            type = "This is an Obtuse triangle!"
        } else if (item < 90) {
            num_acute += 1
        }
    })
    if (num_acute == 3) {
        type = "This is an Acute triangle!"
    }
    if (angles[0] + angles[1] == 90) {
        type = "This is a Right triangle!"  
    }
    
    return type

}
function generate_triangle(angle1, angle2) {
    var triangle_origin_x = 300
    var triangle_origin_y = 0
    var base_side_length = 200
    var angle3 = radians(180 - (angle1 + angle2))
    angle1 = radians(angle1)
    angle2 = radians(angle2)
    var side_b_length, max_height, triangle_last_x, triangle_last_y
    triangle_last_y = -1
    while (triangle_last_y < 0 || triangle_last_y > HEIGHT) {
        side_b_length = (base_side_length * Math.sin(angle1))/Math.sin(angle3)
        max_height = side_b_length * Math.sin(angle2);
        triangle_last_x = triangle_origin_x - (side_b_length * Math.cos(angle2))
        triangle_last_y = triangle_origin_y - (side_b_length * Math.sin(angle2))
        base_side_length = base_side_length - 5    
    }
    if (base_side_length < 100) {
        base_side_length = 50
        side_b_length = (base_side_length * Math.sin(angle1))/Math.sin(angle3)
        max_height = side_b_length * Math.sin(angle2);
        triangle_last_x = triangle_origin_x - (side_b_length * Math.cos(angle2))
        triangle_last_y = triangle_origin_y - (side_b_length * Math.sin(angle2))
        
    }
    var canvas = createCanvas(1000, HEIGHT );
    canvas.parent('sketch-holder');
    fill("#accbf4")
    noStroke()
    triangle(triangle_origin_x, triangle_origin_y, triangle_origin_x + base_side_length, triangle_origin_y, triangle_last_x, triangle_last_y)
    document.getElementById("type").innerText = get_triangle_type(angle1, angle2, angle3)
}




