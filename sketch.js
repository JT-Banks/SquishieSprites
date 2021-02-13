var guy = [];
var count = 10;
var kill = 0;
let timer = 10;
var dead = [];
var speed;

function preload() {
    for( var i = 0; i < count; i++){
        guy[i] = new Walker("SpelunkyGuy.png", random(30, 640), random(30, 460), random(6, 9), random([-1,1]));
        dead = loadImage("death.png");
    }
}
//Canvas size
function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
}

function mousePressed() {
    for( var i = 0; i < count; i++) { guy[i].kill(mouseX, mouseY); }
}

function mouseDragged() {
    for( var i = 0; i < count; i++) {
        guy[i].drag(mouseX, mouseY);
    }
}

function mouseReleased() {
    for( var i = 0; i < count; i++) {
        guy[i].drop();//
    }
}

function draw() {
    background(15, 100, 232);

    for( var i = 0; i < count; i++) {
        guy[i].draw();
    }

    textSize(25);   
    text("Squished: " + kill, 20, 30);
    text("Time left: " + timer, 250, 30);
    if((frameCount % 60 == 0) && (timer > 0)) { 
      timer--; 
    }
     if (timer === 0 || kill === 10) {
        fill('Orange');
        rect(230, 220, 160, 90);
        fill("Black");
        text("Time's Up!", 250, 250);
        text("Score: " + kill, 250, 300);
        guy[i].moving = 0;
     }   
}

function Walker(imageName, x, y, speed, moving) {
    this.spriteSheet = loadImage(imageName);
    this.frame = 0;
    this.x = x;
    this.y = y;
    this.moving = moving;
    this.facing = moving;
    this.speed = speed;
    this.draw = function() {

        push();
        translate(this.x, this.y);
        if(this.facing < 0) {
            scale(-1.0, 1.0);
        }
        if(this.moving == 0) { image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80); }
        else {
            if(this.frame == 0){ image(this.spriteSheet, 0, 0, 80, 80, 80, 0, 80, 80); }
            if(this.frame == 1){ image(this.spriteSheet, 0, 0, 80, 80, 160, 0, 80, 80); }
            if(this.frame == 2){ image(this.spriteSheet, 0, 0, 80, 80, 240, 0, 80, 80); }
            if(this.frame == 3){ image(this.spriteSheet, 0, 0, 80, 80, 320, 0, 80, 80); }
            if(this.frame == 4){ image(this.spriteSheet, 0, 0, 80, 80, 400, 0, 80, 80); }
            if(this.frame == 5){ image(this.spriteSheet, 0, 0, 80, 80, 480, 0, 80, 80); }
            if(this.frame == 6){ image(this.spriteSheet, 0, 0, 80, 80, 560, 0, 80, 80); }
            if(this.frame == 7){ image(this.spriteSheet, 0, 0, 80, 80, 640, 0, 80, 80); }

            if(frameCount % 6 == 0) {
                this.frame = (this.frame + 1) % 8;
                this.x = this.x + this.moving * this.speed;
                if(this.x < 30) {
                    this.moving = 1;
                    this.facing = 1;
                }
                //keep facing correct direction
                if(this.x > width - 30){
                    this.moving = -1;
                    this.facing = -1;
                }
                if(kill > 3) {
                  this.x = this.x + this.moving * (this.speed + 2);
                }
                if(kill > 6) {
                this.x = this.x + this.moving * (this.speed + 4);
            }
            if(kill > 8) {
              this.x = this.x + this.moving * (this.speed + 8);
            }
          }
        }
    
        pop();

        this.go = function(direction) {
            this.moving = direction;
            this.facing = direction;
        }

        this.stop = function() {
            this.moving = 0;
            this.frame = 3;
        }

        this.grab = function(x, y) {
            if(this.x-40 < x && x < this.x + 40 && this.y-40 < y && y < this.y + 40){
                this.stop();
                this.mouseX = x;
                this.mouseY = y;
                this.initialX = this.x;
                this.initialY = this.y;
            }
        }

        this.drag = function(x, y) {
            if(this.moving == 0){
                this.x = (x-this.mouseX) + this.initialX;
                this.y = (y-this.mouseY) + this.initialY;
            }
        }

        this.drop = function() {
            this.go(this.facing);
        }

        this.kill = function(x, y) {
            if((this.x -40 < x && x < this.x+40 && this.y-40 < y && y < this.y+40) && (this.spriteSheet !== dead)) {
              this.moving = 0;
              this.spriteSheet=dead;
              kill = kill + 1;
            // this.update = function(){}
            }
          }
    }
}