var dog, database, foodStock, happyDogImage, foodObj, foodS, lastFed, gameState, readState, washRoomImage, bedRoomImage,gardenImage, sadDogImage, currentTime;

function preload(){
  happyDogImage = loadImage("images/virtual pet images/dogImg1.png");
  washRoomImage = loadImage("images/virtual pet images/Wash Room.png");
  bedRoomImage = loadImage("images/virtual pet images/Bed Room.png");
  gardenImage = loadImage("images/virtual pet images/Garden.png");
  sadDogImage = loadImage("images/virtual pet images/dogImg.png");
}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(800, 200, 20, 20);
  dog.addImage(sadDogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  feed = createButton("Feed the dog");
  feed.position(450, 50);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(550, 50);
  addFood.mousePressed(addFoods);
  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  })
  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  foodObj = new Food();
}


function draw() {  
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.sleeping();
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.bathroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  if(gameState!=="Hungry"){
    addFood.hide();
    feed.hide();
    dog.remove();
  }
  else{
    addFood.show();
    feed.show();
    dog.addImage(sadDogImage);
  }
  drawSprites();
  /*textSize(15);
  text("Food stock:" +foodS, 20, 400);
  foodObj.display();
  textSize(15);
  fill("#3107ad");*/
}
function readStock(data){
 foodS = data.val();
 foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
function update(state){
  database.ref("/").update({
    gameState:state
  })
}
