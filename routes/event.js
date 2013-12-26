/*
 * manage events
 */
var database = require("../db/db");
var utils = require("../utils/utils");

exports.add = function(req, res){
    var name = req.params.name;

    database.addEvent(name, function () {
        res.redirect("/events");
    });
};

exports.edit = function(req, res){
    var id = req.params.id;
    var params = req.query;

    var top = utils.extractTopN(params, 3);

    database.updateEvent(id, params, top, function () {
       res.redirect("/events");
    });

};

exports.remove = function(req, res){
    var id = req.params.id;

    database.removeEvent(id, function () {
        res.redirect("/events");
    });
};

exports.index = function(req, res){
    database.getEvents(function (results) {
        database.getTeams(function (teamResults) {
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