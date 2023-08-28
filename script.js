const bookList = document.querySelector('#bookList');
const addBookButton = document.querySelector('#addBook');

addBookButton.addEventListener('click', addBookToLibrary);


const myLibrary = [
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
    console.log('Added');
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
  isRead.classList.add('book-read-status');

  if (bookObject.isRead) {
    isRead.textContent = 'Read';
  } else {
    isRead.textContent = 'Not read';
  }

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(isRead);
  bookList.appendChild(card);
}