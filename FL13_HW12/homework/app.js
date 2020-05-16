const root = document.getElementById('root');
const state = {};

//Functions
const createDOM = () => {
   state.startPage = location.href;
   history.pushState(state, '', state.startPage);
   const bookShelfSection = document.createElement('div');
   const bookOptionsSection = document.createElement('div');

   bookShelfSection.innerHTML = '';

   bookShelfSection.classList.add('book-shelf-section');
   bookOptionsSection.classList.add('book-options-section');

   root.append(bookShelfSection);
   root.append(bookOptionsSection);
   let books = JSON.parse(localStorage.getItem('booksUpdated')) || JSON.parse(localStorage.getItem('books')); 
   updateState(books);
};
const loadBooks = (bookShelfSection, books) => {  
   books.map(item => {
      const bookAnchor = document.createElement('a');
      const bookWrapper = document.createElement('div');
      const bookImg = document.createElement('img');
      const bookName = document.createElement('h1');
      const editBtn = document.createElement('a');

      bookAnchor.classList.add('book-item');
      bookWrapper.classList.add('book-wrapper');
      bookImg.classList.add('book-img');
      bookName.classList.add('book-name');
      editBtn.classList.add('edit-btn');

      bookAnchor.setAttribute('href', `?id=${item.id}#preview`);
      bookAnchor.setAttribute('id', item.id);
      editBtn.setAttribute('href', `?id=${item.id}#edit`);

      bookImg.setAttribute('src', item.img);
      bookName.textContent = item.name;
      editBtn.textContent = 'edit';

      bookWrapper.append(bookImg);
      bookWrapper.append(bookName);
      bookWrapper.append(editBtn);
      bookAnchor.append(bookWrapper);

      bookShelfSection.append(bookAnchor);
      
      editBtn.addEventListener('click', () => {
         event.stopPropagation();
         window.history.pushState("", "", `?id=${item.id}#edit`);
         updateState(books);
      });
      bookAnchor.addEventListener('click', (event) => {
         event.preventDefault();
         window.history.pushState("", "", `?id=${item.id}#preview`);
         updateState(books);
      });
      return item;
   });
   const addBookBtn = document.createElement('div');
   addBookBtn.classList.add('add-book-btn');
   addBookBtn.innerHTML = `<i class="fas fa-plus"></i>`;
   bookShelfSection.append(addBookBtn);
};
const updateState = (books) => {
   const bookShelfSection = document.querySelector('.book-shelf-section');
   bookShelfSection.innerHTML = '';
   loadBooks(bookShelfSection, books);

   const optionSection = document.querySelector('.book-options-section');
   const bookID = location.search.slice(4);
   const addBookBtn = document.querySelector('.add-book-btn');

   addBookBtn.addEventListener('click', () => {
      history.pushState(null, '', `#add`);
      updateState(books);
   });

   if(location.hash.slice(1) === 'preview') { 
      previewBlockCreating(optionSection, bookID, books);
   } else if(location.hash.slice(1) === 'edit') {
      optionSection.innerHTML = '';
      editBlockCreating(optionSection, bookID, books);

      const cancelBtn = document.querySelector('.cancel-btn');
      const saveBtn = document.querySelector('.save-btn');

      cancelBtn.addEventListener('click', () => {
         if(confirm('Discard changes?')) {      
            history.back();  
            updateState(books);
         }         
      });
      saveBtn.addEventListener('click', () => {
         const bookName = document.querySelector('.input-name');
         const bookAuthor = document.querySelector('.input-author');
         const bookImg = document.querySelector('.input-img');
         const bookPlot = document.querySelector('.input-plot');
         
         books.map(item => {
            if(bookID === item.id) {
               item.name = bookName.value;
               item.author = bookAuthor.value;
               item.img = bookImg.value;
               item.plot = bookPlot.value;
               let emptyField = false;

               if(bookName.value.length < 1) {
                  bookName.style.border = '1px solid tomato';
                  bookName.style.borderRadius = '5px';
                  emptyField = true;
               } else {
                  bookName.style.border = '1px solid rgb(2, 255, 116)';
                  bookName.style.borderRadius = '5px';
               }
               if(bookAuthor.value.length < 1) {
                  bookAuthor.style.border = '1px solid tomato';
                  bookAuthor.style.borderRadius = '5px';
                  emptyField = true;
               } else {
                  bookAuthor.style.border = '1px solid rgb(2, 255, 116)';
                  bookAuthor.style.borderRadius = '5px';
               }
               if(bookImg.value.length < 1) {
                  bookImg.style.border = '1px solid tomato';
                  bookAuthor.style.borderRadius = '5px';
                  emptyField = true;
               } else {
                  bookImg.style.border = '1px solid rgb(2, 255, 116)';
                  bookAuthor.style.borderRadius = '5px';
               }
               if(bookPlot.value.length < 1) {
                  bookPlot.style.border = '1px solid tomato';
                  bookAuthor.style.borderRadius = '5px';
                  emptyField = true;
               } else {
                  bookPlot.style.border = '1px solid rgb(2, 255, 116)';
                  bookAuthor.style.borderRadius = '5px';
               }

               if(!emptyField) {
                  history.pushState(null, '', `?id=${item.id}#preview`);
                  updateState(books);
                  setTimeout(() => alert('Book successfully updated'), 300);
               }
            }
            return item;
         });
         localStorage.setItem('books', JSON.stringify(books));
         return;
      });
   } else if(location.hash.slice(1) === 'add') {
      history.pushState(state, '', state.startPage);
      history.pushState(null, '', '#add');
      optionSection.innerHTML = '';

      editBlockCreating(optionSection, bookID, books);      
      const inputs = document.querySelectorAll('input');
      document.querySelector('textarea').value = '';
      for(let item of inputs) {
         item.value = '';
      }
      addNewBook(books);
   }
};
const editBlockCreating = (optionSection, bookID, books) => {
      const form = document.createElement('form');
      const inputName = document.createElement('input');
      const nameLabel = document.createElement('label');
      const inputAuthor = document.createElement('input');
      const authorLabel = document.createElement('label');
      const inputImg = document.createElement('input');
      const imgLabel = document.createElement('label');
      const inputPlot = document.createElement('textarea');
      const plotLabel = document.createElement('label');
      const saveBtn = document.createElement('a');
      const cancelBtn = document.createElement('a');

      books.map(item => {
         if(bookID === item.id) {
            inputName.value = item.name;
            inputAuthor.value = item.author;
            inputImg.value = item.img;
            inputPlot.value = item.plot;
         }
         return item;
      });

      nameLabel.textContent = 'Book name';
      authorLabel.textContent = 'Author name';
      imgLabel.textContent = 'Img URL';
      plotLabel.textContent = 'Plot text';
      saveBtn.textContent = 'save';
      cancelBtn.textContent = 'cancel';

      nameLabel.classList.add('name-label');
      authorLabel.classList.add('author-label');
      imgLabel.classList.add('img-label');
      plotLabel.classList.add('plot-label');
      saveBtn.classList.add('save-btn');
      cancelBtn.classList.add('cancel-btn');

      form.classList.add('edit-form');
      form.setAttribute('name', 'edit-form');
      inputName.classList.add('input-name');
      inputAuthor.classList.add('input-author');
      inputImg.classList.add('input-img');
      inputPlot.classList.add('input-plot');
      inputPlot.setAttribute('cols', 60);
      inputPlot.setAttribute('rows', 10);

      nameLabel.append(inputName);
      authorLabel.append(inputAuthor);
      imgLabel.append(inputImg);
      plotLabel.append(inputPlot);

      form.append(nameLabel);
      form.append(authorLabel);
      form.append(imgLabel);
      form.append(plotLabel);
      form.append(saveBtn);
      form.append(cancelBtn);

      optionSection.append(form);
};
const previewBlockCreating = (optionSection, bookID, books) => {
   books.map(item => {
      if(bookID === item.id) {
         const bookImgWrapper = `<img src="${item.img}" class="preview-book-img">`;
         const bookName = document.createElement('h1');
         const bookAuthor = document.createElement('p');
         const bookPlot = document.createElement('p');

         bookName.classList.add('preview-book-name');
         bookAuthor.classList.add('preview-book-author');
         bookPlot.classList.add('preview-book-plot');

         bookName.textContent = item.name;
         bookAuthor.textContent = item.author;
         bookPlot.textContent = item.plot;

         optionSection.innerHTML = bookImgWrapper;
         optionSection.append(bookName);
         optionSection.append(bookAuthor);
         optionSection.append(bookPlot);
      }
      return item;
   });
};
const addNewBook = (books) => {
   const newBook = {};
   const saveBtn = document.querySelector('.save-btn');
   const cancelBtn = document.querySelector('.cancel-btn');
   
   saveBtn.addEventListener('click', () => {
      const bookName = document.querySelector('.input-name');
      const bookAuthor = document.querySelector('.input-author');
      const bookImg = document.querySelector('.input-img');
      const bookPlot = document.querySelector('.input-plot');
      let emptyField = false;

      if(bookName.value.length < 1) {
         bookName.style.border = '1px solid tomato';
         bookName.style.borderRadius = '5px';
         emptyField = true;
      } else {
         newBook.name = bookName.value;
         bookName.style.border = '1px solid rgb(2, 255, 116)';
         bookName.style.borderRadius = '5px';
      }
      if(bookAuthor.value.length < 1) {
         bookAuthor.style.border = '1px solid tomato';
         bookAuthor.style.borderRadius = '5px';
         emptyField = true;
      } else {
         newBook.author = bookAuthor.value;
         bookAuthor.style.border = '1px solid rgb(2, 255, 116)';
         bookAuthor.style.borderRadius = '5px';
      }
      if(bookImg.value.length < 1) {
         bookImg.style.border = '1px solid tomato';
         bookAuthor.style.borderRadius = '5px';
         emptyField = true;
      } else {
         newBook.img = bookImg.value;
         bookImg.style.border = '1px solid rgb(2, 255, 116)';
         bookAuthor.style.borderRadius = '5px';
      }
      if(bookPlot.value.length < 1) {
         bookPlot.style.border = '1px solid tomato';
         bookAuthor.style.borderRadius = '5px';
         emptyField = true;
      } else {
         newBook.plot = bookPlot.value;
         bookPlot.style.border = '1px solid rgb(2, 255, 116)';
         bookAuthor.style.borderRadius = '5px';
      }
      
      if(!emptyField) {
         let id;
         id = Math.floor(Math.random() * (9000000000000 - 8000000000000 + 1)) + 8000000000000;
         newBook.id = '' + id;
         const booksUpdated = [...books];
         booksUpdated.push(newBook);
         
         localStorage.setItem('booksUpdated', JSON.stringify(booksUpdated));
         updateState(booksUpdated);         
      }
      
      
   });
   cancelBtn.addEventListener('click', () => {
      if(confirm('Discard changes?')) {      
         history.back();  
         updateState(books);
      }   
   });
};

//Window loaded
window.onload = createDOM;
window.onpopstate = () => {
   let books = JSON.parse(localStorage.getItem('booksUpdated')) || JSON.parse(localStorage.getItem('books'));
   updateState(books);
};