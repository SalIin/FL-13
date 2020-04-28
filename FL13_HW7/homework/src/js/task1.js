const login = prompt('Enter your login please', '');
let password = '';

if(login === '' || login === null) {
   alert('Canceled');
} else if(login.length < 4) {
   alert('I don`t know any users having name length less than 4 symbols');
} else if(login === 'User' || login === 'Admin') {
   password = prompt('Enter your password', '');
   if(password === '' || password === null) {
      alert('Canceled');
   } else if(login === 'User' && password === 'UserPass') {
      new Date().getHours() < 20 ? alert('Good day, dear User!') : alert('Good evening, dear User!');
   } else if(login === 'Admin' && password === 'RootPass') {
      new Date().getHours() < 20 ? alert('Good day, dear Admin!') : alert('Good evening, dear Admin!');      
   } else {
      alert('Wrong password');
   }      
} else {
   alert('I don`t know you');
}