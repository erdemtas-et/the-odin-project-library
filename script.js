class Book {
  constructor(title, author, pages, imageURL, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.imageURL = imageURL;
    this.readStatus = readStatus;
    this.id = id;
  }
}

class Store {
  static books = [];

  //delete book from array
  static deleteBook(id) {
    const books = Store.books;
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
  }
}

class UI {
  //hardcoded htmlcode
  static htmlCode(book) {
    return `
        <div class="book-item">
        <button class="delete">X</button>
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <img src=${book.imageURL} alt= Book: ${book.title}>
        <p>Pages: ${book.pages}</p>
        <p>Book ID : <span>${book.id}</span></p>
        <button class="status-button ${
          book.readStatus === "Read" ? "completed" : "not-read"
        }">${book.readStatus}</button>
        </div>`;
  }

  //display books on the screen
  static displayBooks(books) {
    const bookContainer = document.querySelector(".book-container");
    console.log(books);

    bookContainer.innerHTML = "";
    this.addBookToLibrary(books);
    books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-div");
      bookDiv.innerHTML = this.htmlCode(book);
      bookContainer.appendChild(bookDiv);
    });
  }

  //add book dynamically - user input
  static addBookToLibrary(books) {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#read-status").value;
    const id = document.querySelector("#id").value;
    const imageURL = document.querySelector("#image-url").value;
    const newBook = new Book(title, author, pages, imageURL, status, id);
    books.push(newBook);
  }

  //delete book from screen
  static deleteBookFromScreen() {
    const book = document.querySelectorAll(".book-item");
    book.forEach((book) => {
      book.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
          e.target.parentElement.remove();
          const idLoc =
            e.target.parentElement.lastElementChild.previousElementSibling
              .lastElementChild.textContent;
          Store.deleteBook(idLoc);
        }
      });
    });
  }
}



//when user submits
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  UI.displayBooks(Store.books);
  UI.deleteBookFromScreen();
  changeStatus("completed", "not-read");
  e.target.reset();
});

//when user wants to change read status
function changeStatus(classCompleted, classNotRead) {
  document.querySelectorAll(".status-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e);
      if (e.target.classList.contains(classCompleted)) {
        e.target.classList.replace(classCompleted, classNotRead);
        e.target.textContent = "Not Read";
      } else {
        e.target.classList.replace(classNotRead, classCompleted);
        e.target.textContent = "Read";
      }
    });
  });
}


//local storage will be added.