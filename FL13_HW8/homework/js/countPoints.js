const countPoints = (results) => {
   let splitted;
   let points = 0;
   for(let match of results) {
      splitted = match.split(':');
      let [x, y] = splitted;
      x = +x;
      y = +y;  
      if(isBigger(x, y)) {
         points += 3;
      } else if(x === y) {
         points += 1;
      } else {
         points += 0;
      }
   }

   return points;  
};
const isBigger = (firstNum, secondNum) => {
   return firstNum > secondNum;
};

countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']);
