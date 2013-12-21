/*
 * manage teams
 */
var database = require("../db/db");

exports.add = function(req, res){
    var name = req.params.name;

    database.addTeam(name, function (err) {
        if (err) {
            throw err; res.send("can't add team");
        } else {
            res.redirect("/teams");
        }
    });
};

exports.remove = function(req, res){
    var id = req.params.id;

    database.removeTeam(id, function (err) {
        if (err) {
            throw err; res.send("can't remove team");
        } else {
            res.redirect("/teams");
        }
    });
};

exports.index = function (req, res) {
    database.getTeams(function (err, teamList) {
        var sortable = [];

        for (var teamItem in teamList) {
            sortable.push([
                teamItem,
                teamList[teamItem].name
            ]);
        }

        sortable.sort(function (a, b) {
            return (a[1].localeCompare(b[1]));
        });

        res.render(
                'teams', {
                    title: 'Участники',
                    data: sortable
                }
        );
    });
};