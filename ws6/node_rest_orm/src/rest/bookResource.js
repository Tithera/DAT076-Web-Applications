/*
    Endpoint for url http://localhost:8080/api/authors
*/
import {
  Router
} from "express";
import {
  Book
} from "../entity/book";

export const bookResource = ({
  config,
  db
}) => {
  let router = new Router();

  // URL: localhost:8080/api/books        visar alla book
  router.get('/', (req, res, next) => {
    db.getRepository(Book)
      .find()
      .then(result => {
        res.json(result);
      });
  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/books/count      räknar antal books
  router.get('/count', (req, res, next) => {
    //console.log("GET: count (size)");
    db.getRepository(Book)
      .createQueryBuilder("book")
      .select("COUNT(book.isbn)", "count")
      .getRawOne()
      .then(count => {
        res.json(count);
      });
  });

  // URL: localhost:8080/api/books/isbn1         hittar en specifik book
  router.get('/:isbn', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Book)
      .findOneById(req.params['isbn'])
      .then(found => {
        res.json(found);
      });
  });

  router.post('/', (req, res, next) => {        //lägger till en ny book
    //console.log(req.body);
    db.getRepository(Book)
      .save(req.body)
      .then(() => {
        res.status(201).send();
      });
  });
  
  
  router.put('/:isbn',(req, res, next) => {         //uppdaterar en book
    db.getRepository(Book)
      .createQueryBuilder("book")
      .update()
      .set(req.body)
      .where("isbn = :isbn", { isbn: req.params['isbn'] })
      .execute()
      .then(result =>{
         res.json(result); 
      });      
  });
  
  
  router.delete('/:isbn', (req, res, next) => {       //tar bort en book
    db.getRepository(Book)
      .createQueryBuilder("book")
      .delete()
      .where("isbn = :isbn", { isbn: req.params['isbn'] })
      .execute()
      .then(result => {
          res.json(result);
       });
  });
    
  
  return router;
};
