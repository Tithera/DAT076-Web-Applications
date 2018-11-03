package chl.hajo.library.service;

import chl.hajo.library.core.Address;
import chl.hajo.library.core.Author;
import chl.hajo.library.core.Book;
import chl.hajo.library.core.Genre;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Just to get some data
 * @author hajo
 */

public class DataSupplier {

    private final static Address[] ADDRS = {new Address("Vägen", 1, "Bruksorten"),
        new Address("Stigen", 2, "Centralorten"), new Address("Allen", 3, "Storstaden")};
    
    private static final Random RAND = new Random();

    public static Address getRandomAddress() {
        return ADDRS[RAND.nextInt(ADDRS.length)];
    }
    
    
    private final static Genre[] GENRE = {Genre.BIOGRAPHY, Genre.NOVEL, 
        Genre.ROMANTIC_NOVEL, Genre.THRILLER };
    
    public static Genre getRandomGenre() {
        return GENRE[RAND.nextInt(GENRE.length)];
    }

    
    public static List<Author> getAuthors() {
        List<Author> authors = new ArrayList<>();
        String[] auths = {
            "FF;Fia;Fiasson;fia@mail",
            "NN;Nisse;Nissesson;nisse@mail",
            "PP;Pelle;Pellesson;pelle@mail",
            "SN;Siv;Nissesson;siv@mail",
            "PE;Pelle;Eriksson;eriksson@mail",
            "RU;Ruben;Eriksson;ruben@mail"
        };
        for (String s : auths) {
            String[] d = s.split(";");
            Author a = new Author(d[0], d[1], d[2], d[3], getRandomAddress());
            authors.add(a);
        }
        return authors;
    }
    
    
    public static List<Book> getBooks () {
        List<Book> books = new ArrayList<>();
        
        String[] bookstring = {
            "isbn1;Hunger Games;THRILLER;100.0",
            "isbn2;Harry Potter;THRILLER;150.0",
            "isbn3;The Mortal Instrument;NOVEL;80.0",
            "isbn4;Stalking Jack the Ripper;NOVEL;199.9",
            };
        
        for (String t : bookstring) {
            String[] b = t.split(";");
            Book bk = new Book(b[0],b[1], Genre.valueOf(b[2]),Double.parseDouble(b[3]));
            books.add(bk);
        }
        return books;
    }

    
}
