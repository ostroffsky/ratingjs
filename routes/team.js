
/*
 * add team
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.add = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        var name = req.params.name;

        // It's loaded now
        db.save(null, {name: name}, function (err) {
            if (err) { throw err; res.send("can't add tean");}
            // The save is finished and written to disk safely
        });

        res.redirect("/");
    });
};

exports.remove = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        // It's loaded now
        var id = req.params.id;

        db.remove(id, function (err) {
            if (err) { throw err; res.send("can't remove team");}
            // The document at key "creationix" was removed
            res.redirect("/");
        });
    });
};

exports.list = function(req, res){
    var db = nStore.new('db/teams.db', function () {
        // It's loaded now
        db.all(function (err, results) {
            // The database is now empty
            res.send(results);
        });
    });
};