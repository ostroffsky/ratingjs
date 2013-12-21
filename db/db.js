/**
 * Created by Alexey Ostrovsky.
 * Date: 21.12.13
 * Time: 14:06
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

/* TEAMS */
exports.addTeam = function(name, cb) {
    var db = nStore.new('db/teams.db', function () {

        db.save(null, {name: name}, cb);
    });
};

exports.removeTeam = function(id, cb) {
    var db = nStore.new('db/teams.db', function () {

        db.remove(id, cb);
    });
};

exports.getTeams = function(cb) {
    var db = nStore.new('db/teams.db', function () {
        db.all(cb);
    });
};
/* /TEAMS */

/* EVENTS */
exports.addEvent = function(data, cb, id) {
    // id - optional
    id = id || null;

    var db = nStore.new('db/events.db', function () {

        db.save(id, data, cb);
    });
};

exports.removeEvent = function(id, cb) {
    var db = nStore.new('db/events.db', function () {

        db.remove(id, cb);
    });
};

exports.getEvent = function(id, cb) {
    var db = nStore.new('db/events.db', function () {

        db.get(id, cb);
    });
};

exports.getEvents = function(cb) {
    var db = nStore.new('db/events.db', function () {
        db.all(cb);
    });
};
/* /EVENTS */