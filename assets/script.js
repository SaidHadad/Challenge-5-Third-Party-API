// take the time and display it on currentDay
var currentDay = moment().format("[Today is ] dddd, MMMM Do");
var currentTime = moment().format('hh:mm:ss a');

let amPM = "AM";
let finalHour = "";
let timeMap = new Map();

$("#currentDay").replaceWith(currentDay);

for (let hour = 9; hour < 18; hour++) {

    // this div will hold the 3 smaller divs: time, descrip & save
    let mainDiv = $('<div>');

    // 1st column: hour - format time from 24 to 12 HR & create div

    let timeDiv = $('<div>');
    if (hour > 12) {
        finalHour = ((hour - 12) + ":00 AM");
    } else {
        finalHour = (hour + ":00 PM");
    }

    if (finalHour < 10) {
        // this helps formatting the time column to make them even
        finalHour = "  " + finalHour;
    }

    timeDiv.text(finalHour);
    timeDiv.addClass('hour col-1');
    

    // second column contains the task description
    var taskDiv = $("<div>");
    var textDescription = $("<textarea>");
    textDescription.attr("id", "textarea" + hour);

    taskDiv.append(textDescription);
    taskDiv.addClass("description col-10");

    // third column contains the save button
    var saveIcon = $("<i>");
    saveIcon.addClass("far fa-save d-flex justify-content-center");
    var saveDiv = $("<div>");
    saveDiv.addClass("saveBtn col-1 text-center").attr("id", "button" + hour);

    saveDiv.append(saveIcon);

    mainDiv.append(timeDiv, taskDiv, saveDiv).addClass("main-div row");

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

    $("#main-container").append(mainDiv);

}