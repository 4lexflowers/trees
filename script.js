var a = Math.PI/4;
var slider, animated, angle, showGrid, weight, quadtree, subthree, subfour, treeNumber, gridType, pixelPerfect;
var age = 0, seed = 0;
var treeinfo;
var amount = 30;
var gridinfo = "";
var branchinfo = [];
var trees = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    trees.push(width/2);

    animated = createCheckbox("animate age");
    animated.position(50, 50);
    animated.style("color", "white");
    animated.mousePressed(function() { if(!animated.checked()) age = -PI/2 });

    slider = createSlider(10, 180, 180);
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
    seed = createInput("3", "number");
    seed.style("width", "50px");
    seed.changed(function() {
      generate(180);
      calcquad();
    });
    seed.position(140, 205);

    let angleText = createP("angle margin:");
    angleText.style("color", "white");
    angleText.position(50, 250);
    angle = createSlider(0, PI/2, 0, 0.01);
    angle.position(145, 266);
    angle.style("width", "80px");

    let weightText = createP("stroke weight:");
    weightText.style("color", "white");
    weightText.position(50, 220);
    weight = createSlider(0, amount/2, 4);
    weight.position(150, 236);
    weight.style("width", "80px");

    let amountText = createP("number of trees:");
    amountText.style("color", "white");
    amountText.position(50, 280);
    treeNumber = createSlider(1, 7, 1, 1);
    treeNumber.position(160, 295);
    treeNumber.style("width", "80px");

    let gridText = createP("grid type:");
    gridText.style("color", "white");
    gridText.position(50, 310);
    gridType = createSelect();
    gridType.option("block");
    gridType.option("tree check");
    gridType.option("pixel perfect check");
    gridType.position(120, 326);
    gridType.selected("tree check");

    pixelPerfect = createCheckbox("pixel perfect");
    pixelPerfect.position(50, 360);
    pixelPerfect.style("color", "white");

    calcquad();
    generate(180);
}

function draw() {
  if(animated.checked()) { 
    slider.value(map(sin(age), -1, 1, 10, 180));
    age+=0.05;
  }
  
  tree();
  if(showGrid.checked()) grid();
}