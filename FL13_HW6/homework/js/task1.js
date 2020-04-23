const checkNumber = +prompt('Enter the check number', 0);
const tip = +prompt('Enter the tip', 0);

console.log(checkNumber);


if(checkNumber < 0 || tip < 0 || tip > 100 || isNaN(checkNumber) || isNaN(tip)) {
   alert('Invalid input data');
} else {
   const tipAmount = checkNumber * (tip / 100);
   const totalSum = checkNumber + tipAmount;
   alert(
      `
         Check number: ${checkNumber}
         Tip: ${tip}%
         Tip amount: ${tipAmount.toFixed(2)}
         Total sum to pay: ${totalSum.toFixed(2)}
      `
   );
}



