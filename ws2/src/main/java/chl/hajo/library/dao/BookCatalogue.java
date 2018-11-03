package chl.hajo.library.dao;

import javax.ejb.Stateless;
import java.util.List;
import chl.hajo.library.core.Book;
import chl.hajo.library.service.DataSupplier;

/**
 * All orders Responsible for putting new PurchaseOrders objects into the model
 *
 * @author hajo
 */
@Stateless
public class BookCatalogue  {
    
    private final List<Book> books = DataSupplier.getBooks();

    public BookCatalogue() {  
    }
    
    public List<Book> findByName(String title) {
        return null;
    }

    public Book find(String isbn) {
        for( Book b : books){
            if( b.getIsbn().equals(isbn)){
                return b;
            }
        }
        return null;
    }

    public List<Book> findAll() {
        return books;
    }
   
    
    public void create(Book book) {
         books.add(book);
    }

    public void update(Book book) {
        delete(book.getIsbn());
        create(book);
    }

    public void delete(String isbn) {
        Book b = find(isbn);
        if( b != null){
            books.remove(b);
        }
    }

 
   
}
