const libraryContainer = document.querySelector(".library-container");
const books = document.querySelectorAll(".book");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal.add");
const addBookForm = document.querySelector(".add-book");
const authorInp = document.querySelector("#author");
const titleInp = document.querySelector("#title");

openModal.addEventListener("click", function () {
  addBookForm.setAttribute("style", "display: grid;");
});

closeModal.addEventListener("click", function () {
  if (authorInp.value === "" || titleInp.value === "") {
    addBookForm.setAttribute("style", "display: none");
    clearInputs();
  } else {
    addBookForm.setAttribute("style", "display: none");

    library.addBook(authorInp.value, titleInp.value);
    showBooks();
    clearInputs();
  }
});

function clearInputs() {
  authorInp.value = "";
  titleInp.value = "";
}

function showBooks() {
  function createBook(a) {
    if (!document.getElementById(`${a.id}`)) {
      const div = document.createElement("div");
      div.className = "book margin-top";
      div.setAttribute("id", `${a.id}`);
      div.setAttribute(
        "style",
        "display: flex; flex-direction: column; gap: 1em"
      );
      const author = document.createElement("h2");
      author.textContent = `Author: ${a.author}`;
      const title = document.createElement("p");
      title.textContent = `Title: ${a.title}`;
      const isRead = document.createElement("p");
      isRead.textContent = `Read: ${a.read === false ? "no" : "yes"}`;
      const buttonsDiv = document.createElement("div");
      buttonsDiv.setAttribute(
        "style",
        "display: flex; gap: 1.5rem; margin-top: auto;"
      );
      const button = document.createElement("button");
      button.textContent = "Read";
      button.className = "button";
      button.addEventListener("click", (e) => {
        a.isRead();
        isRead.textContent = `Read: ${a.read === false ? "no" : "yes"}`;
      });
      const removeButton = document.createElement("button");
      removeButton.setAttribute("id", "remove");
      removeButton.textContent = "Remove";
      removeButton.className = "button";
      removeButton.addEventListener("click", (e) => {
        const removeId = a.id;
        const child = document.getElementById(removeId);
        const removeIndex = library.library.indexOf(a);
        library.library.splice(removeIndex, 1);
        libraryContainer.removeChild(child);
      });
      div.appendChild(author);
      div.appendChild(title);
      div.appendChild(isRead);
      div.appendChild(buttonsDiv);
      buttonsDiv.appendChild(button);
      buttonsDiv.appendChild(removeButton);
      libraryContainer.appendChild(div);
    }
  }
  library.library.forEach((book) => createBook(book));
}

function Library() {
  this.library = [];
  this.index = 0;
}

Library.prototype.addBook = function (author, title) {
  this.library.push(new Book(author, title, this.index));
  this.index++;
};

function Book(author, title, id) {
  this.author = author;
  this.title = title;
  this.read = false;
  this.id = id;
}

Book.prototype.isRead = function () {
  this.read === false ? (this.read = true) : (this.read = false);
};

const library = new Library();
