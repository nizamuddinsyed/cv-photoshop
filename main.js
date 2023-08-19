function onOpenCvReady(){

    cv["onRuntimeInitialized"] = () => {

        console.log("OpenCV is Ready....");
        // read an image from image source and convert to opencv format

        let imgMain = cv.imread("img-main"); // image in opencv mat forma
        cv.imshow("main-canvas",imgMain);
        imgMain.delete();

        // ******************* RGB BUTTON *********************
        document.getElementById("button-rgb").onclick = function (){
            let imgMain = cv.imread("img-main");
            cv.imshow("main-canvas",imgMain);
            imgMain.delete();
        };


        //  ******************* Gray Scale effect ********************
        document.getElementById("button-gray").onclick = function (){
            let imgMain = cv.imread("img-main");
            let imgGray = imgMain.clone();
            cv.cvtColor(imgMain, imgGray, cv.COLOR_RGBA2GRAY, 0);
            cv.imshow("main-canvas",imgGray);
            imgMain.delete(); // to free the memory allocated 
            imgGray.delete();

        };

        // ********************** Blur Image effect ***********************
        document.getElementById("button-blur").onclick = function (){
            let imgMain = cv.imread("img-main");
            let imgBlur = imgMain.clone();

            // Adding Blur to image // ksize - Kernal size
            let ksize = new cv.Size(49,49);
            cv.GaussianBlur(imgMain, imgBlur, ksize, 0); 
            cv.imshow("main-canvas",imgBlur);
            imgMain.delete();
            imgBlur.delete();
        };

        // ************************* Edge effect *************************
        document.getElementById("button-canny").onclick = function (){
            let imgMain = cv.imread("img-main");
            let imgCanny = imgMain.clone();
            // Finding edge using Canny edge detector
            cv.Canny(imgMain, imgCanny, 50, 100);
            cv.imshow("main-canvas",imgCanny);
            imgMain.delete();
            imgCanny.delete();
        };

        // ************************* Contour effect *************************
        document.getElementById("button-contour").onclick = function (){
            let imgMain = cv.imread("img-main");
            let dst = cv.Mat.zeros(imgMain.rows, imgMain.cols, cv.CV_8UC3);

            // let src = cv.imread('canvasInput');
            cv.cvtColor(imgMain, imgMain, cv.COLOR_RGBA2GRAY, 0);
            cv.threshold(imgMain, imgMain, 120, 200, cv.THRESH_BINARY);
            let contours = new cv.MatVector();
            let hierarchy = new cv.Mat();
            cv.findContours(imgMain, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
            for (let i = 0; i < contours.size(); ++i) {
                let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                                          Math.round(Math.random() * 255));
                cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            }

            cv.imshow('main-canvas', dst);
            imgMain.delete(); dst.delete(); contours.delete(); hierarchy.delete();
    
            
        };

    };
}