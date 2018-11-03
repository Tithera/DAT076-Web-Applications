/*
   Collection of Books
*/
import {
  Book
} from "./book.js"
import {
  eventBus as eB
} from "../util/eventBus.js"
import {
  bookService
} from "../service/bookService.js"


class BookRegistry {


  constructor() {
    // Test data used when not connected to back end
    this.books = [];
  } 


  find(isbn) {
    return this.books.find(a => a.isbn === isbn);
  }


  findAll() {
    // When using AJAX uncomment this
    bookService.findAll(data => {
      this.books = data;
      return eB.notify("", data);
    });
    // No backend use this, comment out when using AJAX
    //return this.books;
  }


  create(book) {
    // TODO Add AJAX (DONE)
    bookService.create(book, data => {
        return eB.notify("ADD", data);
    }); 
    
    //this.books.push(book);
    //eB.notify("ADD", this.books); // First param not used
  }


  update(book) {
    // TODO Add AJAX
    bookService.update(book, callback => {
        var a = this.find(book.isbn);
        this.books = callback;
        eB.notify("UPDATE", this.books);
    });
  }


  delete(isbn) {
    // TODO Add AJAX (DONE)
    bookService.delete(isbn, data => {
       var a = this.find(isbn);
       this.books = this.books.filter(elem => elem !== a);
       return eB.notify("DELETE", this.books); 
    });
    
  }
}


// Singleton
export const bookReg = new BookRegistry();
