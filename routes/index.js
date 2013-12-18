/*
 * GET home page.
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.index = function (req, res) {

    var db = nStore.new('db/teams.db', function () {

        db.all(function (err, results) {
            // results is an object keyed by document key with the document as the value
            res.render(
                    'index',
                    {
                        title: 'Индивидуальный рейтинг' ,
                        data: results
                    }
            );

        });

    });
};