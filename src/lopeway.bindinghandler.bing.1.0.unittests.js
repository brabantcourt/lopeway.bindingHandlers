/*global $,console,ko,lopeway,module,asyncTest,test,expect,equal,deepEqual,ok,raises,start,stop */
$(function () {

    "use strict";

    module("lopeway.bindingHandlers.maps.bing");

    var a, m, RedmondWA, viewModel;

    // Create a div to contain the map and add the KnockoutJS data-binding
    $("#tests").append("<div id='map02'></div>");
    //$("#map02").attr("style", "position: relative; width: 100%; height: 512px;");
    $("#map02").attr("data-bind", "mapsHandler2: { config: config, mapper: mapper }");
    $("#map02").hide();

    // Binding Handlers
    ko.bindingHandlers.mapsHandler2 = lopeway.bindingHandlers.maps.bing.v1;

    // View Model
    RedmondWA = lopeway.locations.world.usa.wa.redmond;
    viewModel = {
        config: {
            credentials: null,
            center: RedmondWA,
            width: 512,
            height: 512
        },
        mapper: {}
    };
    ko.applyBindings(viewModel, $("#map02").get(0));

    // Test Markers
    m = [
        { name: "Test#01", lat: 10, lng: 0 },
        { name: "Test#02", lat: 20, lng: 0 }
    ];

    a = ["1600 Pennsylvania Ave NW  Washington, DC 20500 USA", "One Microsoft Way Redmond WA 98052 USA"];

    test("v1", function () {
        // Expect
        expect(19);
        // Arrange
        var curr, testGeocode;
        curr = viewModel.mapper;
        // Act
        // Assert

        // Are all the binding handler properties in place?
        ok(curr);
        ok(curr.map);
        ok(curr.addMarker);
        ok(curr.delMarker);
        ok(curr.markers);
        ok(curr.geocode);

        // Adding a marker should increment the markers count
        ok(curr.addMarker(m[0]));
        equal(curr.markers().length, 1);

        // Adding the same marker twice should *not* increment the count
        ok(curr.addMarker(m[0]));
        equal(curr.markers().length, 1);

        ok(curr.addMarker(m[1]));
        equal(curr.markers().length, 2);

        // Deleting markers should decrement the count
        ok(curr.delMarker(m[0]));
        ok(curr.delMarker(m[1]));
        equal(curr.markers().length, 0);

        // Geocoding address happens asynchronously
        // 
        testGeocode = function (address, expectLat, expectLng) {
            // Helper rounds 'number' to 'digits' decimal places
            function roundNumber(number, digits) {
                var multiple, result;
                multiple = Math.pow(10, digits);
                result = Math.round(number * multiple) / multiple;
                return result;
            }
            curr.geocode({
                address: address,
                success: function (actualLat, actualLng) {
                    equal(roundNumber(actualLat, 4), roundNumber(expectLat, 4));
                    equal(roundNumber(actualLng, 4), roundNumber(expectLng, 4));
                    start();
                }
            });
        };
        stop();
        testGeocode(a[0], 38.8977, -77.0387);
        stop();
        testGeocode(a[1], 47.6402, -122.1298);

    });
});