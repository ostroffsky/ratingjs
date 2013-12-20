
/*
 * manage teams
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.add = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        var name = req.params.name;

        db.save(null, {name: name}, function (err) {
            if (err) { throw err; res.send("can't add team");}

            res.redirect("/teams");
        });
    });
};

exports.remove = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        var id = req.params.id;

        db.remove(id, function (err) {
            if (err) { throw err; res.send("can't remove team");}

            res.redirect("/teams");
        });
    });
};

exports.index = function (req, res) {
    var db = nStore.new('db/teams.db', function () {
        db.all(function (err, teamList) {
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
    });
};