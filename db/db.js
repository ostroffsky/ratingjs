/**
 * Created by Alexey Ostrovsky.
 * Date: 21.12.13
 * Time: 14:06
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

var mongoose = require('mongoose');
mongoose.connect('mongodb://ostroffsky.com/rating');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('MongoDB connected...')
});


/* DATA SCHEMAS */
var teamSchema = mongoose.Schema({
    name: String
});

var eventSchema = mongoose.Schema({
    name: String,
    results: Object,
    places: Object
});


var Team = mongoose.model('Team', teamSchema);
var Event = mongoose.model('Event', eventSchema);

/* TEAMS */
exports.addTeam = function(name, cb) {
    var team = new Team({name: name});

    team.save(function (err, team) {
        if (err) {
            console.log("Can't add team:", err);
        } else {
            cb();
        }

    });
};

exports.removeTeam = function(id, cb) {
    Team.remove({ _id: id }, function(err) {
        if (err) {
            console.log("Can't remove tean");
        } else {
            cb();
        }
    });
};

exports.getTeams = function(cb) {
    Team.find(function(err, teamList) {
        if(err) {
            console.log("Can't get teams");
        } else {
            cb(teamList);
        }
    });
};
/* /TEAMS */

/* EVENTS */
exports.addEvent = function(name, cb) {
    var event = new Event({name: name});

    event.save(function (err) {
        if (err) {
            console.log("Can't add team:", err);
        } else {
            cb();
        }
    });
};

exports.updateEvent = function(id, results, top, cb) {
    Event.findOne({_id: id}, function (err, event) {
        if (err) {
            console.log("Can't add team:", err);
        } else {
            event.results = results;
            event.places = top;
            event.save(cb);
        }
    });
};

exports.removeEvent = function(id, cb) {
    Event.remove({ _id: id }, function(err) {
        if (err) {
            console.log("Can't remove tean");
        } else {
            cb();
        }
    });
};

exports.getEvent = function(id, cb) {
    Event.findOne({_id : id}, function(err, eventList) {
        if(err) {
            console.log("Can't get teams");
        } else {
            cb(eventList);
        }
    });
};

exports.getEvents = function(cb) {
    Event.find(function(err, eventList) {
        if(err) {
            console.log("Can't get teams");
        } else {
            cb(eventList);
        }
    });
};
/* /EVENTS */