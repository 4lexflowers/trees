function grid() {
    background(0);
    rectMode(CORNER);
    stroke(0);
    let gridSize = int(width/amount);
    
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        let foundColors = [];
        
        for (let i = 0; i < gridSize; i++) {
            foundColors[i] = [];
            for (let j = 0; j < gridSize; j++) {
                let px = x + i;
                let py = y + j;
    
                if (px < width && py < height) {
                    let index = (px + py * treeinfo.width) * 4;
                    let r = treeinfo.pixels[index];
                    let g = treeinfo.pixels[index + 1];
                    let b = treeinfo.pixels[index + 2];
                    if(r == 0 && g == 128 && b == 0) {
                        foundColors[i][j] = 1;
                    } else if(r == 200 && g == 120 && b == 50) {
                        foundColors[i][j] = 2;
                    } else foundColors[i][j] = 0;
                }
            }
        }
        
        let index = (x/gridSize + y/gridSize * amount) * (1 + 2*8);
        // let greens = ["#03FF00", "#02C600", "#028E0D"];
        // let beiges = ["#DBB77D", "#FCF2C8"];

        // if(foundColors === 1) fill(greens[int(gridinfo[index+1])-1]);
        // else if(foundColors === 2) fill(beiges[int(gridinfo[index+2])-1]);
        // else fill(0);
        stroke(0);
        strokeWeight(weight.value());
        
        push();
            translate(0, height%gridSize);
            if(quadtree.checked() && gridinfo[index] == "Q") {
                drawSquare(foundColors, x, y, x, y, gridSize/2, 0);
                drawSquare(foundColors, x, y, x+gridSize/2, y, gridSize/2, 1);
                drawSquare(foundColors, x, y, x, y+gridSize/2, gridSize/2, 2);
                drawSquare(foundColors, x, y, x+gridSize/2, y+gridSize/2, gridSize/2, 3);
                // square(x, y, gridSize/2);
                // square(x+gridSize/2, y, gridSize/2);
                // square(x, y+gridSize/2, gridSize/2);
                // square(x+gridSize/2, y+gridSize/2, gridSize/2);
            } else if(subfour.checked() && gridinfo[index] == "f") {
                drawSquare(foundColors, x, y, x, y, gridSize/4, 0);
                drawSquare(foundColors, x, y, x+gridSize/4, y, gridSize/4, 1);
                drawSquare(foundColors, x, y, x+gridSize/2, y, gridSize/4, 2);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y, gridSize/4, 3);
                drawSquare(foundColors, x, y, x, y+gridSize/4, gridSize/4, 4);
                drawSquare(foundColors, x, y, x, y+gridSize/2, gridSize/4, 5);
                drawSquare(foundColors, x, y, x, y+gridSize/4*3, gridSize/4, 6);
                drawSquare(foundColors, x, y, x+gridSize/4, y+gridSize/4, gridSize/4*3, 7);
            } else if(subfour.checked() && gridinfo[index] == "o") {
                drawSquare(foundColors, x, y, x, y, gridSize/4, 0);
                drawSquare(foundColors, x, y, x+gridSize/4, y, gridSize/4, 1);
                drawSquare(foundColors, x, y, x+gridSize/2, y, gridSize/4, 2);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y, gridSize/4, 3);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/4, gridSize/4, 4);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/2, gridSize/4, 5);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/4*3, gridSize/4, 6);
                drawSquare(foundColors, x, y, x, y+gridSize/4, gridSize/4*3, 7);
            } else if(subfour.checked() && gridinfo[index] == "u") {
                drawSquare(foundColors, x, y, x, y, gridSize/4, 0);
                drawSquare(foundColors, x, y, x+gridSize/4, y+gridSize/4*3, gridSize/4, 1);
                drawSquare(foundColors, x, y, x+gridSize/2, y+gridSize/4*3, gridSize/4, 2);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/4*3, gridSize/4, 3);
                drawSquare(foundColors, x, y, x, y+gridSize/4, gridSize/4, 4);
                drawSquare(foundColors, x, y, x, y+gridSize/2, gridSize/4, 5);
                drawSquare(foundColors, x, y, x, y+gridSize/4*3, gridSize/4, 6);
                drawSquare(foundColors, x, y, x+gridSize/4, y, gridSize/4*3, 7);
            } else if(subfour.checked() && gridinfo[index] == "R") {
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/4*3, gridSize/4, 0);
                drawSquare(foundColors, x, y, x, y+gridSize/4*3, gridSize/4, 1);
                drawSquare(foundColors, x, y, x+gridSize/4, y+gridSize/4*3, gridSize/4, 2);
                drawSquare(foundColors, x, y, x+gridSize/2, y+gridSize/4*3, gridSize/4, 3);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y, gridSize/4, 4);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/4, gridSize/4, 5);
                drawSquare(foundColors, x, y, x+gridSize/4*3, y+gridSize/2, gridSize/4, 6);
                drawSquare(foundColors, x, y, x, y, gridSize/4*3, 7);
            } else if(subthree.checked() && gridinfo[index] == "t") {
                drawSquare(foundColors, x, y, x, y, gridSize/3, 0);
                drawSquare(foundColors, x, y, x+gridSize/3, y, gridSize/3, 1);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y, gridSize/3, 2);
                drawSquare(foundColors, x, y, x, y+gridSize/3, gridSize/3, 3);
                drawSquare(foundColors, x, y, x, y+gridSize/3*2, gridSize/3, 4);
                drawSquare(foundColors, x, y, x+gridSize/3, y+gridSize/3, gridSize/3*2, 5);
            } else if(subthree.checked() && gridinfo[index] == "h") {
                drawSquare(foundColors, x, y, x+gridSize/3*2, y+gridSize/3*2, gridSize/3, 0);
                drawSquare(foundColors, x, y, x+gridSize/3, y+gridSize/3*2, gridSize/3, 1);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y, gridSize/3, 2);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y+gridSize/3, gridSize/3, 3);
                drawSquare(foundColors, x, y, x, y+gridSize/3*2, gridSize/3, 4);
                drawSquare(foundColors, x, y, x, y, gridSize/3*2, 5);
            } else if(subthree.checked() && gridinfo[index] == "r") {
                drawSquare(foundColors, x, y, x, y, gridSize/3, 0);
                drawSquare(foundColors, x, y, x+gridSize/3, y, gridSize/3, 1);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y, gridSize/3, 2);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y+gridSize/3, gridSize/3, 3);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y+gridSize/3*2, gridSize/3, 4);
                drawSquare(foundColors, x, y, x, y+gridSize/3, gridSize/3*2, 5);
            } else if(subthree.checked() && gridinfo[index] == "e") {
                drawSquare(foundColors, x, y, x, y, gridSize/3, 0);
                drawSquare(foundColors, x, y, x+gridSize/3, y+gridSize/3*2, gridSize/3, 1);
                drawSquare(foundColors, x, y, x+gridSize/3*2, y+gridSize/3*2, gridSize/3, 2);
                drawSquare(foundColors, x, y, x, y+gridSize/3, gridSize/3, 3);
                drawSquare(foundColors, x, y, x, y+gridSize/3*2, gridSize/3, 4);
                drawSquare(foundColors, x, y, x+gridSize/3, y, gridSize/3*2, 5);
            } else drawSquare(foundColors, x, y, x, y, gridSize, 0);
        pop();
      }
    }
}

