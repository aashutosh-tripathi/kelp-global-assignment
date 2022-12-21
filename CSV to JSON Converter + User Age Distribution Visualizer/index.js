const fs = require("fs");
const db = require('./app')
const filepath = require('./environment')

csv = fs.readFileSync(filepath)


console.log('Reading CSV')

var array = csv.toString().split("\r\n");

let result = [];
let headers = array[0].split(", ")


var i = 0, j = 0;
for (i = 1; i <= array.length - 1; i++) {
    var obj = {};
    var myNewLine = array[i].split(", ");
    for (j = 0; j < headers.length; j++) {

        var valueText = myNewLine[j];
        var headerText = headers[j];
        if (headers[j].split(".").length > 1) {
            var header = headers[j].split(".")
            var headerText2 = header[0];
            var attribute = header[1];

            if (!obj[headerText2]) {
                obj[headerText2] = {};
            }
            obj[headerText2][attribute] = valueText;
        }
        else {
            obj[headerText] = valueText;
        }

    };
    result.push(obj);
};


let json = result;

console.log('CSV converted to JSON')
console.log('Saving to database')

db.init();

var k;
for (k = 0; k < json.length; k++) {
    var row = json[k];
    var name = '';
    var age = 0;
    var address = {};
    var additional_info = {};

    Object.keys(row).forEach(function (key, index) {
        if (key === 'name') {
            name = row[key].firstName + row[key].lastName;
        }
        else if (key === 'age') {
            age = row[key];
        }
        else if (key === 'address') {
            address = row[key];
        }
        else {
            additional_info[key] = row[key];
        }
    });

    db.insertRow(name, age, address, additional_info)

}

db.showData();