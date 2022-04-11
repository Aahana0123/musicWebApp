music1 = "";
music2 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

music1_status = "";
music2_status = "";

function preload(){
music1 = loadSound("music.mp3");
music2 = loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(400 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose" , gotPoses);
    }
    
    function gotPoses(results){
        if (results.length>0) {
            console.log(results)
            leftWristx = results[0].pose.leftWrist.x;
            leftWristy = results[0].pose.leftWrist.y;
            rightWristx = results[0].pose.rightWrist.x;
            rightWristy = results[0].pose.rightWrist.y;
            console.log("Left Wrist X and Left Wrist Y");
            console.log(leftWristx + "," + leftWristy);
            console.log("Right Wrist X and Right Wrist Y");
            console.log(rightWristx + "," + rightWristy);
    
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("Score Of Left Wrist and Score Of Right Wrist");
    console.log(scoreLeftWrist + "," + scoreRightWrist)
        }
    
    }
        
    function modelLoaded(){
        console.log("Model Loaded!")
    
    }
    function draw(){
    image(video , 0 , 0 , 400 , 400);
        fill("red");
        stroke("black")
    
        if (scoreLeftWrist>0.2) {
            circle(leftWristx , leftWristy , 30);

            music2.stop();
           music1_status = music1.isPlaying();

           if (music1_status == false) {
               music1.play();

               document.getElementById("song_name").innerHTML= "Playing Harry Potter Theme Music";
           }
        }
    
        if (scoreRightWrist>0.2) {
            circle(rightWristx , rightWristy , 30);
            music1.stop();
            music2_status = music2.isPlaying();
 
            if (music2_status == false) {
                music2.play();
 
                document.getElementById("song_name").innerHTML= "Playing Peter Pan Music";
            }
        }
    
    }

    function stop_music(){
        music1.stop();
        music2.stop();
    }