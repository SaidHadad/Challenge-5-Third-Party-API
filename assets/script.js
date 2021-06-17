// variables to be used for time manipulation and the table creation
var currentDay = moment().format("[Today is ] dddd, MMMM Do");
var currentTime = moment().format('hh:mm:ss a');
var finalHour = "";
let timeMap = new Map();

// take the time and display it on currentDay
$("#currentDay").replaceWith(currentDay);

// load any saved data from localStorage into the timeMap Map
if (localStorage.getItem("myMap")) {
    timeMap = new Map(JSON.parse(localStorage.myMap));
} else {
    let timeMap = new Map();
}

for (let hour = 9; hour < 18; hour++) {

    // this is the main div for the time table
    var mainDiv = $('<div>');

    // This is the time column and will hold the work hours from 9am to 5pm
    let timeDiv = $('<div>');
    if (hour > 12 && hour != 12)  {
        finalHour = ((hour - 12) + " PM")
    } 
    else if (hour == 12) {
        finalHour = hour + " PM"
    }
    else {
        finalHour = (hour + " AM")
    }
    timeDiv.text(finalHour);
    timeDiv.addClass('hour col-1 text-center d-flex flex-column justify-content-center');
    

    // This is the second column and it contains the textarea with the task description
    var taskDiv = $("<div>");
    var textDescription = $("<textarea>");
    textDescription.attr("id", "textarea" + hour);

    taskDiv.append(textDescription);
    taskDiv.addClass("description col-10");

    // third column contains the save button
    var saveIcon = $("<i>");
    saveIcon.addClass("far fa-save");
    var saveDiv = $("<div>");
    saveDiv.addClass("saveBtn col-1 text-center d-flex flex-column justify-content-center").attr("id", "button" + hour);
    
    saveDiv.append(saveIcon);

    // This is to append all three columns into the main column
    mainDiv.append(timeDiv, taskDiv, saveDiv).addClass("main-div row");

    // This is to give the color scheme to the table 
    var currentTime = moment().format("HH");
    if (currentTime > hour) {
        mainDiv.addClass("past");
    }
    else if (currentTime < hour) {
        mainDiv.addClass("future");
    }
    else {
        mainDiv.addClass("present");
    }

    // Last step is to append the mainDiv into the html container
    $("#main-container").append(mainDiv);

}

timeMap.forEach(function (text, key) {
    // load anything saved in localStorage onto the calendar
    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).value = text;
});

// when the user clicks the save button on that hour it will be written to memory and persist with window reloads
$(".saveBtn").on('click', function () {
    if(this.id === "button9") {
        textArea = "#textarea" + (this.id.slice(-1));
        textAreaValue = $(textArea).val();
        timeMap.set(this.id.slice(-1), textAreaValue);
    }
    else {
        textArea = "#textarea" + (this.id.slice(-2));
        textAreaValue = $(textArea).val();
        timeMap.set(this.id.slice(-2), textAreaValue);
    }
    
    localStorage.myMap = JSON.stringify(Array.from(timeMap.entries()));
});