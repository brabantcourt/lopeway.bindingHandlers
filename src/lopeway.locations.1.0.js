/*globals $,jQuery,window*/
(function (lopeway, $, undefined) {

	"use strict";

    var isEqual, inRange, isSame, isValid, randomize, world;

    // Private methods
    inRange = function (inclusive) {
        return function (value, lower, upper) {
            if (lower >= upper) { throw "'lower' must be less than 'upper'"; }
            if (typeof value !== "number" || typeof lower !== "number" || typeof upper !== "number") { throw "All values must be numbers"; }
            return ((inclusive) && (lower <= value) && (value <= upper)) || ((!inclusive) && (lower < value) && (value < upper));
        };
    };
    isEqual = function (l1, l2) {
        if (!isValid(l1) || !isValid(l2)) { throw "Arguments must both be valid locations"; }
        return l1.lat === l2.lat && l1.lng === l2.lng;
    };
    isSame = function (l1) {
        if (!isValid(l1)) { throw "Argument must be a valid location"; }
        return function (l2) {
            if (!isValid(l1)) { throw "Argument must be a valid location"; }
            return isEqual(l1, l2);
        };
    };
    isValid = function (l) {
        if (typeof l.lat !== "number" || typeof l.lng !== "number") { throw "Argument must contain 'lat' and 'lng' and both must be numbers."; }
        var inclRange = inRange(true);
        return inclRange(l.lat, -90.0, +90.0) && inclRange(l.lng, -180.0, +180.0);
    };
    randomize = function (l, o) {
        // Check that 'l' is a valid location
        if (!isValid(l)) { throw "Must provide a valid location"; }
        // Check that 'o' is a number
        if (typeof o !== "number") { throw "Must provide a number for the offset parameter."; }
        // Check that 'o' is within bounds
        if (o < 0 || o > 180) { throw "Offset parameters must be at least 0 and at most 180"; }
        // Could go out of bounds
		// Lat singles the random value +/- 090
		// Lng doubles the random value +/- 180
        var lat = l.lat + (Math.random() * o - o / 2), lng = l.lng + (Math.random() * 2 * o - o);
        if (lat > +90) { lat -= 180; } else if (lat < -90) { lat += 180; }
        if (lng > +180) { lng -= 360; } else if (lng < -180) { lng += 360; }
        return { lat: lat, lng: lng };
    };

    // Default locations for key World cities
    world = {
        usa: {
            wa: {
                redmond: { name: "Redmond, WA", lat: 47.676484, lng: -122.121792 }
            }
        }
    };

    // Public methods
    lopeway.locations = {
        isEqual: isEqual,
        isSame: isSame,
        isValid: isValid,
        randomize: randomize,
        world: world
    };

}(window.lopeway = window.lopeway || {}, jQuery));