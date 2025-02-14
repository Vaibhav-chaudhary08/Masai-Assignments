const library = {
  books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],
  addBook(book) {
    if (!book || !book.title || !book.author || !book.year) {
      console.error("Book information is incomplete or book object is missing.");
      return;
    }

    if (typeof book.title !== 'string' || typeof book.author !== 'string' || typeof book.year !== 'number') {
        console.error("Book information has incorrect data types. Title and author must be strings, year must be a number.");
        return;
    }

    if (this.books.find(existingBook => existingBook.title === book.title)) {
      console.error("A book with this title already exists.");
      return;
    }

    this.books.push(book);
    console.log(`${book.title} added to the library.`);
  },
  findBookByTitle(title) {
    if (typeof title !== 'string'){
        console.error("Title must be a string");
        return;
    }
    const foundBook = this.books.find(book => book.title === title);
    if (!foundBook){
        console.log("Book not found.");
    }
    return foundBook;
  },
  removeBook(title) {
    if (typeof title !== 'string'){
        console.error("Title must be a string");
        return;
    }
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`"${title}" removed from the library.`);
    } else {
        console.log("Book not found.");
    }
  },
};

library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
library.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 });
library.addBook({title: "1984", author: "George Orwell", year: 1949}); 

console.log("Number of books:", library.books.length);

const found = library.findBookByTitle("1984");
if (found) {
  console.log("Found book:", found);
}

library.removeBook("The Hobbit");
library.removeBook("Moby Dick");

console.log("Number of books after removal:", library.books.length); 

const found2 = library.findBookByTitle("The Hobbit"); 
if (found2){
    console.log("Found book:", found2);
}
