/*
     An ES6 module exporting a Table class
     This is ECMA-script 6 (ES6 or ES2015)

     This uses JQuery for DOM maipulation
*/
export class Table {

  constructor(rows, cols, data, striped) {
    this.rows = rows;
    this.cols = cols;
    this.data = data;
    this.striped = striped;
  }

  render() {

    var tbl = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var dataNr = 0;

    for (var i = 0; i < this.rows; i++) {
      var tableRow = document.createElement('tr');

      if ( this.striped ) {
        if (i % 2 === 0) {
          tableRow.className="grey";
        } else {
          tableRow.className="white";
        }
      }

      for (var j = 0; j < this.cols; j++) {
        var tableData = document.createElement('td');
        var tableText = document.createTextNode(this.data[dataNr++]);
        tableData.appendChild(tableText);
        tableRow.appendChild(tableData);
      }
      tableBody.appendChild(tableRow);
    }
    tbl.appendChild(tableBody);

    return tbl;
  }

  edit(row, col, value) {
    this.data[row * this.cols + col] = value;
  }

}
