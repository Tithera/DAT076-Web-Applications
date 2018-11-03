package chl.hajo.library.control;

import chl.hajo.library.core.Book;
import chl.hajo.library.dao.BookCatalogue;
import chl.hajo.library.service.DataSupplier;
import java.io.Serializable;
import static java.lang.System.out;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.inject.Named;
import lombok.Getter;
import lombok.Setter;
import net.bootsfaces.utils.FacesMessages;
import chl.hajo.library.util.ExceptionHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import net.bootsfaces.component.dataTable.DataTable;

/**
 * @author tthera
 */

@Named("bok")
//@RequestScoped
@SessionScoped
public class BookBean implements Serializable {
    
    private static final Logger LOG = Logger.getLogger(BookBean.class.getName());
    @EJB        // Injecting an Enterprise bean
    private BookCatalogue breg;
    @Getter     // Lombok
    @Setter
    private Book tmp = new Book();
    
    
    @PostConstruct // CDI life cycle callbacks
    void post() {
        out.println(this + "Alive");
    }

    public void page() {
       // Faces context hold all data relevant for this request
       DataTable dt = (DataTable) FacesContext.getCurrentInstance().getViewRoot()
               .findComponent("bookForm:bookTable");
       LOG.log(Level.INFO, "Test {0}", dt.getJQueryEvents()); 
    }
    
    // ------------ Navigation -------------------

    public void cancel() {
        tmp = new Book();
    }
    
    // --------- Call backend -------------------------
    public void setBook() {
        tmp = breg.find(tmp.getIsbn());
    }

    public List<Book> findAll() {
        return breg.findAll();
    }
    
    public void add() {
        
        try {
            breg.create(tmp);
            FacesMessages.info("Success");
        } catch (RuntimeException sql) {
            String message = ExceptionHandler.getMessage(sql);
            FacesMessages.info("Fail " + message);
        }
        tmp = new Book();
    }
    
    
    public void update() {
        breg.update(tmp);
        tmp = new Book();
    }

    public void delete() {
        breg.delete(tmp.getIsbn());
        tmp = new Book();
    } 
    
    
}
