function MixCalendar () {
  var _ = require("lodash");
  var Rx = require("rx");
  var ical = require("ical-generator");
  var icalImporter = require('ical');
  var moment = require('moment');
  var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[{};:'".,<>?«»“”‘’]|\]|\?))/ig

  var overlap = {};

  var CALENDAR_NAME = "calendar.ics";
  var cal = ical({
    domain: 'comunidadestecnologicas.info',
    prodId: {company: 'comunidadestecnologicas.info', product: 'ical-generator'},
    name: 'Calendario Común',
    timezone : 'Europe/Madrid'
  });


  function getIcalUrls (community) {
    var url = !community.match(/\.ics/)
      ? "http://www.meetup.com/" + community + "/events/ical/"
      : community;

    return url;
  }



  function store(obj) {
    var current = moment(obj.start).format("YYYYMMDDHH");
    if(_.has(overlap, current)) {
      overlap[current].push(obj.url);

    } else {
      overlap[current] = [ obj.url ];
    }
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
      return validIcs(result);
    }).map( function (result) {
        return _.filter(result , { type: "VEVENT"});
    }).filter( function (arr) {
        return !_.isEmpty(arr);
    });

  }

  function validIcs(obj) {
    return !_.isEmpty(obj) && !_.keys(obj).join("").match(/unauthorized/);
  }

  function normalizeEvent (obj) {

    var normalized = {};
    if (_.has(obj,"description") && obj.description.match(/URL/)) {
      normalized.url = obj.description.match(uri_pattern)[0];
    }
    normalized.description = _.has(obj,"description") && obj.description.replace(/\n/g," ");
    return _.extend(obj,normalized);

  }

  function createEvents (arr) {
    _.map(arr, function(obj) {
      normalizeEvent(obj);
      cal.createEvent(normalizeEvent(obj));
      store(obj);
    });
  }

  function watchSeq (obs , cb) {

    seq = obs.subscribe(
      function (events) {
        createEvents(events);
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
    },
    overlapping: function() {
      debugger;
      return _.filter( _.map(overlap, function( v,k ) {
        if (v.length > 1) {
          return { date : k, events: v};
        }
      }), function (obj) {
        return obj;
      });
    }
  }
}

module.exports = MixCalendar();
