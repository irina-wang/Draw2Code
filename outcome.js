function draw() {
    // draw the video
    image(capture, 0, 0, w, h);

    drawGrid();
    updateGridData();
    drawImage();

    // draw the label
    drawLabel();

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
    fill(255);
    text(label, width / 2, height - 16);

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
    textSize(256);
    // text(emoji, width / 2, height / 2);
}