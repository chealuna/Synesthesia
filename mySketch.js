var fireworks = [];
var gravity;
var c;

function preload(){
	mySound1 = loadSound('1.mp3');
	mySound2 = loadSound('2.mp3');
	mySound3 = loadSound('3.mp3');
	mySound4 = loadSound('4.mp3');
	mySound5 = loadSound('5.mp3');
	mySound6 = loadSound('6.mp3');
	mySound7 = loadSound('7.mp3');
	mySound8 = loadSound('8.mp3');
}

function setup() {
	c = random(255)
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);	//beyond the scope of what we understand
  stroke(255);
  strokeWeight(4);
  background(0);

}



function draw() {
	console.log(c);
	colorMode(RGB);
	fill(0)
	
	//pink box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth && mouseX>=windowWidth*7/8){
			fill(244, 65, 148);
			c = 330;
			mySound8.setVolume(0.1);
			mySound8.play();
		}else{
			(stroke (244, 65, 148));
		}
	
	rect(0, 20, windowWidth, 150);

	//purple box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*7/8 && mouseX>=windowWidth*6/8){
			fill(181, 65, 244);
			c = 290;
			mySound7.setVolume(0.1);
			mySound7.play();
		}else{
			(stroke (181, 65, 244));
		}
					
	rect(0, 20, windowWidth*7/8, 150);
			
	//blue box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*6/8 && mouseX>=windowWidth*5/8){
		fill(65, 154, 244)
		c = 210;
		mySound6.setVolume(0.1);
		mySound6.play();
		}else{
			(stroke (65, 154, 244));
		}
			
	rect(0, 20, windowWidth*6/8, 150);
	
	//teal box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*5/8 && mouseX>=windowWidth*4/8){
			fill(66, 244, 238);
			c = 180;
			mySound5.setVolume(0.1);
			mySound5.play();
			}else{
				(stroke (66, 244, 238));
			}
	
	rect(0, 20, windowWidth*5/8, 150);
	
	//green box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*4/8 && mouseX>=windowWidth*3/8){
			fill(163, 244, 65);
			c = 80;
			mySound4.setVolume(0.1);
			mySound4.play();
			}else{
				(stroke (163, 244, 65));
			}
				
	rect(0, 20, windowWidth*4/8, 150);
	
	//yellow box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*3/8 && mouseX>=windowWidth*2/8){
			fill(244, 220, 65);
			c = 50;
			mySound3.setVolume(0.1);
			mySound3.play();
			}else{
				(stroke (244, 220, 65));
			}
				
		rect(0, 20, windowWidth*3/8, 150);
			 
	//orange box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*2/8 && mouseX>=windowWidth*1/8){
			fill(244, 157, 65);
			c = 35;
			mySound2.setVolume(0.1);
			mySound2.play();
			}else{
				(stroke (244, 157, 65));
			}
				
		rect(0, 20, windowWidth*2/8, 150);
	
	//red box
		if(mouseIsPressed && mouseY<150 && mouseX<=windowWidth*1/8){
		fill(244, 66, 66);
		c = 0;
		mySound1.setVolume(0.1);
		mySound1.play();

		}else{
			(stroke (244, 66, 66));
		}
	
		rect(0, 20, windowWidth*1/8, 150);
	
  colorMode(RGB);
  background(0, 0, 0, 25);
  
	//this IF statement says every 8 out of 100 times, create a new firework
  if (random(1) < 0.1) {
    fireworks.push(new Firework(c));
  }
  
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function mouseClicked(){
//we know the mouse has been clicked
//now we need to figure out where the mouse is
	//depending on the mouseX position it's a different box 
	
	if(mouseX>0 && mouseY>20){
		this.hu = random(255);
	}
		
	if(mouseX<0 && mouseX>40){
		
	}
	
}

//let's leave this alone
function Firework(h) {
  this.hu = h;
  this.firework = new Particle(random(width), height, this.hu, true);
  this.exploded = false;
  this.particles = [];

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function() {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}

function Particle(x, y, hu, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  this.acc = createVector(0, 0);
  
  if (this.firework) {
    this.vel = createVector(0, random(-12, -10));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(6, 30));
  }
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hu, 255, 255); 
    }
    
    point(this.pos.x, this.pos.y);
  }
}