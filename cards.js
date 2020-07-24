// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/0tuGHNcv5/';

// load the model and images
function preload() {
    classifier = ml5.imageClassifier(modelURL + 'model.json');

    Resource = loadImage('assets/cards/Resource.png');
    Trigger_Run = loadImage('assets/cards/Trigger_Play.png');
    Trigger_Scissors = loadImage('assets/cards/Trigger_Scissors.png');
    Behavior = loadImage('assets/cards/Action.png')
}

// classify the video
function classifyCapture() {
    classifier.classify(capture, gotResults);
}

// get the classification
function gotResults(error, results) {
    // Something went wrong!
    if (error) {
        console.error(error);
        return;
    }
    // Store the label and classify again!
    label = results[0].label;
    classifyCapture();
}