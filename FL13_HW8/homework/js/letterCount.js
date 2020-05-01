const letterCount = (str, letter) => {
   let counter = 0;
   str = str.toLowerCase();
   for(let i of str) {
      if(i === letter) {
         counter += 1;
      }
   }
   return counter;
};

letterCount("Maggy", "g");
