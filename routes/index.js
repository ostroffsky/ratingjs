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

                    var resultObject = {};

                    for (var teamItem in teamList) {
                        // teamItem; // team id
                        // teamList[teamItem]; // team name

                        var sum = 0;

                        for(var eventItem in eventList) {
                            //eventList[eventItem]; // event obj
                            //eventList[eventItem].results[teamItem]; // team points @ event
                            sum += parseInt(eventList[eventItem].results[teamItem]);
                        }

                        resultObject[teamItem] = {
                            id: teamItem,
                            name: teamList[teamItem].name,
                            points: sum
                        };
                    }



                    res.render(
                            'index', {
                                title: 'Индивидуальный рейтинг',
                                data: resultObject
                            }
                    );
                });
            });


        });
    });
};