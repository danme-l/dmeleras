let myBooks = [
    {
        title: "Washington Black",
        author: "Esi Edugyan",
        pages: 413,
        read: true,
    }, 
    {
        title: "Atlas Shrugged",
        author: "Ayn Rand",
        pages: 1039,
        read: true,
    },
    {
        title: "Midnight's Children",
        author: "Salman Rushdie",
        pages: 512,
        read: false,
    },
    {
        title: "The Drifters",
        author: "James Michener",
        pages: 713,
        read: true
    },
    {
        title: "The Goldfinch",
        author: "Donna Tart",
        pages: 771,
        read: true
    }
]

// book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const bookDisplay = document.getElementById("book-display");

function delayedLoop(func, ms) {
    setTimeout(func)
}
// iterate over the book list, creating book cards one at a time
function displayBooks() {
    bookDisplay.innerHTML = '';
    for (let i=0;i<myBooks.length;i++) {
        setTimeout(createBookCard(myBooks[i]), i*10000);
    }
}

function createBookCard(book) {
    const newBookDiv = document.createElement('div');
    newBookDiv.classList.add('bookCard');
    newBookDiv.id = book.title; // since delete button deletes the card by title
    // add properties of the book to the book card
    // READ STATUS
    const newBookReadStatus = document.createElement('button');
    newBookReadStatus.classList.add('card-button');
    if (book.read){
        newBookReadStatus.textContent = 'Read';
        newBookDiv.classList.add('bookRead');
    } else {
        newBookReadStatus.textContent = 'Not Read';
        newBookDiv.classList.add('bookNotRead');
    }
    newBookDiv.appendChild(newBookReadStatus);
    // toggle book read status
    newBookReadStatus.onclick = () => {
        if (newBookReadStatus.textContent === 'Read') {
            newBookReadStatus.textContent = 'Not Read';
            newBookDiv.classList.remove('bookRead')
            newBookDiv.classList.add('bookNotRead');
        } else {
            newBookReadStatus.textContent = 'Read';
            newBookDiv.classList.remove('bookNotRead')
            newBookDiv.classList.add('bookRead');
        }
    }
        
    // REMOVE BUTTON
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('card-button')
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeButton.addEventListener('click', function() {
        deleteBook(book.title);
    });
    newBookDiv.appendChild(removeButton);

    // BOOK TITLE
    const newBookTitle = document.createElement('p');
    newBookTitle.textContent = book.title;
    newBookTitle.style = ('font-style: italic');
    newBookDiv.appendChild(newBookTitle);
    // BOOK AUTHOR
    const newBookAuthor = document.createElement('p');
    newBookAuthor.textContent = book.author;
    newBookDiv.appendChild(newBookAuthor);
    // BOOK PAGES
    const newBookPages = document.createElement('p');
    newBookPages.textContent = book.pages + ' p.';
    newBookDiv.appendChild(newBookPages);
        
    // 
    bookDisplay.appendChild(newBookDiv);
}

function addBookToLibrary(book) {
    myBooks.push(book);
    createBookCard(book);
}

function deleteBook(title) {
    myBooks = myBooks.filter((book) => book.title !== title);
    let thisBook = document.getElementById(title)
    thisBook.parentNode.removeChild(thisBook);
}

// add book modal
let modal = document.getElementById("add-book-modal");
let addButton = document.getElementById("add-book-button");
let modalClose = document.getElementById("modal-close");
let modalSubmit = document.getElementById("modal-submit");

addButton.onclick = function () {
    modal.style.display = "block";
}

modalClose.onclick = function () {
    modal.style.display = "none";
}

modalSubmit.onclick = function () {
    validateBookForm();
    modal.style.display = 'none';
}

modalSubmit.addEventListener('click', function(event) {
    event.preventDefault();
  });

function validateBookForm() {
    let titleInput = document.getElementById("new-book-title").value;
    let authorInput = document.getElementById("new-book-author").value;
    let pagesInput = document.getElementById("new-book-pages").value;
    let readcheck = document.getElementById("new-book-read").checked;
    addBookToLibrary(new Book(titleInput, authorInput, pagesInput, readcheck));
}

let add100Button = document.getElementById("add100");
add100Button.onclick = function() {
    get100Books();
};

let clearButton = document.getElementById("clear-button");
clearButton.onclick = function() {
    const bookDisplay = document.getElementById("book-display");
    bookDisplay.innerHTML = '';
}

function get100Books() {
    (async () => {
        const res = await fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json', {
          headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        Object.entries(json).forEach((entry, i) => {
            setTimeout(() => {
                console.log(entry[1].author + ' - ' + entry[1].title);
                let book = new Book(entry[1].title, entry[1].author, entry[1].pages, false);
                addBookToLibrary(book);
            }, i*100);            
        });
      })();
}


displayBooks();