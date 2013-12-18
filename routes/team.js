
/*
 * manage teams
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.add = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        var name = req.params.name;

        db.save(null, {name: name}, function (err) {
            if (err) { throw err; res.send("can't add tean");}

            res.redirect("/");
        });
    });
};

exports.remove = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        var id = req.params.id;

        db.remove(id, function (err) {
            if (err) { throw err; res.send("can't remove team");}

            res.redirect("/");
        });
    });
};