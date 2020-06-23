// the video
let capture;
let w = window.innerWidth;
    h = (w*9/16)-150;

const playBtn = document.getElementById('play');

// for displaying the label
let label = "waiting...";
let button;
let run = false;

// for displaying the code scanned
let code = [];
let txt = "";
let behavior = [];
let snapshots = [];

function preload(){
    img = loadImage("");
}

function setup(){
    // create canvas
    pixelDensity(1); // this makes the internal p5 canvas smaller
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
    createCanvas(w, h+150);
    capture.size(350, 350);
    capture.parent('container');
    cnv = createCanvas(w, h+150);
    cnv.parent('container');
    capture.position(w/3, 50);
    capture.style('opacity',0)// use this to hide the capture later on (change to 0 to hide)...
    // capture.hide(); // tracking.js can't track the video when it's hidden

    img = loadImage('assets/duck.png'); // Load the image

    // detect the grid card and the drawn
    detectGrid();
    // start classifying for other coding cards
    classifyCapture();

    //   button = createButton('Show Outcome');
    //   button.position(600, 65);
    //   button.mousePressed(showImage);
    // button = createButton('snap');
    // button.mousePressed(takesnap);
}

function takesnap() {
    snapshots.push(capture.get());
    console.log("snaped");
}
