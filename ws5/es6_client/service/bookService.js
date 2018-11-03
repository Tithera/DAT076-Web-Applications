/*
    Service to execute AJAX call to backend
*/

class BookService {


  constructor() {
    // Possible need to modify this
    // this.baseUrl = "http://localhost:8080/ws4/rest/book";
    this.baseUrl = "http://localhost:8080/books";      //ska det verkligen vara det?
  }


  findAll(callback) { // Callback is a function
    window.$.ajax({ // Use ugly global variable!
        url: this.baseUrl,
        method: "GET",
        context: this // MUST have!!!
      }).done(data => { // Success!
        callback(data);
      })
      .fail(msg => { // Exception!
        console.log(msg);
      });
  }


  create(book, callback) {
    // NOT tested, just a hint ...
    window.$.ajax({
        url: this.baseUrl,
        //data: book,
        data: JSON.stringify(book),
        method: "POST",
        contentType: "application/json",
        crossDomain: true,
        context: this // MUST have!!!
      }).done(data => {
        this.findAll(callback);
      })
      .fail(msg => {
        console.log(msg);
      });
  }


  find(isbn, callback) {
    // NOT tested, just a hint ...
    window.$.ajax({
        url: this.baseUrl + "/" + isbn,
        method: "GET"
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      });
  }
  
  
  delete(isbn, callback) {
      window.$.ajax({
          url: this.baseUrl + "/" + isbn,
          method: "DELETE",
          context: this
      }).done (data => {
          this.findAll(callback);
      })
      .fail(msg => {
          console.log(msg);
      });
      
  }


  update(book, callback) {
      window.$.ajax({
          url: this.baseUrl + "/" + book.isbn,
          method: "PUT",
          data: JSON.stringify(book),
          contentType: "application/json",
          crossDomain: true,
          context: this
          //data: book
      }).done(data => {
          this.findAll(callback);
      })
      .fail(msg => {
          console.log(msg);
      });      
  }
  
}


// Export object
export const bookService = new BookService();
