var song = "";
var lwristx = 0;
var lwristy = 0;
var rwristx = 0;
var rwristy = 0;
var scoreR = 0;
var scoreL = 0;
function preload()
{
    song = loadSound("John-Wick-Believer-Music-VideoImagine-Dragons-BelieverFMV.mp3");
}
function setup()
{
    canvas = createCanvas(600,410);
    canvas.position(400,200);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,moddleloaded);
    posenet.on('pose',gotposes);
}
function moddleloaded()
{
    console.log("posenet is up and running");
}
function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results); 

        scoreR = results[0].pose.keypoints[10].score;
        scoreL = results[0].pose.keypoints[9].score;

        console.log("Score Left wrist is = "+scoreL+" Score right wrist is = "+scoreR)

        lwristx = results[0].pose.leftWrist.x;
        lwristy = results[0].pose.leftWrist.y;

        rwristx = results[0].pose.rightWrist.x;
        rwristy = results[0].pose.rightWrist.y;

        console.log("leftWrist X = "+lwristx+" leftWrist Y = "+lwristy);

        console.log("rightWrist X = "+rwristx+" rightWrist Y = "+rwristy);    
    }

}


function draw()
{
    image(video,0,0,600,410);
    if(scoreL > 0.3)
    {
    fill('#22bd25');
    circle(lwristx,lwristy,20);
    numlwrist = lwristy-0;
    removeDlwristy = floor(numlwrist);
    volume = removeDlwristy/500;
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    }
    
    fill('#22bd25');
    if(scoreR > 0.2)
    {
        circle(rwristx,rwristy,20);
    if(rwristy > 0 && rwristy <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed: 0.5";
        song.rate(0.5);
    }else if(rwristy > 100 && rwristy <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed: 1";
        song.rate(1);
    }else if(rwristy > 200 && rwristy <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed: 1.5";
        song.rate(1.5);
    }
    else if(rwristy > 300 && rwristy <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed: 2";
        song.rate(2);
    } else if(rwristy > 400 && rwristy <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed: 2.5";
        song.rate(2.5);
    }
    }
    
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}