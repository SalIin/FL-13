function Fighter(fighterProps) {
   this._name = fighterProps.name;
   this._damage = fighterProps.damage;
   this._strength = fighterProps.strength;
   this._agility = fighterProps.agility;
   this._hp = fighterProps.hp;   
   this._wins = 0;
   this._loses = 0;

   const getName = () => this._name;
   const getDamage = () => this._damage;
   const getStrength = () => this._strength;
   const getAgility = () => this._agility;
   const getHealth = () => this._hp;
   const dealDamage = (damage) => {
      this._hp -= damage;
      if(this._hp < 0) {
         this._hp = 0;
      }
      return this._hp;     
   };
   const heal = (hp) => {
      this._hp += hp;
      if(this._hp > 100) {
         this._hp = 100;
      }

      return this._hp;
   };
   const addWin = () => {
      return this._wins++;
   };
   const addLoss = () => {
      return this._loses++;
   };
   const logCombatHistory = () => {
      console.log(`Name: ${this._name}, wins: ${this._wins}, losses: ${this._loses}`);      
   };

   function attack (defender) {
      const chance = 100 - (defender.getStrength() + defender.getAgility())
      function getRandom() {
         let res = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
         return res;
      }      
      if(getRandom() > chance) {
         defender.dealDamage(this.getDamage());
         console.log(`${this.getName()} hit ${defender.getName()} on ${this.getDamage()}.`);         
      } else {
         console.log(`${this.getName()} missed.`);
      }      
   }

   return {      
      getName,
      getDamage,
      getStrength,
      getAgility,
      getHealth,
      dealDamage,
      attack,
      logCombatHistory,
      heal,
      addWin,
      addLoss
   };
}

function battle(fighter1, fighter2) {
   if(fighter1.getHealth() === 0) {
      console.log(`${fighter1.getName()} is dead and can't fight.`);
   } else if(fighter2.getHealth() === 0) {
      console.log(`${fighter2.getName()} is dead and can't fight.`);
   } else {
      while(fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
         fighter1.attack(fighter2);
         fighter2.attack(fighter1);
      }
      if(fighter1.getHealth() > fighter2.getHealth()) {
         fighter1.addWin();
         fighter2.addLoss();
         console.log(`${fighter1.getName()} has won!`);
      } else {
         fighter2.addWin();
         fighter1.addLoss();
         console.log(`${fighter2.getName()} has won!`);
      } 
   }   
}



const fighter1 = new Fighter({name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25}); // returns an object with methods
const fighter2 = new Fighter({name: 'Commodus', damage: 45, hp: 100, strength: 50, agility: 10}); // returns an object with methods

battle(fighter1, fighter2);