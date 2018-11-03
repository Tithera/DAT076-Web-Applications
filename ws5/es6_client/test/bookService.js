/*
    Test groud for the bookService.js. Testing AJAX calls
*/

import {
  bookService
} from "../service/bookService.js"

bookService.findAll(data => {
  console.log(data);
});

bookService.find("isbn1", data => {     
  console.log(data);
});

/*
let b = new Book;
as.create()
*/
