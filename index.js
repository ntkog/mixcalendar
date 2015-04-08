var fs = require("fs");
var CALENDAR_NAME = "calendar.ics";

var communities = [
"APIdays-Mediterranea-community",
"Accesibilidad-Spain","AngularJS_Madrid",
"Arduino-Madrid","ConectaLAB-Desarrollo","Drone-Madrid","Drupales",
"Emacs-Madrid","Famo-us-Madrid","FirefoxOS-Madrid","Geo-Developers",
"Growth-Hack-Spain-Meetup","Guifi-net-Madrid","HTML5-Spain",
"Hackathon-Lovers","Lenguando","MachineLearningSpain","Madrid-Appcelerator-Titanium",
"Madrid-C-Cpp","Madrid-ElasticSearch-Meetup","Madrid-Polymer-Group","Madrid-Python-Meetup",
"Madrid-Sass-Compass-Meetup","Medialab-Prado","NSCoder-Night-Madrid","Node-js-Madrid",
"OpenStack-Spain","PHPMad","Prestashop-Madrid",
"Spanish-Git-Meetup",
"TetuanValley",
"UX-Academy",
"WordPress-Madrid",
"edupreneursMAD","go-mad","graphdb-spain","iotmadrid",
"madriagil","madrid-devops","madrid-fsharp","madrid-gug","madriddotnet","madridjs",
"madswcraft",
"videogamearmy",
"pcf-madrid"
];


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

