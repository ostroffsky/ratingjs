/*
 * GET home page.
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.index = function (req, res) {

    var db = nStore.new('db/teams.db', function () {
        db.all(function (err, teamList) {

            var events = nStore.new('db/events.db', function () {
                events.all(function (err, eventList) {

                    var sortable = [];
                    var index = 0;

                    for (var teamItem in teamList) {
                        // teamItem; // team id
                        // teamList[teamItem]; // team name

                        var sum = 0;
                        index++;

                        for(var eventItem in eventList) {
                            //eventList[eventItem]; // event obj
                            //eventList[eventItem].results[teamItem]; // team points @ event
                            sum += parseInt(eventList[eventItem].results[teamItem]);
                        }

                        sortable.push([
                            teamItem,
                            teamList[teamItem].name,
                            sum
                        ]);
                    }

                    sortable.sort(function (a, b) {
                        return (b[2] - a[2]) || (a[1].localeCompare(b[1]));
                    });

                    res.render(
                            'index', {
                                title: 'Индивидуальный рейтинг',
                                data: sortable
                            }
                    );
                });
            });
        });
    });
};