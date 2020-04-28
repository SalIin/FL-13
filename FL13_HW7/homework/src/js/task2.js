let confirmStatus = confirm('Do you want to play a game?');
let randomNumber, userBid;
let prize = 0;
let winner = true;
let gamesCounter = 1, gamesCounterStart = 1;
let min = 0, max = 0;
let firstAttemptPrize = 100, secondAttemptPrize = 50, thirdAttemptPrize = 25;
let totalPrize = 0;
let showPrize = 0;

while(confirmStatus) { 
   if(confirmStatus) {
      firstAttemptPrize *= gamesCounter > gamesCounterStart ? 2 : 1;
      secondAttemptPrize *= gamesCounter > gamesCounterStart ? 2 : 1;
      thirdAttemptPrize *= gamesCounter > gamesCounterStart ? 2 : 1;

      max += winner ? 5 : 0;
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      let counter = 3;
      console.log(randomNumber);
   
      do {
         if(counter === 3) {
            showPrize = firstAttemptPrize;
         } else if(counter === 2) {
            showPrize = secondAttemptPrize;
         } else {
            showPrize = thirdAttemptPrize;
         }
         winner = false;
         userBid = prompt(`
            Choose a roulette pocket number from 0 to ${max}
            Attempts left: ${counter}
            Total prize: ${totalPrize}
            Possible prize on current attempt: ${showPrize}$         
         `);
         if(userBid !== null) {
            userBid = parseInt(userBid);
         }
         if(userBid === randomNumber) {
            winner = true;
            switch(counter) {
               case 3: 
                  prize = firstAttemptPrize;
                  break;
               case 2: 
                  prize = secondAttemptPrize;
                  break;
               case 1: 
                  prize = thirdAttemptPrize;
                  break;
               default:
                  break;
            }
            
         } 
         counter--;
      } while(counter > 0 && userBid !== randomNumber)
      totalPrize += prize;
      if(!winner) {
         alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
         gamesCounter = 1;
         totalPrize = 0, max = 5;
         firstAttemptPrize = 100, secondAttemptPrize = 50, thirdAttemptPrize = 25;
         confirmStatus = confirm('Do you want to play again?');
      } else {
         confirmStatus = confirm(`
            Congratulation, you won! Your prize is: ${prize}$.
            Total prize is: ${totalPrize}$
            Do you want to continue?`);
         prize = 0;
         gamesCounter++; 
         if(!confirmStatus) {
            gamesCounter = 1;
            totalPrize = 0, max = 0;
            firstAttemptPrize = 100, secondAttemptPrize = 50, thirdAttemptPrize = 25;
            confirmStatus = confirm('Do you want to play again?');
         }
         
      }
      
   
   
   } else {
      alert('You did not become a billionaire, but can.');
   }
}
