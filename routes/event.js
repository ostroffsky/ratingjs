
/*
 * manage events
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.add = function(req, res){
    var db = nStore.new('db/events.db', function () {
        var name = req.params.name;

        db.save(null, {name: name}, function (err) {
            if (err) { throw err; res.send("can't add event");}

            res.redirect("/events");
        });
    });
};

exports.edit = function(req, res){
    var db = nStore.new('db/events.db', function () {
        var id = req.params.id;
        var params = req.query;

        db.get(id, function (err, team) {

            if (team) {
                var data = {name: team.name};
                data.results = params;

                db.save(id, data, function (err) {
                    if (err) { throw err; res.send("can't edit event");}

                    res.redirect("/events");
                });
            } else {
                // just redirect
                res.redirect("/events");
            }

        });


    });
};

exports.remove = function(req, res){
    var db = nStore.new('db/events.db', function () {
        var id = req.params.id;

        db.remove(id, function (err) {
            if (err) { throw err; res.send("can't remove event");}

            res.redirect("/events");
        });
    });
};

exports.index = function(req, res){
    var db = nStore.new('db/events.db', function () {
        db.all(function (err, results) {

            var teams = nStore.new('db/teams.db', function () {
                teams.all(function (err, teamResults) {

                    res.render(
                            'events', {
                                title: "Соревнования",
                                events: results,
                                teams: teamResults
                            }
                    );
                });
            });
        });
    });
};