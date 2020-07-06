// detect HTTP or HTTPS then force HTTPS
if (location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

if (window.matchMedia("(orientation: portrait)").matches) {
    // you're in PORTRAIT mode
 }
 
 if (window.matchMedia("(orientation: landscape)").matches) {
    // you're in LANDSCAPE mode
}

// the video
let capture;
let w = window.innerWidth;
    h = window.innerWidth;

const playBtn = document.getElementById('play');

// for displaying the label
let label = 'waiting...';
let button;
let run = false;
let scan = true;

// for displaying the code scanned
let code = [];
let txt = '';
let behavior = [];
let snapshots = [];
let targets = [];

let target, trigger_play, trigger_scissors, duck;

function preload(){
    target = loadImage('assets/cards/Resource.png');
    trigger_play = loadImage('assets/cards/Trigger_Play.png');
    trigger_scissors = loadImage('assets/cards/Trigger_Scissors.png');
    duck = loadImage('assets/images/duck.png'); // Load the image
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

    // detect the grid card and the drawn
    detectGrid();
    // start classifying for other coding cards
    classifyCapture();

    //   button = createButton('Show Outcome');
    //   button.position(600, 65);
    //   button.mousePressed(showImage);
    // button = createButton('snap');
    // button.mousePressed(takesnap);

    buttonSnap = createButton('Snap');
    buttonSnap.position(800, 65);
    buttonSnap.mousePressed(takesnap);

    buttonRun = createButton('Run');
    buttonRun.position(800, 105);
    buttonRun.mousePressed(drawImage);

    buttonStop = createButton('Stop');
    buttonStop.position(800, 145);
    buttonStop.mousePressed(stop);
}

function takesnap() {
    snapshots.push(get(w/3, 50, 350, 350));
    // snapshots.push(capture.get()); // grabbing pixel from the image itself
    console.log("snapped");
    console.log(snapshots[0]);
}

function stop() {
    run = false;
}

function createTarget() {
    // create an object and save it to an array
    let t = new Target(imageX, imageY, snapshots[snapshots.length-1]); // the last item in the takesnaps array
    targets.push(t);
    console.log("saved" + targets);
}

function Target(x, y, img) {	
    this.x = imageX;	
    this.y = imageY;	
    this.img = img;	

    this.display = function() {		
        image(this.img, this.x, this.y);	
    }	

    this.update = function() {		
        this.x = x;		
        this.y = y;	
    }
}
