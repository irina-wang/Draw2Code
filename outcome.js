function draw() {
    // draw the video
    image(capture, 0, 0, w, h);

    drawGrid();
    updateGridData();
    // drawImage(); // for drawing a duck

    // draw the label
    drawLabel();

    // drawBar();
    addCard();
    code.forEach(drawCode);
    select ('#code').elt.innerText = txt; 
}
  
function drawImage() {
    // show image on the video + need to fix the jiggling/bouncing issue
    noStroke();
    if (detected == 2) {
      rect(imageX, imageY, imageWidth, imageWidth);
      image(img, imageX, imageY, imageWidth, imageWidth);
    } 
}

function drawLabel() {
    textSize(32);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textFont('Work Sans');
    text(label, width / 2, height-200);

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

function drawBar() {
    noStroke;
    fill("#d3d3d3");
    rect(0, height-150, width, 150);
}

function getTxt(value, index) {
    // draw coding cards that are scanned
    txt = txt + value + "  +  ";
}

function drawCode(value, index) {
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // fill(0);
    // text(txt, width / 2, height-100);
    // console.log(txt);
}

function addCard() {
    if (mouseIsPressed &&
    mouseX > 0 && mouseX < width &&
    mouseY > 0 && mouseY < height) {
        if (label != "None" && label != "Undefined") {
            code.push(label);
            console.log("code: " + code);
            txt = '';
            code.forEach(getTxt);
            console.log("txt: " + code);
            
            if (label == "Behavior") {

            }
        }
    } 
}