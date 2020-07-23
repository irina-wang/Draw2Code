// detect HTTP or HTTPS then force HTTPS
// if (location.protocol != 'https:') {
//     location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }

// if (window.matchMedia("(orientation: portrait)").matches) {
//     // you're in PORTRAIT mode
//  }
 
//  if (window.matchMedia("(orientation: landscape)").matches) {
//     // you're in LANDSCAPE mode
// }

// the video
let capture;
let w = window.innerWidth;
    h = window.innerHeight;

// const playBtn = document.getElementById('play');

// display the label
let label = 'waiting...';
let button;

let play = false;
let scan = true;

// display the code scanned
let code = [];
let txt = '';
let behavior = [];
let snapshots = [];
let targets = [];

// card images
let target;
let trigger_play;
let trigger_scissors;
let duck;

function preload() {
    // preload() is not working for some reason 
    console.log('called');
    // preload() runs once
    // target = loadImage('assets/cards/Resource.png');
    // trigger_play = loadImage('assets/cards/Trigger_Play.png');
    // trigger_scissors = loadImage('assets/cards/Trigger_Scissors.png');
    // duck = loadImage('assets/images/duck.png'); // Load the image
}

function setup(){
    // setup() waits until preload() is done

    // Load the image
    target = loadImage('assets/cards/Resource.png');
    trigger_play = loadImage('assets/cards/Trigger_Play.png');
    trigger_scissors = loadImage('assets/cards/Trigger_Scissors.png');
    // duck = loadImage('assets/images/duck.png'); 

    // create canvas
    pixelDensity(1); // this makes the internal p5 canvas smaller
    if (scan) {
        capture = createCapture({
            audio: false,
            video: {
                width: 350,
                height: 350
            }
        }, function() {
            console.log('capture ready.')
        });
        
        capture.elt.setAttribute('playsinline', '');
        createCanvas(w, h);
        capture.size(350, 350);
        capture.parent('container');
        cnv = createCanvas(w, h);
        cnv.parent('container');
        capture.position(w/2, (h-120)/2);
        capture.style('opacity',0); // use this to hide the capture later on (change to 0 to hide)...
        // capture.hide(); // tracking.js can't track the video when it's hidden
        // drawBottomBar();
    }

        
    // } else if (play) {
    //     capture = createCapture({
    //         audio: false,
    //         video: {
    //             width: w,
    //             height: h
    //         }
    //     }, function() {
    //         console.log('capture ready.')
    //     });
        
    //     capture.elt.setAttribute('playsinline', '');
    //     createCanvas(w, h);
    //     capture.size(w, h);
    //     capture.parent('container');
    //     cnv = createCanvas(w, h);
    //     cnv.parent('container');
    //     capture.position(w, h);
    //     capture.style('opacity',0)// use this to hide the capture later on (change to 0 to hide)...
    //     // capture.hide(); // tracking.js can't track the video when it's hidden 

        
    // }

    // detect the grid card and the drawn
    detectGrid();
    // start classifying for other coding cards
    classifyCapture();

    //   button = createButton('Show Outcome');
    //   button.position(600, 65);
    //   button.mousePressed(showImage);
    // button = createButton('snap');
    // button.mousePressed(takesnap);

    buttonSnap = createButton('Add');
    buttonSnap.position(10, 65);
    buttonSnap.mousePressed(addCard);
    
    buttonPlay = createButton('Play');
    buttonPlay.position(10, 105);
    buttonPlay.mousePressed(drawImage);

    buttonStop = createButton('Stop');
    buttonStop.position(10, 145);
    buttonStop.mousePressed(stop);

    // duck = loadImage('assets/images/duck.png');

    
    // target = loadImage('assets/cards/Resource.png');
}

function takeSnap() {
    snapshots.push(get(w/3, 50, 250, 250));
    // snapshots.push(capture.get()); // grabbing pixel from the image itself
    console.log('snapped');
    // console.log(snapshots[0]);
}

function stop() {
    play = false;
}

function createTarget() {
    // create an object and save it to an array
    let t = new Target(imageX, imageY, snapshots[snapshots.length-1]); // the last item in the takesnaps array
    targets.push(t);
    console.log('saved' + targets);
}