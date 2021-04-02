// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField = d3.select("#datetime");
var oldInput = "";

// Default Table function
function tableDefault(){
tableData.forEach(function(sighting){
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(function([key, value]){
        var cell = row.append("td");
        cell.text(value);
        });
    });
};

// Filter table based on user date input
function tableUpdate(userDate){
    dateFilter = tableData.filter(data => data.datetime === userDate);
    dateFilter.forEach(function(sighting){
        console.log(sighting);
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(function([key, value]){
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

// Load table based on input
function tableLoad(inputDate){
    console.log(`new: ${inputDate}`);
    console.log(`old: ${oldInput}`);
    if (!inputDate && oldInput){
        console.log("loaded default table");
        tbody.html("");
        tableDefault();
    }
    else if (oldInput !== inputDate){
        tbody.html("");
        tableUpdate(inputDate);
    }   
    else if (oldInput === inputDate){
        console.log("Input submitted has not changed from last query");
    };
    oldInput = inputDate;
};

// Sends date from inputField to tableFilter function
function clickHandle() {
    console.log("Button clicked");
    var newInput = inputField.property("value");
    tableLoad(newInput);
};

// Call default table with page load
tableDefault();

button.on("click", clickHandle);

// Allows user to use "Enter" key to submit a date
inputField.on("keyup",function(){
    if (d3.event.keyCode == 13) {
        console.log("Enter key event");
        button.dispatch('click');
    }
    else {
        return false;
    }
});






