package chl.hajo.library.rest;

import chl.hajo.library.core.Author;
import chl.hajo.library.core.Book;
import chl.hajo.library.dao.AuthorRegistry;
import chl.hajo.library.dao.BookCatalogue;
import chl.hajo.library.service.DataSupplier;
import com.google.gson.Gson;
import javax.ejb.EJB;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 * @author hajo
 */

@Path("db")
public class DatabaseResource {

    @EJB
    private AuthorRegistry areg;
    @EJB
    private BookCatalogue bcat;
    private final Gson gson = new Gson();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response recreateDatabase() {
        areg.clear();
        bcat.clear();
        
        for (Author a : DataSupplier.getAuthors()) {
            areg.create(a);
        }
        
        for(Book b : DataSupplier.getBooks()) {
            bcat.create(b);
        }
        
        return Response.ok(gson.toJson("Database recreated")).build();
    }

}
