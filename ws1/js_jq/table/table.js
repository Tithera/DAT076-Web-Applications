/*
   A function to create a HTML-table. Using plain JS and standard DOM API
*/

// The function to implement
function createTable(rows, cols, data) {

  var tbl = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var dataNr = 0;

    for (var i = 0; i < rows; i++) {
      var tableRow = document.createElement('tr');

      if (i % 2 === 0) {
        tableRow.className="grey";
      } else {
        tableRow.className="white";
      }

      for (var j = 0; j < cols; j++) {
        var tableData = document.createElement('td');
        var tableText = document.createTextNode(data[dataNr++]);
        tableData.appendChild(tableText);
        tableRow.appendChild(tableData);
      }
      tableBody.appendChild(tableRow);
    }
    tbl.appendChild(tableBody);
    return tbl;
}

// Dummy data
var data = "The Document Object Model (DOM) is a programming interface for" +
"HTML, XML and SVG documents. It provides a structured representation of the" +
" document as a tree. The DOM defines methods that allow access to the tree," +
" so that they can change the document structure, style and content.";

// Executed at download
var parent = document.getElementById("parent");
var table = createTable(10, 5, data.split(" "));
parent.appendChild(table);
