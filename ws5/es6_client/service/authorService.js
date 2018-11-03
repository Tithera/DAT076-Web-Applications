/*
    Service to execute AJAX call to backend
*/

class AuthorService {

  constructor() {
    // Possible need to modify this
     //this.baseUrl = "http://localhost:8080/ws4/rest/author";
    this.baseUrl = "http://localhost:8080/authors";
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

  create(author, callback) {
    // NOT tested, just a hint ...
    console.log(author);
    window.$.ajax({
        url: this.baseUrl,
        data: JSON.stringify(author),
        //data: author, 
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

  find(id, callback) {
    // NOT tested, just a hint ...
    $.ajax({
        url: this.baseUrl + "/" + id,
        method: "GET"
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      });
  }
  
  delete(id, callback) {
    // TODO
    window.$.ajax({
          url: this.baseUrl + "/" + id,
          method: "DELETE",
          context: this
      }).done (data => {
          this.findAll(callback);
      })
      .fail(msg => {
          console.log(msg);
      });
  }

  update(author, callback) {
    // TODO
    window.$.ajax({
          url: this.baseUrl + "/" + author.id,
          //data: author,
          method: "PUT",
          data: JSON.stringify(author),
          contentType: "application/json",
          crossDomain: true,
          context: this
          
      }).done(data => {
          this.findAll(callback);
      })
      .fail(msg => {
          console.log(msg);
      }); 
  }
}

// Export object
export const authService = new AuthorService();
