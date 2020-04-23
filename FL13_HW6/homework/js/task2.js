const userInput = prompt('Enter your string', '');

if(userInput === '' || userInput.trim().length === 0) {
   alert('Invalid value');
} else {
   if(userInput.length % 2 === 0) {
      const index = userInput.length / 2;
      const result = userInput[index - 1] + userInput[index];
      alert(result);
   } else {
      const index = Math.floor(userInput.length / 2);
      const result = userInput[index];
      alert(result);
   }
}