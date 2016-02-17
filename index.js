var fs = require("fs");
var setup = require("./setup.json");
var CALENDAR_NAME = "Solapamientos Funcional";

var communities = setup.NonMeetupBased.concat(setup.MeetupBased);


function getCalendar (err, cal ) {
  if (err) {
    console.log("Error generating calendar:  %s - %s", err, cal );
  }
  else {
    writeFile(CALENDAR_NAME + ".ics", cal);
    var overlap = MixCalendar.overlapping();
    console.log(overlap.length > 0 ? overlap : "No hay solapamientos");

  }
}

function writeFile(path, data) {
  var wstream = fs.writeFileSync(path,data);
  console.log("Calendar written in " + path);
}

var MixCalendar = require('./mixCalendar')(CALENDAR_NAME);
MixCalendar.get(communities, getCalendar);
