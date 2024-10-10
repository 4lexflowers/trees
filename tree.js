function tree() {
    background(0);

    /* old tree with fractal */
    // randomSeed(seed.value());
    // trees.forEach(tree => {
    //     push();
    //     translate(tree, height); // root
    //     branch(slider.value());
    //     pop();
    // });

    /* same thing as below, but for a single tree. this also contains a different way to check for leaves which i couldn't solve for now
    push();
    translate(width/2, height);
    branchinfo.forEach((branch, i) => {
      if(branch.type == "branch") {
        let mappedAge = map(slider.value(), 10, 180, 0.12, 1);
        let agedSize = branch.size * mappedAge;
        rectMode(CENTER); noStroke();
        if(agedSize > 20) {
          noStroke(); fill(200, 120, 50);
          let isLast = false;
          if(branchinfo[i+1] && branchinfo[i+1].type == "pop") { // this means it is the last branch, no children
            isLast = true;
            //fill("red");
          }
          // the entire code below is wrong because i forgot the children are inserted in the middle of the array instead of the end... i'm leaving this here for future reference :/
          // else if(branchinfo[i+1].type == "push") { // this means it has at least one children, so we gotta check their sizes according to mappedAge
          //   let visibleChild = false; // does it have at least one child who is big enough to show up?
          //   for (let j = 2; j <= 14; j += 3) { // THIS IS WRONG I NEED TO FIX THIS
          //     const childIndex = i + j;
          //     if (childIndex < branchinfo.length) {
          //       if (branchinfo[childIndex].type == "branch" && branchinfo[childIndex].size * mappedAge > 20) {
          //           visibleChild = true;
          //           break;
          //       }
          //       else if(branchinfo[childIndex].type != "branch") break; // this breaks if there are less than four children
          //     } else break;
          //   }
          //   if(!visibleChild) {
          //     fill("blue");
          //   } 
          // }
          let mappedAngle = map(branch.ang, 0, PI, angle.value(), PI-angle.value());
          rotate(mappedAngle - PI/2);
          rect(0, -agedSize/2, agedSize/3, agedSize);
          translate(0, -agedSize);
          if(isLast){
            fill("green");
            square(0, 0, agedSize);
          }
        }
        else {
          fill("green");
          square(0, 0, agedSize);
        }
      }
      else if(branch.type == "push") push();
      else if(branch.type == "pop") pop();
    });
    pop();
    */

    trees.forEach((t, p) => {
      if(treeNumber.value() > p) {
        push();
        let positions = [width/2, width/4, width*3/4, width*3/8, width*5/8, width*1/8, width*7/8]
        translate(positions[p], height);
        t.forEach((branch, i) => {
          if(branch.type == "branch") {
            let mappedAge = map(slider.value(), 10, 180, 0.12, 1);
            let agedSize = branch.size * mappedAge;
            agedSize *= map(int((p+1)/2), 0, 3, 1, 0.5);
            rectMode(CENTER); noStroke();
            if(agedSize > 20) {
              noStroke(); fill(200, 120, 50);
              let isLast = false;
              if(t[i+1] && t[i+1].type == "pop") isLast = true;
              let mappedAngle = map(branch.ang, 0, PI, angle.value(), PI-angle.value());
              rotate(mappedAngle - PI/2);
              rect(0, -agedSize/2, agedSize/3, agedSize);
              translate(0, -agedSize);
              if(isLast){
                fill("green");
                square(0, 0, agedSize);
              }
            }
            else {
              fill("green");
              square(0, 0, agedSize);
            }
          }
          else if(branch.type == "push") push();
          else if(branch.type == "pop") pop();
        });
        pop();
      }
    });

    treeinfo = get();
    treeinfo.loadPixels();
}

/* not being used right now, old branch function with fractal */
// function branch(len) {
//     rectMode(CENTER);
//     noStroke();
//     if(len > 30) {
//       noStroke(); fill(200, 120, 50);
//       rect(0, -len/2, len/3, len);
//       translate(0, -len);
//       let s = random(0.6, 0.85);
//       if(random() > 0.5 && len > 60) {
//         push();
//           rotate(a*3);
//           branch(len/2);
//         pop();
//       }
//       if(random() > 0.5 && len > 60) {
//         push();
//           rotate(-a*3);
//           branch(len/2);
//         pop();
//       }
//       push();
//         rotate(a);
//         branch(len * s);
//       pop();
//       push();
//         rotate(-a);
//         branch(len * s);
//       pop();
//     } else if(len > 22.5) {
//       fill("green");
//       square(0, 0, len*1.5);
//     } else {
//       fill("green");
//       square(0, 0, len);
//     }
// }

function generate(l) {
  randomSeed(seed.value());
  trees = [];
  for(let arv = 0; arv < 7; arv++) {
    let len = l;
    branchinfo = [{
      type: "branch",
      size: l,
      ang: PI/2,
      visible: true,
      fresh: true
    }];
    for(let bg = 0; bg < 6; bg++) {
      let newinfo = [];
      for (var i = 0; i < branchinfo.length; i++) {
        let current = branchinfo[i];
        if(current.fresh && current.visible) {
          current.fresh = false;
          newinfo.push(current);
          for(let bn = 0; bn < 4; bn++) {
            let chance = [true, false];
            if(bn == 1 || bn == 2) chance = 0.95;
            if(bn == 0 || bn == 3) chance = 0.2;
            let newBranch = {
              type: "branch",
              size: current.size * random(0.6, 0.85),
              ang: random(PI/4 * bn, PI/4 + PI/4 * bn),
              visible: random() < chance ? true : false,
              fresh: random() < chance ? true : false
            };
            if(newBranch.visible) {
              gotSplit = true;
              newinfo.push({type: "push"});
              newinfo.push(newBranch);
              newinfo.push({type: "pop"});
            }
          }
        } else {
          newinfo.push(current);
        }
      }
      branchinfo = newinfo;
    }
    trees.push(branchinfo);
  }
  // print(branchinfo);
}