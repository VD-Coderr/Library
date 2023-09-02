const bookList = document.querySelector('#book-list');
const addBookButton = document.querySelector('#add-book');

addBookButton.addEventListener('click', addBookToLibrary);


let myLibrary = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 231,
    isRead: true
  },
  {
    title: "GoT",
    author: "J.R. Tolking",
    pages: 672,
    isRead: false
  }
];

refreshLibrary();

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {
  let title = prompt("Enter title of the book: ");
  let author = prompt("Enter author of the book: ");
  let pages = prompt("How many pages this book have?");
  let isRead = confirm("Have you already read this book?");
  // Add new book to the array
  myLibrary.push(new Book(title, author, pages, isRead));
  // run function to add 
  refreshLibrary();
}

function refreshLibrary() {
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
  card.classList.add('book-card');

  const title = document.createElement('h3');
  title.classList.add('book-title');
  title.textContent = bookObject.title;

  const author = document.createElement('p');
  author.classList.add('book-author');
  author.textContent = bookObject.author;

  const pages = document.createElement('p');
  pages.classList.add('book-pages');
  pages.textContent = bookObject.pages;

  const isRead = document.createElement('p');

  if (bookObject.isRead) {
    isRead.classList.add('book-status-read');
    isRead.textContent = 'Read';
  } else {
    isRead.textContent = 'Not read';
    isRead.classList.add('book-status-not-read');
  }

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(isRead);
  bookList.appendChild(card);

  // add button to each book card to remove it
  const removeBookButton = document.createElement('button');
  removeBookButton.classList.add('button-remove')
  removeBookButton.textContent = 'Remove'
  card.appendChild(removeBookButton);
  removeBookButton.addEventListener('click', ()=> {
    removeBook(bookObject)
  });
}

function removeBook(bookObject) {
  // create a new array without book that has to be deleted
  const updatedLibrary = myLibrary.filter(book => book.title !== bookObject.title);
  // reassign an array
  myLibrary = updatedLibrary;
  // run to update UI
  refreshLibrary();
}