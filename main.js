 harryPotterSong = "";
 peterPanSong = "";

 leftWristX = 0;
 rightWristX = 0;

 leftWristY = 0;
 rightWristY = 0;

 scoreLeftWristY = 0;
 scoreRightWristY = 0;

 harryPotterSongStatus = '';
 peterPanSongStatus = '';

var color_timer;
var low_rgb;

function preload(){
    harryPotterSong = loadSound('music.mp3');
    peterPanSong = loadSound('music2.mp3');
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);

}

function modelLoaded(){
    console.log("PoseNet is Intialized");
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log('The X Position of the Left Wrist is = ' + leftWristX
         + " and The Y Position of Left Wrist = " + leftWristY + ' The X Position of the Right Wrist is = ' + rightWristX 
         + 'and The Y Position of the right Wrist = ' + rightWristY);

         scoreLeftWristY = results[0].pose.keypoints[9].score;
        scoreRightWristY = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    if(scoreLeftWristY > 0.2){
        fill('#ff0000');
        circle(leftWristX, leftWristY, 20);

        harryPotterSong.play();
        harryPotterSong.setVolume(1);
        harryPotterSong.rate(1);
        
        harryPotterSongStatus = harryPotterSong.isPlaying();
        console.log(harryPotterSongStatus);
        document.getElementById('harry_potter').innerHTML = "Harry Potter";
    }
    
    else if(scoreRightWristY > 0.2){
        fill('#ff0000')
        circle(rightWristX, rightWristY, 20);
        
        peterPanSong.play();
        peterPanSong.setVolume(1);
        peterPanSong.rate(1);
        
        peterPanSongStatus = peterPanSong.isPlaying();
        console.log(peterPanSongStatus);
        document.getElementById('peter_pan').innerHTML = "Peter Pan Song is Playing";
    }

    if(harryPotterSongStatus == 'false'){
        peterPanSong.stop();
    }   
    
    if(peterPanSongStatus == 'false'){
        peterPanSong.stop();
    }
}