function calcquad() {
    randomSeed(seed.value());
    gridinfo = "";
    let gridSize = int(width/amount);
    let availableSubs = ["0"];
    if(quadtree.checked()) availableSubs.push("Q");
    if(subthree.checked()) availableSubs.push("t", "h", "r", "e");
    if(subfour.checked()) availableSubs.push("f", "o", "u", "R");
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        let isQuad = random(availableSubs);
        gridinfo = gridinfo + isQuad;
        for (let c = 0; c < 8; c++) {
            let greenColor = random(["1", "2", "3"]);
            gridinfo = gridinfo + greenColor;
            let beigeColor = random(["1", "2"]);
            gridinfo = gridinfo + beigeColor;
        }
      }
    }
}

function drawSquare(colorArray, x, y, tx, ty, s, ind) {
    let gridSize = int(width/amount);
    let index = (x/gridSize + y/gridSize * amount) * (1 + 2*8);
    let greens = ["#03FF00", "#02C600", "#028E0D"];
    let beiges = ["#DBB77D", "#FCF2C8"];

    let atLeastOne = {green: false, brown: false};
    let majority = [0, 0, 0];

    let checkStart, checkEnd;
    if(gridType.selected() == "block") {
        checkStart = [0, 0];
        checkEnd = [gridSize, gridSize];
    } else {
        checkStart = [int(tx-x), int(ty-y)];
        checkEnd = [int(tx-x+s), int(ty-y+s)];
    }

    for (let i = checkStart[0]; i < checkEnd[0]; i++) {
        for (let j = checkStart[1]; j < checkEnd[1]; j++) {
            // if(colorArray[i]) {
                if((colorArray[i][j] != undefined && gridType.selected() == "pixel perfect check") ||
                    (colorArray[i][j] && gridType.selected() == "tree check") || gridType.selected() == "block") {  
                    if(colorArray[i][j] === 1) {
                        majority[1]++;
                        atLeastOne.green = true;
                    } else if(colorArray[i][j] === 2) {
                        majority[2]++;
                        atLeastOne.brown = true;
                    } else if(colorArray[i][j] === 0) {
                        majority[0]++;
                    }
                }
            // }
        }
    }
    //if(mouseX > tx && mouseX < tx + s && mouseY > ty && mouseY < ty + s) print(majority[0], majority[1], majority[2]);

    if(gridType.selected() == "block") {
        if(atLeastOne.green) fill(greens[int(gridinfo[index+1])-1]);
        else if(atLeastOne.brown) fill(beiges[int(gridinfo[index+2])-1]);
        else fill(0);
    } else {
        if(majority[1] > majority[2] && majority[1] > majority[0])
            fill(greens[int(gridinfo[index+1+2*ind])-1]);
        else if(majority[2] > majority[0] && majority[2] > majority[1])
            fill(beiges[int(gridinfo[index+2+2*ind])-1]);
        else fill(0);
    }

    square(tx, ty, s);
}