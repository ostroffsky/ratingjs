/*
 * manage events
 */
var database = require("../db/db");

exports.add = function(req, res){
    var name = {
        name: req.params.name
    };

    database.addEvent(name, function (err) {
        if (err) {
            throw err; res.send("can't add event");
        } else {
            res.redirect("/events");
        }
    });
};

exports.edit = function(req, res){
    var id = req.params.id;
    var params = req.query;

    database.getEvent(id, function (err, team) {

        if (team) {
            var data = {
                name: team.name,
                results: params
            };

            database.addEvent(data, function (err) {
                if (err) {
                    throw err; res.send("can't edit event");
                } else {
                    res.redirect("/events");
                }
            }, id);
        } else {
            // just redirect
            res.redirect("/events");
        }

    });

};

exports.remove = function(req, res){
    var id = req.params.id;

    database.removeEvent(id, function (err) {
        if (err) {
            throw err; res.send("can't remove event");
        } else {
            res.redirect("/events");
        }
    });
};

exports.index = function(req, res){
    database.getEvents(function (err, results) {

        database.getTeams(function (err, teamResults) {

            res.render(
                    'events', {
                        title: "Соревнования",
                        events: results,
                        teams: teamResults
                    }
            );
        });

    });
};