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
        drawBottomBar();
        drawCode();
        
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
    let cardW = 0;
    let cardH = 0;
    if (label == "Resource") {
        card = Resource;
        cardW = 340;
        cardH = 250;
    } else if (label == "Trigger_Run") {
        card = Trigger_Run;
        cardW = 300;
        cardH = 250;
    } else if (label == "Trigger_Scissors") {
        card = Trigger_Scissors;
    } else if (label == "Behavior") {
        card = Behavior;
        cardW = 400;
        cardH = 250;
    }

    // Draw the card
    if (card) {
        image(card, w/2, (h-120)/2, cardW, cardH);
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

function drawCode() {
    let item = '';
    let itemX = 80;
    let itemW = 0;
    let itemGap = 0;
    let drawing;

    for (let i = 0; i < code.length; i++) {
        item = code[i];

        if (item == "Resource") {
            item = Resource;
            itemW = 145;
            itemGap = itemW - 20;
            drawing = snapshots[i]; // need to update later
        } else if (item == "Trigger_Run") {
            item = Trigger_Run;
            itemW = 120;
            itemGap = itemW + 15;
        } else if (item == "Trigger_Scissors") {
            item = Trigger_Scissors;
            itemW = 175;
            itemGap = itemW + 15;
        } else if (item == "Behavior") {
            item = Behavior;
            itemW = 175;
            itemGap = itemW - 12;
        }


        image(item, itemX, h-60, itemW, 100);

        if (drawing) {
            image(drawing, itemX+10, h-60, 75, 75);
        }

        itemX = itemX + itemGap;
    }
    

    // for (let i = 0; i < code.length; i++) {
    //     item = code[i];
    //     image(item, itemX, h-60, 150, 150);
    //     itemX = itemX + 100;
}

function addCard() {
    if (label != "None" && label != "Undefined" && label != "waiting...") {
        code.push(label);
        // txt = '';
        // code.forEach(getTxt);


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

        // console.log("txt: " + code);
        // console.log("behavior: " + behavior);
    }
}

function takeSnap() {
    snapshots.push(get((w/2)-70, (h-120)/2-100, 190, 190));
    // snapshots.push(capture.get()); // grabbing pixel from the image itself
    console.log('snapped');
    // console.log(snapshots[0]);
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