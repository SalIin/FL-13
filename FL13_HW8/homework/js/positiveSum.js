const positiveSum = (array) => {
   const sum = array.filter(number => number >= 0).reduce((total, number) => {
      return total + number;
   }, 0);

   return sum;
};

positiveSum([2, 4, 6, 8]);   