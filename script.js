const bookList = document.querySelector('#book-list');
const addBookButton = document.querySelector('#add-book');
const submitButton = document.querySelector('#submit');
const emptyListButton = document.querySelector('#empty-list');
const popUpWindow = document.querySelector('.pop-up');
const addBookForm = document.querySelector('#add-book-form');
const bodyChildren = document.querySelector('body').children;

addBookButton.addEventListener('click', showPopUp);
submitButton.addEventListener('click', addBookToLibrary);
emptyListButton.addEventListener('click', emptyList)

let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 231,
    isRead: true
  },
  {
    title: "A Song of Ice and Fire",
    author: "George R. R. Martin",
    pages: 999,
    isRead: false
  }
];

refreshUI();

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {
  // validate form
  if (!addBookForm.checkValidity()) {
    alert('Please fill in at least the Title.')
    return;
  };
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const isRead = document.querySelector('#read-status').checked;
  // Add new book to the array
  myLibrary.push(new Book(title, author, pages, isRead));
  // Hide window
  hidePopUp();
  // run function to add
  refreshUI();
}

function refreshUI() {
  // clear all cards
  const bookListItems = bookList.querySelectorAll('.book-card');
  bookListItems.forEach(item => {
    bookList.removeChild(item)
  });
  // create new cards
  myLibrary.forEach(element => {
    createBookCard(element);
  });
}

function createBookCard(bookObject) {
  const card = document.createElement('div');
  card.classList = 'book-card';

  const title = document.createElement('h3');
  title.classList = 'book-title';
  title.textContent = bookObject.title;

  const author = document.createElement('p');
  author.classList = 'book-author';
  author.textContent = bookObject.author;

  const pages = document.createElement('p');
  pages.classList = 'book-pages';
  pages.textContent = bookObject.pages;

  const isRead = document.createElement('div');
  isRead.addEventListener('click', ()=> {
    toggleReadStatus(isRead, bookObject)
  });

  if (bookObject.isRead) {
    isRead.textContent = 'Read';
    isRead.classList = 'book-status-read';
  } else {
    isRead.textContent = 'Not read';
    isRead.classList = 'book-status-not-read';
  }

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(isRead);
  bookList.appendChild(card);

  // add remove button to each book card
  const removeBookButton = document.createElement('button');
  removeBookButton.classList = 'button-remove';
  removeBookButton.textContent = 'Remove'
  card.appendChild(removeBookButton);
  removeBookButton.addEventListener('click', ()=> {
    removeBook(bookObject)
  });
}

function removeBook(bookObject) {
  // create a new array without book that has to be deleted
  myLibrary = myLibrary.filter(book => book !== bookObject);
  refreshUI();
}

function emptyList() {
  // assign empty array
  myLibrary = [];
  // run to update UI
  refreshUI();
}

function toggleReadStatus(status, bookObject) {
  // swap class and text when clicked
  if (!bookObject.isRead) {
    bookObject.isRead = true;
    status.textContent = 'Read';
    status.classList = 'book-status-read';
  } else {
    bookObject.isRead = false;
    status.textContent = 'Not read';
    status.classList = 'book-status-not-read';
  }
}

function showPopUp() {
  // add CSS class to show
  popUpWindow.classList.remove("hidden"); 
  popUpWindow.classList.add("visible");
  // blur background
  for (let i = 0; i < bodyChildren.length; i++) {
    const item = bodyChildren[i]
    if (!item.classList.contains('visible')) {
      item.classList.add('blur');
    }
  }
}

function hidePopUp() {
  // add CSS class to hide
   popUpWindow.classList.remove("visible");
   popUpWindow.classList.add("hidden");
   // unblur background 
   for (let i = 0; i < bodyChildren.length; i++) {
    const item = bodyChildren[i]
    item.classList.remove('blur');
  }
}

