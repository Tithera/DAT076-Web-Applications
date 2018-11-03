package chl.hajo.library.control;

import chl.hajo.library.core.Book;
import chl.hajo.library.dao.BookCatalogue;
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
import net.bootsfaces.component.form.Form;

/**
 *
 * @author hajo
 */
@Named("bok")
//@RequestScoped
@SessionScoped
public class BookBean implements Serializable {

    private static final Logger LOG = Logger.getLogger(BookBean.class.getName());
    @EJB
    private BookCatalogue bcat;
    @Getter
    @Setter
    private Book tmp = new Book();
    private final int start = 0;
    private int nRecords = 50;

    @Getter
    @Setter
    private Form form;

    @PostConstruct
    void post() {
        out.println(this + "Alive");
    }

    public void page() {
        /*Map<String, String> map = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        for( Entry<String, String> e : map.entrySet()){
        LOG.log(Level.INFO, "Key " + e.getKey() + " val " + e.getValue() );
        }*/
       DataTable dt = (DataTable) FacesContext.getCurrentInstance().getViewRoot().
               findComponent("bookForm:bookTable");
       
       LOG.log(Level.INFO, "Test {0}", dt.getJQueryEvents()); //) +  );
    }
    // ------------ Navigation -------------------

    public void cancel() {
        tmp = new Book();
    }

    // --------- Call backend -------------------------
    public void setBook() {
        tmp = bcat.find(tmp.getIsbn()); //Fixa denna
    }

    public List<Book> findAll() {
        return bcat.findAll();
        //List<Author> found = areg.findRange(start, nRecords);
        //start += nRecords;
        //return found;
    }

    public void add() {
        try {
            bcat.create(tmp);
            FacesMessages.info("Success");
        } catch (RuntimeException sql) {
            String message = ExceptionHandler.getMessage(sql);
            FacesMessages.info("Fail " + message);
        }
        tmp = new Book();
    }

    public void update() {
        bcat.update(tmp);
        tmp = new Book();
    }

    public void delete() {
        bcat.delete(tmp.getIsbn());
        tmp = new Book();
    }

}
