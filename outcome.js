let angle = 0;
let index = 0;

function draw() {
    if (scan) {
        // draw the video
        // imageMode(CENTER);
        image(capture, w/2, (h-120)/2, 350, 350);

        drawGrid();
        // drawImage(); // for drawing a duck

        // draw the label
        drawLabel();
        
        
        
        // image('Reurce.png', 0, 0, 50, 50);
        

        
        // code.forEach(drawCode);
        // select ('#code').elt.innerText = txt; 
        drawCode();
        drawBottomBar();
    }    else if (play) {
        scan = false;
        // draw the video
        // imageMode(CENTER);
        image(capture, 0, 0, w, h);

        // translate(width / 2, height / 2);
        // rotate(angle);
        // strokeWeight(4);
        // stroke(255);
        // line(0, 0, 100, 0);
        // angle += 0.1;

        if (behavior[0].info.x) {
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
        }
        // }
    }
    // take snap
    // if(document.getElementById('snap').clicked == true) {
    //     takesnap();
    // }
}
  
function drawImage() {
    console.log('run button pressed')
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
    fill(0);
    textFont('Work Sans');
    text(label, w/2, 30);
    

    
    // if (label == "none" || label == "waiting...") { // new card is detected
        
    // } else {
    //     // put it into code array
    //     // code.push(label);
    // }
    imageMode(CENTER);
    let card = "";
    if (label == "Resource") {
        card = target;
        // image(target, w/2, h/3, 300, 250);
    } else if (label == "Trigger_Run") {
        card = trigger_play;
        // image(trigger_play, w/2, h/3, 300, 250);
    } else if (label == "Trigger_Scissors") {
        card = trigger_scissors;
        // image(trigger_scissors, w/2, h/3, 300, 250);
    }
    // image(card, 0, 0);

    // Draw the card
    if (card) {
        image(card, w/2, h/3, 300, 250);
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

// function drawCode() {
//     for (let i = 0; i < code.length; i++) {
        
//     }
// }

function drawBottomBar() {
    noStroke;
    fill("#fff");
    rect(0, h-120, w, 120);
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
    console.log('add card pressed');
    if (label != "None" && label != "Undefined") {
        code.push(label);
        txt = '';
        code.forEach(getTxt);


        if (label == "Resource") {
            // draw boundary in the center middle
            // provide the capture button
            // when the capture button is pressed, save the image data within the boundary
            takeSnap();
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