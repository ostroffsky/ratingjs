/**
 * Created by Alexey Ostrovsky.
 * Date: 23.12.13
 * Time: 0:12
 */

exports.extractTopN = function(obj, N) {

    var array = [];

    for (var key in obj) {
        array.push([
            key,
            obj[key]
        ]);
    }

    array.sort(function(a, b) {
        return b[1] - a[1];
    });

    var top = {};
    var index = 0;
    var level = N;

    while (level) {
        var item = parseInt(array[index][1]);
        var nextItem = parseInt(array[index + 1][1]);

        var place = (N - level + 1);

        top[array[index][0]] = place;

        if (nextItem != item) {
            level--;
        }

        index++;
    }

    return top;
};