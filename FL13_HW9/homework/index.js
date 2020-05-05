const convert = (...args) => {
   let resultedArr = [];
   for(let item of args) {
      if(typeof item === 'number') {
         resultedArr.push(item.toString());         
      } else if(typeof item === 'string') {
         resultedArr.push(parseInt(item));         
      }
   }

   return resultedArr;
};
convert('1', 2, 3, '4');


const executeforEach = (arr, func) => {
   for(let item of arr) {
      if(typeof func === 'function') {
         func(item);
      }      
   }
};
executeforEach([1,2,3], function(el) {
   console.log(el * 2);
});

const mapArray = (arr, func) => {
   const resultArr = [];
   let newItem;

   executeforEach(arr, item => {
      if(typeof item !== 'number') {
         item = Number(item);
      }
      newItem = func(item);
      resultArr.push(newItem);
   });

   return resultArr;    
};
mapArray([2, '5', 8], function(el) {
   return el + 3;
});


const filterArray = (arr, func) => {
   let filteredArray = [];
   executeforEach(arr, e => {
      if(func(e)) {
         filteredArray.push(e);
      }
   });

   return filteredArray;
};
filterArray([2, 5, 8], function(el) { 
   return el % 2 === 0; 
}); 

const containsValue = (arr, el) => {
   let res = false;
   executeforEach(arr, item => {
      if(item === el) {
         res = true;
      }
   });
   
   return res;
};
containsValue([12, 4, 6], 5);

const flipOver = (str) => {
   let newStr = '';
   for(let i = str.length - 1; i >= 0; i--) {
      newStr += str[i];
   }

   return newStr;
};
flipOver('hey world');

const makeListFromRange = (arr) => {
   const newArr = [];
   const [min, max] = arr;

   for(let i = min; i <= max; i++) {
      newArr.push(i);
   }

   return newArr;
};
makeListFromRange([2, 7]);

const getArrayOfKeys = (arr, key) => {
   const keysArr = [];

   executeforEach(arr, item => {
      keysArr.push(item[key]);
   });

   return keysArr;
};
const fruits = [
   { name: 'apple', weight: 0.5 },
   { name: 'pineapple', weight: 2 }
]; 
getArrayOfKeys(fruits, 'name'); 

const substitute = (arr) => {
   let result = mapArray(arr, item => {
      if(item < 20 && item > 10) {
         item = '*';
      }
      return item;
   });
   return result;
};
substitute([58, 14, 48, 12, 31, 19, 10]); 

const getPastDay = (date, daysAgo) => {
   date.setDate(date.getDate() - daysAgo);    
   return date;
}

const date = new Date(2020, 0, 2);
getPastDay(date, 1);
getPastDay(date, 2);
getPastDay(date, 365); 


const formatDate = (date) => {
   const currentYear = date.getFullYear();
   let tmpMonth = '0';
   const currentMonth = date.getMonth() + 1;
   if(currentMonth < 10) {
      tmpMonth += currentMonth;
   } else {
      tmpMonth = currentMonth;
   }
   let tmpDay = '0';
   const currentDay = date.getDate();
   if(currentDay < 10) {
      tmpDay += currentDay;
   } else {
      tmpDay = currentDay;
   }   
   let tmpHours = '0';
   const currentHours = date.getHours();
   if(currentHours < 10) {
      tmpHours += currentHours;
   } else {
      tmpHours = currentHours;
   } 
   let tmpMinutes = '0';
   const currentMinutes = date.getMinutes();
   if(currentMinutes < 10) {
      tmpMinutes += currentMinutes;
   } else {
      tmpMinutes = currentMinutes;
   } 

   return `${currentYear}/${tmpMonth}/${tmpDay} ${tmpHours}:${tmpMinutes}`;   
};
formatDate(new Date('6/15/2019 09:15:00'));
formatDate(new Date());