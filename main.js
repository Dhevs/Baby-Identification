song = "";
status="";
objects = [];

function preload(){
song=loadSound("Alert.mp3");
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(640,420);
  video.hide();
  objectidentifier=ml5.objectDetector("cocossd",modaloaded);
  document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modaloaded(){
    console.log("modal is loaded");
    status=true; 
}

function getresult(error,results){
if(error){console.log(error);}
console.log(results);
objects=results;}

function draw() {
  image(video, 0, 0, 640, 420);
  if(status!="")
  {
    r=random(255);
    g=random(255);
    b=random(255);

    objectidentifier.detect(video,getresult);
    for(i=0; objects.length; i++){
    document.getElementById("status").innerHTML="Status : Object Is Detected";  
    

  fill(r,g,b);
  percent = floor(objects[i].confidence * 100);
  text(objects[i].label+" " + percent + "%",objects[i].x+15,objects[i].y+15);
  noFill();
  stroke(r,g,b);

  rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
  if(objects[i].label=="person"){
    document.getElementById("noofobjects").innerHTML="Baby is Found";
    song.stop();


  }
  else{
    document.getElementsById("noofobjects").innerHTML="Baby is not found";
    song.play();
  }
}
}
}
