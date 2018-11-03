/*
    Endpoint for url http://localhost:8080/api/authors
*/
import {
  Router
} from "express";
import {
  Author
} from "../entity/author";

export const authorResource = ({
  config,
  db
}) => {
  let router = new Router();

  // URL: localhost:8080/api/authors        visar alla author
  router.get('/', (req, res, next) => {
    db.getRepository(Author)
      .find()
      .then(result => {
        res.json(result);
      });
  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/authors/count      räknar antal author
  router.get('/count', (req, res, next) => {
    //console.log("GET: count (size)");
    db.getRepository(Author)
      .createQueryBuilder("author")
      .select("COUNT(author.id)", "count")
      .getRawOne()
      .then(count => {
        res.json(count);
      });
  });

  // URL: localhost:8080/api/authors/FF         hittar en specifik author
  router.get('/:id', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Author)
      .findOneById(req.params['id'])
      .then(found => {
        res.json(found);
      });
  });

  router.post('/', (req, res, next) => {        //lägger till en ny author
    console.log(req.body);
    db.getRepository(Author)
      .save(req.body)
      .then(() => {
        res.status(201).send();
      });
  });
  
  
  router.put('/:id',(req, res, next) => {         //uppdaterar en author
    console.log(req.body, req.params);
        db.getRepository(Author)
      .createQueryBuilder("author")
      .update()
      .set(req.body)
      .where("id = :id", { id: req.params['id'] })
      .execute()
      .then(result =>{
         res.json(result); 
      });      
  });

  
  router.delete('/:id', (req, res, next) => {       //tar bort en author
    db.getRepository(Author)
      .createQueryBuilder("author")
      .delete()
      .where("id = :id", { id: req.params['id'] })
      .execute()
      .then(result => {
          res.json(result);
       });
  });
    
  
  return router;
};
