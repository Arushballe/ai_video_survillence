video = "";
canvas = "";
status = "";
object = [];
percent = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();

}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if(status!="")
    {
        object_detector.detect(video, gotResult);

        for(i=0; i<object.length; i++)
        {
            document.getElementById("object_detecting").innerHTML = "Object Detected";
            document.getElementById("number_object").innerHTML = "Number of Object Detected are "+ object.length;

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label+ " " + percent + "%", object[i].x+10, object[i].y+10);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}


function start()
{
    object_detector = ml5.objectDetector("cocossd", Modelloaded);
    document.getElementById("object_detecting").innerHTML = "Status = Detecting Object";
}

function Modelloaded()
{
    console.log("ModelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }

    else{
        console.log(result);
        object = result;

    }
}