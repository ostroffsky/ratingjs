/**
 * Created by Alexey Ostrovsky.
 * Date: 20.12.13
 * Time: 21:05
 */



$(function() {
    var currentLocation = window.location.pathname;

    $("#navigation")
            .find(".navigation_a")
            .each(function() {
                var self = $(this);
                if (self.attr("href") == currentLocation) {
                    self.addClass("__active");
                }
            });
});