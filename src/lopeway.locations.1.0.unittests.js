/*global $,lopeway,module,test,expect,equal,deepEqual,ok,raises */
$(function () {

    "use strict";

    var l1 = { lat: 0, lng: 0 }, l2 = { lat: 90, lng: 90 }, bad = { lat: 95, lng: -200 };

    module("lopeway.locations");

    test("isEqual", function () {
        // Expect
        expect(6);
        // Arrange
        var isEqual = lopeway.locations.isEqual;
        // Act
        // Assert
        ok(isEqual(l1, l1));
        ok(isEqual(l2, l2));
        equal(isEqual(l1, l2), false);
        equal(isEqual(l1, l2), isEqual(l2, l1));
        raises(function () { isEqual(l1, bad); });
        raises(function () { isEqual(bad, l2); });
    });
    test("isSame", function () {
        // Expect
        expect(6);
        // Arrange
        var isSame = lopeway.locations.isSame;
        // Act
        // Assert
        ok(isSame(l1)(l1));
        ok(isSame(l2)(l2));
        equal(isSame(l1)(l2), false);
        equal(isSame(l1)(l2), isSame(l2)(l1));
        raises(function () { isSame(bad); });
        raises(function () { isSame(l1)(bad); });
    });
    test("isValid", function () {
        // Expect
        expect(6);
        // Arrange
        var isValid = lopeway.locations.isValid;
        var bad1 = { lat: -95, lng: 0 }, bad2 = { lat: 0, lng: +185 }, bad3 = { lat: -95, lng: +185 };
        // Act
        // Assert
        ok(isValid(l1));
        equal(isValid(bad1), false);
        equal(isValid(bad2), false);
        equal(isValid(bad3), false);
        raises(function () { isValid({ lat: "Fred", lng: 0 }); });
        raises(function () { isValid({ lat: 0, lng: "Fred" }); });
    });
    test("randomize", function () {
        // Expect
        expect(6);
        // Arrange
        var randomize = lopeway.locations.randomize, isValid = lopeway.locations.isValid;
        //var l1 = { lat: 0, lng: 0 }, l2 = { lat: 90, lng: 90 }, bad1 = { lat: -500, lng: +500 };
        // Act
        // Assert
        ok(isValid(randomize(l1, 180)));
        ok(isValid(randomize(l2, 180)));
        raises(function () {
            // Must provide a valid location
            randomize(bad, 10);
        });
        raises(function () {
            // Must provide a number for the offset
            randomize(l1, "Fred");
        });
        raises(function () {
            // Offset must be at least 0
            randomize(l1, -10);
        });
        raises(function () {
            // Offset must be at most 180
            randomize(l1, 190);
        });
    });
    test("world", function () {
        // Expect
        expect(1);
        // Arrange
        var world = lopeway.locations.world, isValid = lopeway.locations.isValid;
        // Act
        // Assert
        ok(isValid(world.usa.wa.redmond));
    });
});