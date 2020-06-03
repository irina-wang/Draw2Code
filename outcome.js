function draw() {
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
  
function drawImage() {
    // show image on the video + need to fix the jiggling/bouncing issue
    // noStroke();
    // if (detected == 2) {
    //   image(resource, x, y, width, height);
    // } 

    noStroke();
    image(img, 30, 100, 40, 40);
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
    // Pick an emoji, the "default" is train
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
    drawImage();
}