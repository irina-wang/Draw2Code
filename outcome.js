let angle = 0;
let index = 0;

function draw() {
    if (scan) {
        // draw the video
        image(capture, w/3, 50, 350, 350);

        drawGrid();
        updateGridData();
        // drawImage(); // for drawing a duck

        // draw the label
        drawLabel();
        // drawCard

        // drawBar();
        if (mouseIsPressed &&
            mouseX > 0 && mouseX < width &&
            mouseY > 0 && mouseY < height) {
                addCard();
        }
        code.forEach(drawCode);
        select ('#code').elt.innerText = txt; 
    }

    
    if (run) {
        // translate(width / 2, height / 2);
        // rotate(angle);
        // strokeWeight(4);
        // stroke(255);
        // line(0, 0, 100, 0);
        // angle += 0.1;

        
        // for (let i = 0; i < snapshots.length; i++) {
            noStroke();
            let x = behavior[index].info.x;
            let y = behavior[index].info.y;
            let height = behavior[index].info.height;
            let width = behavior[index].info.width;
            image(snapshots[index], x, y, width, height); // make them repeat 
            index = (index + 1) % snapshots.length;
            
            // console.log(i);
            console.log(run);
        // }
    }
    // take snap
    // if(document.getElementById('snap').clicked == true) {
    //     takesnap();
    // }
}
  
function drawImage() {
    run = true;
    scan = false;
    // show image on the video + need to fix the jiggling/bouncing issue
    // noStroke();
    // if (detected == 2) {
    //   image(resource, x, y, width, height);
    // } 

    // for (let i = 0; i < snapshots.length; i++) {
    //     noStroke();
    //     image(snapshots[i], 0, 0, 60, 60); 
    //     console.log('drawing');
    // }
}

function drawLabel() {
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textFont('Work Sans');
    text(label, width / 2, h-200);

    if (label == "none" || label == "waiting...") { // new card is detected
        
    } else {
        // put it into code array
        // code.push(label);
    }
    // the "default" is none
    // let emoji = "🚂";
    // if (label == "Rainbow") {
    // emoji = "🌈";
    // } else if (label == "Unicorn") {
    // emoji = "🦄";
    // } else if (label == "Ukulele") {
    // emoji = "🎸";
    // }

    // Draw the emoji
    // textSize(256);
    // text(emoji, width / 2, height / 2);
}

function drawCard() {
    // add graphics for each class to assets folder
    // draw graphic of the currently detected card in the center middle
}

function drawBar() {
    noStroke;
    fill("#d3d3d3");
    rect(0, h, width, 150);
}

function getTxt(value, index) {
    // draw coding cards that are scanned
    txt = txt + value + "  +  ";  // show the code on the bottom bar
}

function drawCode(value, index) {
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // fill(0);
    // text(txt, width / 2, height-100);
    // console.log(txt);
}

function addCard() {
    if (label != "None" && label != "Undefined") {
        code.push(label);
        txt = '';
        code.forEach(getTxt);

        if (label == "Resource") {
            // draw boundary in the center middle
            // provide the capture button
            // when the capture button is pressed, save the image data within the boundary
        }

        if (label == "Behavior") {
            let info = {x: imageX, y: imageY, width: imageWidth, height: imageHeight};
            behavior.push({info: info});
        }

        console.log("txt: " + code);
        console.log("behavior: " + behavior);
    }
}

function runProgram() {
    run = true;
    drawImage();
}

function drawAnimation() {
    for (let i = 0; i < snapshots.length; i++) {
        let w1 = 80;
        let h1 = 60;
        let x1 = 0;
        let y1 = 0;
        image(snapshots[i], 0, 0);

    }
}