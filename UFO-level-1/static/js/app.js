// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField = d3.select("#datetime");

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

// Call default table with page load
tableDefault();

// Filter table function. If input blank while submitting load default table. 
// If default table is already loaded
function tableFilter(newInput){
    console.log(`new: ${newInput}`)
    console.log(`old: ${oldInput()}`)
    if (newInput === "" && oldInput() === "1/13/2010"){
        console.log("Default table already loaded")
    }
    else if (newInput === ""){
        console.log("loaded default table");
        tbody.html("");
        tableDefault();
    }
    else if (oldInput() !== newInput){
        tbody.html("");
    dateFilter = tableData.filter(data => data.datetime == newInput);
    dateFilter.forEach(function(sighting){
        console.log(sighting);
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(function([key, value]){
            var cell = row.append("td");
            cell.text(value);
        });
    });
    }   
    else if (oldInput() === newInput){
        console.log("Input submitted has not changed from last query")
    };
};

// function that returns last date in the data table.
// If the first date in the table matches the submitted input no need to render table again.
function oldInput(){
    var tdEmpty = d3.select("tr td").empty();
    if (tdEmpty === false) {
        var td = d3.select("tr:last-child td:first-child").node("innerhtml").textContent;
        return td;
    }
    else {
        return false;
    };
};

// Sends date from inputField to tableFilter function
function clickHandle() {
    console.log("Button clicked");
    var newInput = inputField.property("value");
    tableFilter(newInput);
};

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






