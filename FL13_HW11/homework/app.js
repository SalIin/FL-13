const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
let counter = 1;
const createDOM = (rootNode, arr, ulClass) => {
   let ul = document.createElement('ul');
   ul.classList.add(ulClass);
   let li;
   rootNode.append(ul);
   arr.map(obj => {
      for(let key in obj) {
         if(key === 'children' && obj[key] !== null) {
            counter++;
            if(counter > 3) {
               counter = 2;
            }
            createDOM(li, obj[key], `level-${counter}-ul`);
         } else if(key === 'folder' && key !== 'children') {
            li = document.createElement('li');
            let p = document.createElement('p');
            p.textContent = obj.title;
            p.classList.add('folder');
            let span = document.createElement('span');
            span.textContent = 'folder';
            span.classList.add('material-icons');
            let div = document.createElement('div');
            div.classList.add('folder-container', 'close');
            div.append(span);
            div.append(p);
            li.append(div);           
            ul.append(li);
         } else if(key === 'children' && obj[key] === null) {
            li = document.createElement('li');
            li.classList.add('level-3-ul');
            let p = document.createElement('p');
            p.innerHTML = `<em>Folder is empty</em>`;
            li.append(p);
            ul.append(li);
         } else if(!obj.folder && key === 'title') {
            li = document.createElement('li');
            let p = document.createElement('p');
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.textContent = 'insert_drive_file';
            span.classList.add('material-icons');
            div.classList.add('icon-container');
            p.textContent = obj[key];
            div.append(span);
            div.append(p);
            li.append(div);
            ul.append(li);
         }
         
      }  
      return obj;    
   });
}
const createContextMenu = () => {
   const ul = document.createElement('ul');
   ul.classList.add('right-click-menu');

   const renameLi = document.createElement('li');
   const deleteLi = document.createElement('li');
   renameLi.classList.add('rename-li');
   deleteLi.classList.add('delete-li');
   renameLi.textContent = 'Rename';
   deleteLi.textContent = 'Delete';

   ul.append(renameLi);
   ul.append(deleteLi);
   rootNode.append(ul);
};
createDOM(rootNode, data, 'level-1-ul');
createContextMenu();

const folders = document.querySelectorAll('.folder-container');
const files = document.querySelectorAll('.icon-container');
const contextmenuItems = [...folders, ...files];

for(let folder of folders) {
   folder.addEventListener('click', (e) => {
      if(e.currentTarget.classList.contains('close')) {
         e.currentTarget.classList.remove('close');
         e.currentTarget.classList.add('open');
         e.currentTarget.firstChild.textContent = 'folder_open';
         if(e.currentTarget.nextSibling) {
            e.currentTarget.nextSibling.style.display = 'block';
         } else {
            const parent = e.currentTarget.parentNode;
            let p = document.createElement('p');
            p.innerHTML = `<em>Folder is empty</em>`;
            parent.append(p);
         } 
         
      } else if(e.currentTarget.classList.contains('open')) {
         e.currentTarget.classList.remove('open');
         e.currentTarget.classList.add('close');
         e.currentTarget.firstChild.textContent = 'folder';
         e.currentTarget.nextSibling.style.display = 'none';
      }
   });
}
for(let item of contextmenuItems) {
   let currentItem;
   item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      currentItem = e.currentTarget;
      const menu = document.querySelector('.right-click-menu');
      const renameLi = document.querySelector('.rename-li');
      const deleteLi = document.querySelector('.delete-li');

      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;
      menu.classList.add('active');

      deleteLi.addEventListener('click', () => {
         currentItem.parentNode.remove();
      });
      renameLi.addEventListener('click', () => {
         // console.log(currentItem.lastChild);
         let fileName = currentItem.lastChild.textContent;
         currentItem.lastChild.remove();

         const input = document.createElement('input');
         input.setAttribute('type', 'text');
         input.classList.add('input');
         input.value = fileName;

         currentItem.append(input);
         input.focus();
         if(input.value.includes('.')) {
            let str = input.value;
            let selectionEnd
            for(let i = 0; i < str.length; i++) {
               if(str.charAt(i) === '.') {
                  selectionEnd = i;
                  break;
               }
            }   
            input.setSelectionRange(0, selectionEnd);
         } else {
            input.select();
         }
         

         input.addEventListener('blur', () => {
            fileName = input.value;
            input.remove();
            const p = document.createElement('p');
            p.textContent = fileName;
            currentItem.append(p);
         });
      });
   });
}
document.addEventListener('click', (e) => {
   if(e.button !== 2) {
      document.querySelector('.right-click-menu').classList.remove('active');
   }
});