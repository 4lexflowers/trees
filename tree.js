function tree() {
    background(0);

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
}