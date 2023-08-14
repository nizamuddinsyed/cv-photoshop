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


        //  ******************* GRAY SCALE BUTTON ********************
        document.getElementById("button-gray").onclick = function (){
            let imgMain = cv.imread("img-main");
            let imgGray = imgMain.clone();
            cv.cvtColor(imgMain, imgGray, cv.COLOR_RGBA2GRAY, 0);
            cv.imshow("main-canvas",imgGray);
            imgMain.delete(); // to free the memory allocated 
            imgGray.delete();

        };

        // ********************** BLUR IMAGE ***********************
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

        // ************************* EDGE *************************
        document.getElementById("button-canny").onclick = function (){
            let imgMain = cv.imread("img-main");
            let imgCanny = imgMain.clone();
            // Finding edge using Canny edge detector
            cv.Canny(imgMain, imgCanny, 50, 100);
            cv.imshow("main-canvas",imgCanny);
            imgMain.delete();
            imgCanny.delete();
        };

    };
}