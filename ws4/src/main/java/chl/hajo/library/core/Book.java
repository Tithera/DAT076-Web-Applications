package chl.hajo.library.core;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Embedded;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A book written by some author(s)
 * @author hajo
 */

@NoArgsConstructor
@EqualsAndHashCode(of = {"isbn"})
@Entity
@Table(name = "book")
public class Book implements Serializable {
    
    @Id
    @Getter
    @Setter
    @Column(nullable=false)
    private String isbn;
    
    @Getter
    @Setter
    //@Size(min = 2, max = 20, message = "Title must be between 2 and 20 characters")
    private String title;
    
    @Setter
    @Getter
    private Genre genre;
    
    @Getter
    @Setter
    private double price;

    
    public Book(String isbn, String title, Genre genre, double price) {
        this.isbn = isbn;
        this.title = title;
        this.genre = genre;
        this.price = price;
    }
   
    
    @Override
    public String toString() {
        return "Book{" + "isbn=" + isbn + ", title=" + title + ", genre=" + genre
                + ", price=" + price + '}';
    }
    

}
