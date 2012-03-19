/*global $,lopeway,module,test,expect,equal,deepEqual,ok,raises */
$(function () {

    "use strict";

    module("lopeway.utilities");

    test("inRange", function () {
        var inRange, lower = 0, upper = 100, below = lower - 10, above = upper + 10;
        // Expect
        expect(12);
        // Arrange: Inclusive(true)
        inRange = lopeway.utilities.inRange(true);
        // Act
        //Assert
        ok(inRange(lower, lower, upper));
        ok(inRange(upper, lower, upper));
        equal(inRange(below, lower, upper), false);
        equal(inRange(above, lower, upper), false);
        raises(function () {
            // Exception if lower>=upper
            inRange(0, upper, lower);
        });
        raises(function () {
            // Exception if any param is non-number
            inRange("", upper, lower);
        });
        raises(function () {
            // Exception if any param is non-number
            inRange(0, "", lower);
        });
        raises(function () {
            // Exception if any param is non-number
            inRange(0, upper, "");
        });
        // Arrange: Inclusive(false)
        inRange = lopeway.utilities.inRange(false);
        // Act
        //Assert
        equal(inRange(lower, lower, upper), false);
        equal(inRange(upper, lower, upper), false);
        equal(inRange(below, lower, upper), false);
        equal(inRange(above, lower, upper), false);
    });

});