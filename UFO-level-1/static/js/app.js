// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField = d3.select("#datetime");

function tableFilter(newInput){
    if (oldInput() !== newInput){
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

function oldInput(){
    var tdEmpty = d3.select("tr td").empty();
    if (tdEmpty === false) {
        var td = d3.select("tr td").node("innerhtml").textContent;
        return td;
    }
    else {
        return false;
    };
};


inputField.on("keyup",function(){
    if (d3.event.keyCode == 13) {
        console.log("Enter key event");
        button.dispatch('click');
    }
    else {
        return false;
    }
});


function clickHandle() {
    console.log("Button clicked");
    var newInput = inputField.property("value");
    tableFilter(newInput);
};

button.on("click", clickHandle);



