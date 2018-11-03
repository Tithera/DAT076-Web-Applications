package chl.hajo.library.rest;

import chl.hajo.library.core.Book;
import chl.hajo.library.core.Genre;
import chl.hajo.library.dao.BookCatalogue;
import chl.hajo.library.service.DataSupplier;
import com.google.gson.Gson;
import static java.lang.System.out;
import java.net.URI;
import java.util.List;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 * @author hajo
 */

@Path("book")
public class BookResource {

    private static final Logger LOG = Logger.getLogger(AuthorResource.class.getName());

    @Context
    private UriInfo uriInfo;

    @EJB
    private BookCatalogue bcat;
    private final Gson gson = new Gson();

    // Provides access to application and request URI information. 
    // Relative URIs are relative to the base URI of the application
    @GET
    @Path("{isbn : [a-zA-Z0-9]+}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response find(@PathParam("isbn") String isbn) {
        System.out.println("hello isbn " + isbn);
        Book p = bcat.find(isbn);
        if (p != null) {
            return Response.ok(gson.toJson(p)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); 
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response findAll() {
        out.println("*** findAll");
        List<Book> authors = bcat.findAll();
        out.println(authors);
        return Response.ok(gson.toJson(authors)).build(); //hallo
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON + ";charset=utf-8"})
    @Path("count")
    public Response count() {
        int count = bcat.count();
        return Response.ok(gson.toJson(count)).build();
    }

    /* TODO @GET
    @Path("range")
    @Produces({MediaType.APPLICATION_JSON})
    public Response findRange(@QueryParam("fst") int firstResult,
            @QueryParam("max") int n) {
        List<TodoNote> notes = list.getNotes();
       
        return Response.ok(gson.toJson(notes)).build();
    }*/
    
    @POST
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response create(@FormParam("isbn") String isbn, @FormParam("title") String title,
            @FormParam("genre") Genre genre, @FormParam("price") Double price) {
        
        Book book = new Book(isbn, title, genre, price);
        bcat.create(book);
        URI bookUri = uriInfo
                .getAbsolutePathBuilder()
                .path(String.valueOf(book.getIsbn()))
                .build(book);
        // Set it to 201 (created) and setting response header 'Location'
        // Inspect with cURL
        return Response.created(bookUri).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response create(Book book) {
        bcat.create(book);
        URI bookUri = uriInfo
                .getAbsolutePathBuilder()
                .path(String.valueOf(book.getIsbn()))
                .build(book);
        // Set it to 201 (created) and setting response header 'Location'
        // Inspect with cURL
        return Response.created(bookUri).build();
    }

    @DELETE
    @Path("{isbn : [a-zA-Z0-9]+}")
    public Response delete(@PathParam("isbn") String isbn) {
        // A successful response SHOULD be 200 (OK) if the response includes an 
        //entity describing the status, 202 (Accepted) if the action has not yet 
        //been enacted, or 204 (No Content) if the action has been enacted but 
        //the response does not include an entity.
        bcat.delete(isbn);
        return Response.noContent().build();
    }

    @PUT
    @Path("{isbn : [a-zA-Z0-9]+}")
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED})
    public Response update(@FormParam("isbn") String isbn, @FormParam("title") String title,
            @FormParam("genre") Genre genre, @FormParam("price") Double price) {
        System.out.println("isbn " + isbn);
        Book book = bcat.find(isbn);
        if (book != null) {
            book.setTitle(title);
            book.setGenre(genre);
            book.setPrice(price);
            bcat.update(book);
            //If an existing resource is modified, either the 200 (OK) or 204 
            //(No Content) response codes SHOULD be sent to indicate 
            //successful completion of the request.
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @PUT
    @Path("{isbn : [a-zA-Z0-9]+}")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response update(Book book) {
        Book b = bcat.find(book.getIsbn());
        if (b != null) {
            b.setTitle(book.getTitle());
            b.setGenre(book.getGenre());
            b.setPrice(book.getPrice());
            bcat.update(book);
            //If an existing resource is modified, either the 200 (OK) or 204 
            //(No Content) response codes SHOULD be sent to indicate 
            //successful completion of the request.
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
}
