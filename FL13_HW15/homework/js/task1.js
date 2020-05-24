const assign = (resultObj, obj1, obj2) => {
   Object.setPrototypeOf(obj2, obj1);
   for(let key in obj2) {
      resultObj[key] = obj2[key];
   }
   return resultObj;
};

const paymentsCard = {cash: '100$'};
const creditCard = {creditLimit: '50$', cash: '200$'};

const universalCard = assign({}, creditCard, paymentsCard);