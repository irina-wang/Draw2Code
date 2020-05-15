// the video
let capture;
let w = 920,
    h = 480;
// for displaying the label
let label = "waiting...";

function setup(){
    // create canvas
    pixelDensity(1); // this makes the internal p5 canvas smaller
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.parent('container');
    cnv = createCanvas(w, h);
    cnv.parent('container');
    // capture.hide(); // tracking.js can't track the video when it's hidden

    img = loadImage('assets/duck.png'); // Load the image

    // detect the grid card and the drawn
    detectGrid();
    // start classifying for other coding cards
    classifyCapture();

    //   button = createButton('Show Outcome');
    //   button.position(600, 65);
    //   button.mousePressed(showImage);
}