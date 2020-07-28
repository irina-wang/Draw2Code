let raster, param, pmat, resultMat, detector;
let tracker;

let detected, gridX, gridY, gridWidth, gridHeight, gridDetected;
let drawnX, drawnY, drawnWidth, drawnHeight;
let imageX, imageY, imageWidth, imageHeight;

let rhi, ghi, bhi;
let rlo, glo, blo;

function detectGrid() {
    // for markers
    raster = new NyARRgbRaster_Canvas2D(canvas);
    param = new FLARParam(canvas.width, canvas.height);
    pmat = mat4.identity();
    param.copyCameraMatrix(pmat, 100, 10000);
    resultMat = new NyARTransMatResult();
    detector = new FLARMultiIdMarkerDetector(param, 2);
    detector.setContinueMode(true);

    // for the drawn
    setTarget(47,30,134); // by default track blue

    tracking.ColorTracker.registerColor('match', function (r, g, b) {
    if (r <= rhi && r >= rlo &&
        g <= ghi && g >= glo &&
        b <= bhi && b >= blo) {
        return true;
    }
    return false;
    });
    tracker = new tracking.ColorTracker(['match']);
    tracker.minDimension = 20; // make this smaller to track smaller objects
    capture.elt.id = 'p5video';
    tracking.track('#p5video', tracker, {
    camera: true
    });
}

function setTarget(r, g, b, range) {
    range = range || 32;
    rhi = r + range, rlo = r - range;
    ghi = g + range, glo = g - range;
    bhi = b + range, blo = b - range;
}

function drawGrid() {
    // read markers
    
    canvas.changed = true;
    var thresholdAmount = 128; //select('#thresholdAmount').value() * 255 / 100;
    detected = detector.detectMarkerLite(raster, thresholdAmount);
  
    var markers = [];
    for (var i = 0; i < detected; i++) {
        // read data from the marker
        var id = detector.getIdMarkerData(i);

        // get the transformation for this marker
        detector.getTransformMatrix(i, resultMat);

        // convert the transformation to account for our camera
        var mat = resultMat;
        var cm = mat4.create();
        cm[0] = mat.m00, cm[1] = -mat.m10, cm[2] = mat.m20, cm[3] = 0;
        cm[4] = mat.m01, cm[5] = -mat.m11, cm[6] = mat.m21, cm[7] = 0;
        cm[8] = -mat.m02, cm[9] = mat.m12, cm[10] = -mat.m22, cm[11] = 0;
        cm[12] = mat.m03, cm[13] = -mat.m13, cm[14] = mat.m23, cm[15] = 1;
        mat4.multiply(pmat, cm, cm);
        // console.log("cm: " + cm[0] + ", " + cm[4] + ", " + cm[8] + ", " + cm[12]);
        // console.log(mat4);

        // define a set of 3d vertices
        var q = 1;
        var verts = [
            vec4.create(-q, -q, 0, 1),
            vec4.create(q, -q, 0, 1),
            vec4.create(q, q, 0, 1),
            vec4.create(-q, q, 0, 1),
        //  vec4.create(0, 0, -2*q, 1) // poke up
        ];

        // convert that set of vertices from object space to screen space
        var w2 = width / 2,
            h2 = height / 2;

        verts.forEach(function (v) {
            mat4.multiplyVec4(cm, v);
            v[0] = v[0] * w2 / v[3] + w2; // x
            v[1] = -v[1] * h2 / v[3] + h2; // y
        });
        markers.push(verts);

        // draw markers
        noStroke();
        fill(0, millis() % 255);
        beginShape();
        verts.forEach(function (v) {
            vertex(v[0], v[1]);
        });
        endShape();
    }

    // draw grid if thre are two markers
    if (detected == 2) {
        var Ax = markers[0][0][0];
        var Ay = markers[0][0][1];
        var Bx = markers[1][2][0];
        var By = markers[0][0][1];
        var Cx = markers[1][2][0];
        var Cy = markers[1][2][1];
        var Dx = markers[0][0][0];
        var Dy = markers[1][2][1];
    
        gridX = Ax;
        gridY = Ay;
        gridWidth = Bx - Ax;
        gridHeight = Cy - Ay;

        // draw the grid
        // strokeWeight(4);
        // stroke(255, 255, 0);
        // noFill();
        // beginShape();
        //     vertex(Ax, Ay);
        //     vertex(Bx, By);
        //     vertex(Cx, Cy);
        //     vertex(Dx, Dy);            
        // endShape();
    } 

    // get the drawn
    tracker.on('track', function (event) {
        cnv.clear();
        event.data.forEach(function (r) {
            // stroke(0, 0, 255); // blue
            // noFill;
            // rect(r.x, r.y, r.width, r.height);
            drawnX = r.x + w/3;
            drawnY = r.y+120;
            drawnWidth = r.width;
            drawnHeight = r.height;
    
            // get the size and position to draw an image
            imageX = ((drawnX-gridX)/gridWidth) * w;
            imageY = ((drawnY-gridY)/gridHeight) * (h-120);
            imageWidth = drawnWidth/gridWidth * w;
            imageHeight = drawnHeight/gridHeight * (h-120);
        })
    });

    // draw the drawn
    strokeWeight(4);
    stroke(255, 0, 0); // red
    noFill();

    if (detected == 2) {
        rect(drawnX, drawnY, drawnWidth, drawnHeight);
    }

    // stroke(0, 255, 0); // yellow
    // rect(imageX, imageY, imageWidth, imageHeight);

    // change the color to track
    // if (mouseIsPressed &&
    //     mouseX > w/2-175 && mouseX < w/2+175 &&
    //     mouseY > (h-120)/2-175 && mouseY < (h-120)/2+175) {
    //     capture.loadPixels();
    //     target = capture.get(mouseX, mouseY);
    //     setTarget(target[0], target[1], target[2]);
    //     console.log("change the color to track");
    // }
}

function updateGridData() {
    // get position and size of the drawn
    // select('#gridWidth').elt.innerText = gridWidth;
    // select('#gridHeight').elt.innerText = gridHeight;
    // select('#drawnDetected').elt.innerText = drawnDetected;
    // select ('#drawnX').elt.innerText = drawnX;
    // select ('#drawnY').elt.innerText = drawnY;
    // select ('#drawnWidth').elt.innerText = drawnWidth;
    // select ('#drawnHeight').elt.innerText = drawnHeight;  
    // select ('#imageX').elt.innerText = imageX;  
    // select ('#imageY').elt.innerText = imageY; 
    // select ('#imageWidth').elt.innerText = imageWidth;  
    // select ('#imageHeight').elt.innerText = imageHeight;  
    // select ('#gridDetected').elt.innerText = gridDetected; 
}
