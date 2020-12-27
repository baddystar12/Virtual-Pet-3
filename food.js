class Food {
constructor(){
this.foodStock = 0;
this.lastFed;
this.image = loadImage("images/virtual pet images/Milk.png");
}
getFoodStock(){
return this.foodStock;
}
updateFoodStock(foodStock){
this.foodStock = foodStock;
}
deductFood(){
if(this.foodStock>0){
    this.foodStock = this.foodStock - 1;
}
}
lastFedTime(lastFed){
this.lastFed = lastFed;
}
 garden(){ 
  background(gardenImage, 550, 500);
}
 bathroom(){
  background(washRoomImage, 550, 500);
}
 sleeping(){
  background(bedRoomImage, 550, 500);
}
display(){
    background("turquoise");
    var x=80, y=100;
    imageMode(CENTER);
    image(this.image, 720, 220, 50,50);
    if(this.foodStock!==0){
        for(var i=0; i<this.foodStock; i++){
            if(i%10===0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x = x+30;
        }
    }
    if(lastFed>12){
        text("Last Fed:"+ lastFed%12+ "PM", 350, 30);
      }
      else if(lastFed = 0){
        text("Last Fed: 12 AM", 350, 30);
      }
      else {
        text("Last Fed:"+lastFed + "AM", 350, 30);
      }
}
}
