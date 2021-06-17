// take the time and display it on currentDay
var currentDay = moment().format("[Today is ] dddd, MMMM Do");
var currentTime = moment().format('hh:mm:ss a');

let finalHour = "";
let timeMap = new Map();

$("#currentDay").replaceWith(currentDay);

for (let hour = 9; hour < 18; hour++) {

    // this div will hold the 3 smaller divs: time, descrip & save
    let mainDiv = $('<div>');

    // 1st column: hour - format time from 24 to 12 HR & create div

    let timeDiv = $('<div>');
    if (hour > 12 && hour != 12)  {
        finalHour = ((hour - 12) + " PM");
    } 

    else if (hour == 12){
        finalHour = hour + " PM"
    }

    else {
        finalHour = (hour + " AM");
    }


    timeDiv.text(finalHour);
    timeDiv.addClass('hour col-1 text-center d-flex flex-column justify-content-center');
    

    // second column contains the task description
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