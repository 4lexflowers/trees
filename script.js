// extra todo: subdiv with stretch + fancy UI + separate ages
// important: fix randomness in branches???

var a = Math.PI/4;
var slider, animated, angle, showGrid, weight, quadtree, gridSlider;
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
    //animated.style("display", "inline");
    animated.position(50, 50);
    animated.style("color", "white");
    animated.mousePressed(function() { if(!animated.checked()) age = -PI/2 });

    slider = createSlider(10, 180, 120);
    slider.mouseReleased(tree);
    slider.position(50, 75);
    //createElement("br");

    showGrid = createCheckbox("show grid");
    //showGrid.style("display", "inline");
    showGrid.checked(true);
    showGrid.position(50, 100);
    showGrid.style("color", "white");
    //createElement("br");

    quadtree = createCheckbox("apply quadtree");
    //quadtree.style("display", "inline");
    quadtree.checked(true);
    quadtree.position(50, 125);
    quadtree.style("color", "white");
    //createElement("br");

    seed = createInput("6", "number");
    seed.style("width", "100px");
    seed.changed(calcquad);
    seed.position(50, 150);

    angle = createSlider(PI/16, PI/4, PI/8, 0.01);
    angle.position(50, 175);
    //createElement("br");

    weight = createSlider(0, amount, 4);
    weight.position(50, 200);
    //gridSlider = createInput("30", "number");
    //gridSlider.position(50, 225);
    //gridSlider.style("width", "100px");
    //gridSlider.changed(calcquad);

    // simpleCheck = createCheckbox("simple color checking");
    // simpleCheck.checked(false);
    // simpleCheck.position(50, 250);
    // simpleCheck.style("color", "white");

    addTree = createButton("add tree");
    addTree.position(50, 225);
    addTree.mousePressed(function() { trees.push(random(width)); });
    removeTree = createButton("remove tree");
    removeTree.position(50, 250);
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