var fs = require("fs");
var CALENDAR_NAME = "calendar.ics";

var non_meetup =  [
  "http://calendario.es.python.org/calendario-madrid.ics",
  "http://www.madridrb.com/events.ics"
];

var meetup_communities = [
//"Data-Science-Spain", // Non-public
//"Rivas-Tech-Society", // Non-Public
//"desarrollowebsegovia", // Non-Public
//"Open-Analytics-Charlas-de-Analitica-de-datos-con-OpenSource", // Wrong description format
"Hackathon-Lovers",
"FP-Madrid",
"FirefoxOS-Madrid",
"madriagil",
"madridjs",
"Hacks-Hackers-Madrid",
"iotmadrid",
"Accesibilidad-Spain",
"graphdb-spain",
"EcommBeersMadrid",
"HTML5-Spain",
"WordPress-Madrid",
"madrid-gug",
"BigDataSpain",
"indiegamesMadrid",
"Corona-SDK-Madrid",
"LeanStartupCircle-Madrid",
"Madrid-Appcelerator-Titanium",
"madswcraft",
"Madrid-MongoDB-User-Group",
"Spain-Mobile-Apps-Developer-Group",
"Meteor-Madrid",
"AngularJS_Madrid",
"Makespace-Madrid",
"Madrid-Cassandra-Users",
"madriddotnet",
"Madrid-CUDA-Cats",
"Big-Data-Developers-in-Madrid",
"WSO2-Professionals-Madrid",
"Madrid-Puppet-Users-Group",
"the-api-hour-group",
"Drupal-Madrid",
"NSCoder-Night-Madrid",
"eCommerce-para-principiantes-FikStores-Madrid",
"Arduino-Madrid",
"Medialab-Prado",
"Madrid-MySQL-users-group",
"Scala-Programming-Madrid",
"VIM-Madrid",
"PHPMad",
"Node-js-Madrid",
"Factoria-Startup-Idea-viable-Equipo-solido-Beta-Funcional",
"Ciudad-Real-JS",
"JDevelopers",
"Emacs-Madrid",
"RobotsMadrid",
"PostgreSQL-Espana",
"Gr2Dest-Grupo-de-estudio-de-seguridad-informatica",
"canasbloggers",
"Test-Meet",
"Designerpills",
"Madrid-MBaaS-User-Group",
"Code-Club-Espana",
"go-mad",
"MAD-for-OpenStack",
"MadridSUG",
"InGame",
"InBounders",
"InternetAcademiers-en-Madrid",
"Madrid-Umbraco-Meetup-Group",
"Chromecasting",
"Madrid-C-Cpp",
"Madrid-Content-Strategy-Meetup",
"Software-Craftsmanship-Toledo-ES",
"Ethereum-Spain",
"Drupales",
"Docker-Madrid",
"Madrid-disenadores-Meetup-INTERIORES",
"Madrid-Python-Meetup",
"Social-Media-y-Posicionamiento-en-Buscadores-Madrid-Noroeste",
"madrid-devops",
"Comunidades-Tecnologicas-Madrid",
"Test-Tube-Madrid",
"HackerNestMAD",
"Generando-tus-propios-ingresos",
"Geo-Developers",
"Bluemove-Community",
"Madrid-Bitcoin-Community",
"Data-Science-Madrid",
"Stratio",
"Prestashop-Madrid",
"Madrid-On-Rails",
"Spanish-Git-Meetup",
"Famo-us-Madrid",
"TetuanValley",
"How-to-code-Madrid",
"DockerEspanaMeetup",
"Guifi-net-Madrid",
"Meetup-Bitcoin-Madrid",
"MachineLearningSpain",
"NoSQL-Meetup-Madrid",
"Madrid-ElasticSearch-Meetup",
"Madrid-Polymer-Group",
"Apache-Cassandra-meetup",
"OpenStack-Spain",
"ConversionThursday",
"Impresion-3D-Madrid",
"MAD-OpenTech",
"Madrid-Google-Apps-for-Work-Meetup",
"madrid-fsharp",
"applecoding",
"Innovative-technology-BEEVA",
"Madrid-eLearning-Meetup",
"UX-Academy",
"Ansible-Madrid",
"Madrid-Nightowls",
"Redradix-Weekends",
"Sinfonier-Project",
"WebRTC-Meetup-Madrid",
"hyperpolyglot",
"Ember-js-Madrid",
"Madrid-Continuous-Delivery",
"madrid-dug",
"Madrid-Arduino-y-Domotica-Meetup",
"Madrid-Amazon-Web-Services-Meetup",
"Geeks-Madrid",
"MSCoders",
"Grupo-de-Usuarios-de-R-de-Madrid",
"Vim-Users",
"Madrid-PaaS-and-Bluemix-Computing-Meetup",
"IoT-Analytics-Spain",
"Vaadin-Spain",
"Wordpress-Enterprise-Madrid",
"MadridJUG",
"Mozilla-Meetup",
"Madrid-Drones-Meetup",
"MadridJUG"
];

var communities = non_meetup.concat(meetup_communities);


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

