const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const userList = document.querySelector('.user-list__table tbody');
const addUserBtn = document.querySelector('.add-user-btn');
const xhr = new XMLHttpRequest();

makeRequest();
function makeRequest() {   
   xhr.open('GET', `${baseUrl}/users`);

   xhr.responseType = 'json';
   xhr.onprogress = () => {
      document.querySelector('.loading-label').style.display = 'block';
   };
   xhr.onload = () => {
      document.querySelector('.loading-label').style.display = 'none';
      if(xhr.status >= 400) {
         console.error(xhr.response);
      } else if(xhr.status === 200) {
         getUsers(xhr.response);
      }
   };
   xhr.onerror = () => {
      console.error(xhr.response);
   };
   xhr.send();
}
function getUsers(response) {
   userList.innerHTML = '';
   for(let obj of response) {
      const trow = document.createElement('tr');         
      for(let key in obj) {
         if(key !== 'address' && key !== 'phone' && key !== 'website' && key !== 'company' && key !== 'email') {
            const tcol = document.createElement('td');
            if(key === 'id') {
               tcol.innerHTML = obj[key];
               trow.append(tcol);
            } else {
               const input = document.createElement('input');
               input.setAttribute('value', obj[key]);
               tcol.append(input);
               trow.append(tcol);
            }
            
         }            
      }
      trow.innerHTML += `<button class="update-btn">Update</button><button class="delete-btn">Delete</button>`;
      userList.append(trow);
   }
   const upadateBtns = document.querySelectorAll('.update-btn');
   const deleteBtns = document.querySelectorAll('.delete-btn');
   for(let btn of upadateBtns) {
      btn.addEventListener('click', updateUserInfo);
   }
   for(let btn of deleteBtns) {
      btn.addEventListener('click', deleteUser);
   }
}
function addNewUser() {
   event.preventDefault();
   const btn = event.target;
   const name = document.querySelector('.name-input').value;
   const username = document.querySelector('.username-input').value;
   const body = {
      name,
      username
   };
   
   xhr.open('POST', `${baseUrl}/users`);
   xhr.responseType = 'json';
   xhr.setRequestHeader('Content-Type', 'application/json');
   xhr.upload.onprogress = function() {
      btn.disabled = 'true';
      document.querySelector('.loading-label').style.display = 'block';
   }
   xhr.onload = () => {
      if(xhr.status >= 400) {
         console.error(xhr.response);
      } else {
         btn.removeAttribute('disabled');
         makeRequest();
      } 
   }
   xhr.send(JSON.stringify(body));
}
function updateUserInfo() {
   const btn = event.target;
   const name = btn.parentNode.children[1].firstChild.value;
   const username = btn.parentNode.children[2].firstChild.value;
   const id = btn.parentNode.children[0].firstChild.textContent;
   const body = {
      name,
      username
   };
   
   xhr.open('PUT', `${baseUrl}/users/${id}`);
   xhr.responseType = 'json';
   xhr.setRequestHeader('Content-Type', 'application/json');
   xhr.upload.onprogress = function() {
      btn.disabled = 'true';
      document.querySelector('.loading-label').style.display = 'block';
   }
   xhr.onload = () => {
      if(xhr.status >= 400) {
         console.error(xhr.response);
      } else {
         btn.removeAttribute('disabled');
         makeRequest();
      } 
   }
   xhr.send(JSON.stringify(body));
}
function deleteUser() {
   const btn = event.target;
   const id = btn.parentNode.children[0].firstChild.textContent;

   xhr.open('DELETE', `${baseUrl}/users/${id}`);
   xhr.setRequestHeader('Authorization', 'admin');
   xhr.onreadystatechange = () => {
      if(xhr.readyState === 1) {
         btn.disabled = 'true';
         document.querySelector('.loading-label').style.display = 'block';
      }
   };
   xhr.onload = () => {
      if(xhr.status >= 400) {
         console.error(xhr.response);
      } else {
         btn.removeAttribute('disabled');
         makeRequest();
      } 
   }
   xhr.send();
}

addUserBtn.addEventListener('click', addNewUser);
