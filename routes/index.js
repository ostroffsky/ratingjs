/*
 * GET home page.
 */
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

var database = require("../db/db");

exports.index = function (req, res) {


    database.getTeams(function (teamErr, teamList) {
        database.getEvents(function (eventErr, eventList) {

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

};