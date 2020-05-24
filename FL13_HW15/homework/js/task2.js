function Vehicle(color, engine) {
   this.color = color;
   this.engine = engine;
   this.maxSpeed = 70;
   this.currentSpeed = 0;
   this.interval;
   this.isStopping = false;
}
Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
   this.engine = newEngine;
   this.maxSpeed = maxSpeed;
}
Vehicle.prototype.getInfo = function() {
   return this;
}
Vehicle.prototype.drive = function() {
   this.interval = setInterval(() => {
      this.currentSpeed += 20;
      console.log(this.currentSpeed);
      if(this.currentSpeed > this.maxSpeed) {
         console.log('Speed is too high, SLOW DOWN!');
      }
   }, 2000);
}
Vehicle.prototype.stop = function() {
   if(this.isStopping === true) {
      console.log('Already slows down.');
   } else {
      this.isStopping = true;
      clearInterval(this.interval);
      const maxSpeed = this.currentSpeed;
      const stopping = setInterval(() => {
         this.currentSpeed -= 20;
         console.log(this.currentSpeed);
         if(this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            clearInterval(stopping);
            console.log(`${this.constructor.name} is stopped. Maximum speed during the drive was ${maxSpeed}`);
         }
      }, 1500);
   }
   
}

function Car(color, engine, model) {
   Vehicle.call(this, color, engine);
   this.model = model;
   this.maxSpeed = 80;
   this.changeColor = (newColor) => {
      if(this.color !== newColor) {
         this.color = newColor;
      }
   };
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(color, engine, model) {
   Car.call(this, color, engine, model);
   this.maxSpeed = 90;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.drive = function() {
   if(this.currentSpeed > 0) {
      console.log('Already driving.');
   } else {
      console.log('Let`s drive!');
      this.interval = setInterval(() => {
         this.currentSpeed += 20;
         console.log(this.currentSpeed);
         if(this.currentSpeed >= this.maxSpeed + 30) {     
            console.log('Engine overheating');
            this.stop();
         }
      }, 2000);
   }   
}
Motorcycle.prototype.stop = function() {
   if(this.isStopping === true) {
      console.log('Already slows down.');
   } else {
      this.isStopping = true;
      clearInterval(this.interval);
      const stopping = setInterval(() => {
         this.currentSpeed -= 20;
         console.log(this.currentSpeed);
         if(this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            clearInterval(stopping);
            console.log(`Motorcycle ${this.model} is stopped. Good drive`);
         }
      }, 1500);
   }
   
}

const vehicle = new Vehicle('green', 'V8');
const car = new Car('blue', 'V-max', 'Skoda');
const moto = new Motorcycle('black', 'V-mini', 'Ducatti');