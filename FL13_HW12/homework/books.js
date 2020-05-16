const books = [
   {
      name: 'The Fever',
      author: 'Megan Abbott',
      img: 'https://images-production.bookshop.org/spree/images/attachments/1973313/original/9780316231046.jpg',
      id: '9780525429760',
      plot: 'The Nash family is close-knit. Tom is a popular teacher, father of two teens: Eli, a hockey star and girl magnet, and his sister Deenie, a diligent student. Their seeming stability, however, is thrown into chaos when Deenie`s best friend is struck by a terrifying, unexplained seizure in class. Rumors of a hazardous outbreak spread through the family, school and community.'
   },
   {
      name: 'In Five Years',
      author: 'Rebecca Serle',
      img: 'https://images-production.bookshop.org/spree/images/attachments/3842858/original/9781982137441.jpg',
      id: '9781982137441',
      plot: 'Where do you see yourself in five years? Dannie Kohan lives her life by the numbers. She is nothing like her lifelong best friend--the wild, whimsical, believes-in-fate Bella. Her meticulous planning seems to have paid off after she nails the most important job interview of her career and accepts her boyfriend`s marriage proposal in one fell swoop, falling asleep completely content.'
   },
   {
      name: 'Little Eyes',
      author: 'Samanta Schweblin',
      img: 'https://images-production.bookshop.org/spree/images/attachments/11052916/original/9780525541363.jpg',
      id: '9780525541363',
      plot: `A visionary novel about our interconnected present, about the collision of horror and humanity, from a master of the spine-tingling tale.
      They've infiltrated homes in Hong Kong, shops in Vancouver, the streets of in Sierra Leone, town squares in Oaxaca, schools in Tel Aviv, bedrooms in Indiana. They're everywhere. They're here. They're us. They're not pets, or ghosts, or robots. They're real people, but how can a person living in Berlin walk freely through the living room of someone in Sydney? How can someone in Bangkok have breakfast with your children in Buenos Aires, without your knowing? Especially when these people are completely anonymous, unknown, unfindable.`
   },
];

localStorage.setItem('books', JSON.stringify(books));