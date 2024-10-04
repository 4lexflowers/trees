// extra todo: subdiv with stretch + fancy UI + separate ages
// important: fix randomness in branches???

var a = Math.PI/4;
var slider, animated, angle, showGrid, weight, quadtree, subthree, subfour, gridSlider;
var simpleCheck, addTree, removeTree;
var age = 0, seed = 0;
var treeinfo;
var amount = 30;
var gridinfo = "";
var trees = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    trees.push(width/2);

    animated = createCheckbox("animate age");
    animated.position(50, 50);
    animated.style("color", "white");
    animated.mousePressed(function() { if(!animated.checked()) age = -PI/2 });

    slider = createSlider(10, 180, 120);
    slider.mouseReleased(tree);
    slider.position(50, 75);

    showGrid = createCheckbox("show grid");
    showGrid.checked(true);
    showGrid.position(50, 100);
    showGrid.style("color", "white");

    quadtree = createCheckbox("apply 1/2");
    quadtree.checked(true);
    quadtree.position(70, 125);
    quadtree.style("color", "white");
    quadtree.changed(calcquad);
    subthree = createCheckbox("apply 1/3");
    subthree.checked(true);
    subthree.position(70, 150);
    subthree.style("color", "white");
    subthree.changed(calcquad);
    subfour = createCheckbox("apply 1/4");
    subfour.checked(false);
    subfour.position(70, 175);
    subfour.style("color", "white");
    subfour.changed(calcquad);

    let seedText = createP("seed number:");
    seedText.style("color", "white");
    seedText.position(50, 190);
    seed = createInput("6", "number");
    seed.style("width", "50px");
    seed.changed(calcquad);
    seed.position(140, 205);

    let angleText = createP("branch angles:");
    angleText.style("color", "white");
    angleText.position(50, 220);
    angle = createSlider(PI/16, PI/4, PI/8, 0.01);
    angle.position(150, 236);

    let weightText = createP("stroke weight:");
    weightText.style("color", "white");
    weightText.position(50, 250);
    weight = createSlider(0, amount, 4);
    weight.position(150, 267);

    // gridSlider = createInput("30", "number");
    // gridSlider.position(50, 225);
    // gridSlider.style("width", "100px");
    // gridSlider.changed(calcquad);

    // simpleCheck = createCheckbox("simple color checking");
    // simpleCheck.checked(false);
    // simpleCheck.position(50, 250);
    // simpleCheck.style("color", "white");

    addTree = createButton("add tree");
    addTree.position(50, 300);
    addTree.mousePressed(function() { trees.push(random(width)); });
    removeTree = createButton("remove tree");
    removeTree.position(50, 330);
    removeTree.mousePressed(function() { if(trees.length > 1) trees.pop(); });

    calcquad();
}

function draw() {
  a = angle.value();
  //amount = int(gridSlider.value());
  
  if(animated.checked()) { 
    slider.value(map(sin(age), -1, 1, 10, 180));
    age+=0.05;
  }
  
  tree();
  if(showGrid.checked()) grid();
}