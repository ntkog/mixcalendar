function MixCalendar () {
  var _ = require("lodash");
  var Rx = require("rx");
  var ical = require("ical-generator");
  var icalImporter = require('ical');


  var CALENDAR_NAME = "calendar.ics";
  var cal = ical({
    domain: 'comunidadestecnologicas.info',
    prodId: {company: 'comunidadestecnologicas.info', product: 'ical-generator'},
    name: 'Calendario Común',
    timezone : 'Europe/Madrid'
  });


  function getIcalUrls (community) {
    return "http://www.meetup.com/" + community + "/events/ical/";
  }


  function CreateSeq ( arrOps ) {

    var hit = Rx.Observable.fromNodeCallback(icalImporter.fromURL);
    return Rx.Observable.generateWithRelativeTime(
      arrOps,
      function checkLimit ( task) {
        return task.length > 0;
      },
      function increment (task) {
        task.shift();
        return task;

      },
      function(task) {
          return task[0];
      },
      function(x) {
        return 200;
      }
    ).flatMap(function (url) {
      return hit(url, {});
    }).filter( function (result) {
      return !_.isEmpty(result);
    }).map( function (result) {
        return _.filter(_.mapValues(result), { type : "VEVENT" })[0];
    });

  }

  function watchSeq (obs , cb) {

    seq = obs.subscribe(
      function (obj) {
        cal.createEvent(obj);
      },
      function (err) {
        cb(true, null);
      },
      function() {
        cb(null , cal.toString());
      }
    );
  }
  
  return {
    get: function( coms, cb) {
      
      var iCalUrls = _.map(coms, getIcalUrls);
      return watchSeq(CreateSeq(iCalUrls), cb);
    }
  }
}

module.exports = MixCalendar();