/*globals $,jQuery,window*/
(function (lopeway, $, undefined) {

    "use strict";

	var inRange;

    inRange = function (inclusive) {
        return function (value, lower, upper) {
            if (lower >= upper) { throw "'lower' must be less than 'upper'"; }
            if (typeof value !== "number" || typeof lower !== "number" || typeof upper !== "number") { throw "All values must be numbers"; }
            return ((inclusive) && (lower <= value) && (value <= upper)) || ((!inclusive) && (lower < value) && (value < upper));
        };
    };

    lopeway.utilities = {
        inRange: inRange
    };

}(window.lopeway = window.lopeway || {}, jQuery));