function grid() {
    background(0);
    rectMode(CORNER);
    stroke(0);
    let gridSize = int(width/amount);
    
    let margin = gridSize*5;
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        let foundColor = 0;
        
        // if(!simpleCheck.checked()) {
            // this checks EACH pixel, maybe we could do corners + center
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    let px = x + i;
                    let py = y + j;
        
                    if (px < width && py < height) {
                        let index = (px + py * treeinfo.width) * 4;
                        let r = treeinfo.pixels[index];
                        let g = treeinfo.pixels[index + 1];
                        let b = treeinfo.pixels[index + 2];
                        if(r == 0 && g == 128 && b == 0) {
                            foundColor = 1;
                        } else if(r == 200 && g == 120 && b == 50 && foundColor === 0) {
                            foundColor = 2;
                        }
                    }
                }
            }
        // } else {
        //     let pXs = [x, x+gridSize, x+gridSize/2, x, x+gridSize];
        //     let pYs = [y, y, y+gridSize/2, y+gridSize, y+gridSize];
        //     for(let p = 0; p < 5; p++) {
        //         let px = pXs[p];
        //         let py = pYs[p];

        //         let index = (px + py * treeinfo.width) * 4;
        //         let r = treeinfo.pixels[index];
        //         let g = treeinfo.pixels[index + 1];
        //         let b = treeinfo.pixels[index + 2];
        //         if(r == 0 && g == 128 && b == 0) {
        //             foundColor = 1;
        //         } else if(r == 200 && g == 120 && b == 50 && foundColor === 0) {
        //             foundColor = 2;
        //         }
        //     }
        // }

        stroke(0);
        strokeWeight(weight.value());
        
        let index = (x/gridSize + y/gridSize * amount) * 3;
        let greens = ["#03FF00", "#02C600", "#028E0D"];
        let beiges = ["#DBB77D", "#FCF2C8"];
        if(foundColor === 1)
        fill(greens[int(gridinfo[index+1])-1]);
        else if(foundColor === 2)
        fill(beiges[int(gridinfo[index+2])-1]);
        else
        fill(0);
        
        push();
            translate(0, height%gridSize);
            if(quadtree.checked() && gridinfo[index] == "Q") {
                square(x, y, gridSize/2);
                square(x+gridSize/2, y, gridSize/2);
                square(x, y+gridSize/2, gridSize/2);
                square(x+gridSize/2, y+gridSize/2, gridSize/2);
            } else if(quadtree.checked() && gridinfo[index] == "1") {
                square(x, y, gridSize/4);
                square(x+gridSize/4, y, gridSize/4);
                square(x+gridSize/2, y, gridSize/4);
                square(x+gridSize/4*3, y, gridSize/4);
                square(x, y+gridSize/4, gridSize/4);
                square(x, y+gridSize/2, gridSize/4);
                square(x, y+gridSize/4*3, gridSize/4);
                square(x+gridSize/4, y+gridSize/4, gridSize/4*3);
            } else if(quadtree.checked() && gridinfo[index] == "2") {
                square(x, y, gridSize/3);
                square(x+gridSize/3, y, gridSize/3);
                square(x+gridSize/3*2, y, gridSize/3);
                square(x, y+gridSize/3, gridSize/3);
                square(x, y+gridSize/3*2, gridSize/3);
                square(x+gridSize/3, y+gridSize/3, gridSize/3*2);
            } else square(x, y, gridSize);
        pop();
      }
    }

    // noFill(); stroke(255); strokeWeight(1);
    // rect(margin, height%gridSize, width - margin*2, int(height/gridSize)*gridSize);
}

function calcquad() {
    randomSeed(seed.value());
    gridinfo = "";
    let gridSize = int(width/amount);
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        let isQuad = random(["Q", "N", "1", "2", "3", "4"]);
        gridinfo = gridinfo + isQuad;
        let greenColor = random(["1", "2", "3"]);
        gridinfo = gridinfo + greenColor;
        let beigeColor = random(["1", "2"]);
        gridinfo = gridinfo + beigeColor;
      }
    }
    //print(gridinfo);
}