/*
 *  This is a separate AJAX (very basic) client side application 
 *  running on same domain calling REST back (so no CORS nedded)
 *  
 *  This is ES5 
 *  
 *  NOTE: Copied jquery.min.js from node_modules to here
 *  
 */
// jQuery document reade function (so that the DOM is fully constructed)
$(function() {
    $("#get").on("click", rest.get);
    $("#getById").on("click", rest.getById);
    $("#add").on("click", rest.add);
    $("#delete").on("click", rest.delete);
    $("#clear").on("click", rest.clear);

});

// rest is singe JS object returned from an called ananymous function
// see the return value below.
var rest = (function() {
   
    var baseURL = "http://localhost:8080/ws4/rest/author/"; 
    return {
        get: function() {
            console.log("Before ajax get call");
            $.get(baseURL).then(function(json) {
                console.log(json);
                $("#success").html(JSON.stringify(json));
            }).fail( // This is jQuery, standard Promise is catch()
                    function(error) { // Error
                $("#error").html(JSON.stringify(error));
            });
            console.log("After ajax get call");
        },
        getById: function() {
            var id = $("#id").val();
            $.get(baseURL + id).then(function(json) {
                console.log(json);
                $("#success").html(JSON.stringify(json));
            }).fail(function(error) { // Error
                $("#error").html(JSON.stringify(error));
            });
            console.log("After ajax get call");
        },
        delete: function() {
            var id = $("#id").val();
            $.ajax({
                url: baseURL + id,
                type: 'DELETE',
                success: function() {
                    console.log("Delete " + id);
                }
            });
        },
        add: function() {
            var name = $("#name").val();
            console.log(name);
            var id = name.substring(0,2).toUpperCase();
            var newAuthor = {id: id, fname: name, lname:name, email: name + "@post" };
            $.post(baseURL, newAuthor).fail(function(error) {
            //$.post(baseURL, {name: name}).fail(function(error) {
                $("#error").html(JSON.stringify(error));
            });
        },
        clear: function() {
            $("#success").empty();
            $("#error").empty();
        }
    };
})();
