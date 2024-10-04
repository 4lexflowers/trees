function tree() {
    randomSeed(seed.value());
    background(0);

    trees.forEach(tree => {
        push();
        translate(tree, height); // root
        branch(slider.value());
        pop();
    });

    // push();
    //   translate(width/2, height); // root
    //   branch(slider.value());
    // pop();
    // push();
    //   translate(width/4, height); // root
    //   branch(slider.value()/2);
    // pop();
    treeinfo = get();
    treeinfo.loadPixels();
}

function branch(len) {
    rectMode(CENTER);
    noStroke();
    if(len > 30) {
      noStroke(); fill(200, 120, 50);
      rect(0, -len/2, len/3, len);
  
      translate(0, -len);
      let s = random(0.6, 0.85);
      //a = random(PI/16, PI/4);
      
      if(random() > 0.5 && len > 60) {
        push();
          rotate(a*3);
          branch(len/2);
        pop();
      }
      if(random() > 0.5 && len > 60) {
        push();
          rotate(-a*3);
          branch(len/2);
        pop();
      }
      
      push();
        rotate(a);
        branch(len * s);
      pop();
      push();
        rotate(-a);
        branch(len * s);
      pop();
    } else if(len > 22.5) {
      fill("green");
      square(0, 0, len*1.5);
    } else {
      fill("green");
      square(0, 0, len);
    }
}