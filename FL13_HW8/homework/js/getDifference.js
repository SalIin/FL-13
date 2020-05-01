const isBigger = (firstNum, secondNum) => {
   return firstNum > secondNum;
};  

const getDifference = (a, b) => {
   return isBigger(a, b) ? a - b : b - a;
};

getDifference(5, 3);
