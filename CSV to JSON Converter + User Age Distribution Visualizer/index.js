const fs = require("fs");
const db = require('./app')
const filepath = require('./environment')

csvFile = fs.readFileSync(filepath)


console.log('Reading CSV')

var csv = csvFile.toString().split("\r\n");

var result = [];
var properties = csv[0].split(", ")


var i = 0;
var j = 0;
for (i = 1; i <= csv.length - 1; i++) {
    var obj = {};
    var curLineValues = csv[i].split(", ");
    for (j = 0; j < properties.length; j++) {

        var valueText = curLineValues[j];
        var property = properties[j];
        if (property.split(".").length > 1) {
            var header = property.split(".")
            var propertyText = header[0];
            var attribute = header[1];

            if (!obj[propertyText]) {
                obj[propertyText] = {};
            }
            obj[propertyText][attribute] = valueText;
        }
        else {
            obj[property] = valueText;
        }

    };
    result.push(obj);
};


var json = result;

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