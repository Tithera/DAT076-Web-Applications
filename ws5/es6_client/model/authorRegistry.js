/*
   Collection of Authors
*/
import {
  Author
} from "./author.js"
import {
  eventBus as eB
} from "../util/eventBus.js"
import {
  authService as as
} from "../service/authorService.js"

class AuthorRegistry {

  constructor() {
    // Test data used when not connected to back end
    this.authors = [
        new Author("OO", "ollesson", "olle", "olle@com", "ollev"),
        new Author("FF", "fiasson", "fia", "fia@com", "fiav"),
        new Author("LL", "lisasson", "lisa", "lisa@com", "lisav")
      ];

  } 

  find(id) {
    return this.authors.find(a => a.id === id);
  }

  findAll() {
    // When using AJAX uncomment this
    as.findAll(data => {
      this.authors = data;
      return eB.notify("", data);
    });
    // No backend use this, comment out when using AJAX
    //return this.authors;
  }

  create(author) {
    // TODO Add AJAX
    as.create(author, data => {
        return eB.notify("ADD", data);
    });
    
    //this.authors.push(author);
    //eB.notify("ADD", this.authors); // First param not used
  }

  update(author) {
    // TODO Add AJAX
    as.update(author, callback => {
        var a = this.find(author.id);
        this.authors = callback; 
        eB.notify("UPDATE", this.authors);
    });
  }

  delete(id) {
    // TODO Add AJAX
    as.delete(id, data => {
       var a = this.find(id);
       this.authors = this.authors.filter(elem => elem !== a);
       return eB.notify("DELETE", this.authors); 
    });
  }
}

// Singleton
export const authReg = new AuthorRegistry();
