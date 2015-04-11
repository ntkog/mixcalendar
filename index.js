var fs = require("fs");
var setup = require("./setup.json");
var CALENDAR_NAME = "calendar.ics";

var communities = setup.NonMeetupBased.concat(setup.MeetupBased);


function getCalendar (err, cal ) {
  if (err) {
    console.log("Error generating calendar");
  }
  else {
    writeFile(CALENDAR_NAME, cal);
  }
}

function writeFile(path, data) {
  var wstream = fs.writeFileSync(path,data);
  console.log("Calendar written in " + path);
}

var MixCalendar = require('./mixCalendar');
MixCalendar.get(communities, getCalendar);

