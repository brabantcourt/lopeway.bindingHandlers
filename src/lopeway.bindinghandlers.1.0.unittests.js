/*global $,ko,lopeway,module,test,expect,equal,deepEqual,ok,raises */
$(function () {

    "use strict";

    module("lopeway.bindinghandlers");

    var $maps, m1, m2, RedmondWA, viewModel;

    $maps = $("#maps");
    $("#map").attr("css", "position:relative;width:100%;height:512px;");

    $maps.append("<div id='map01' class='map'></div>");
    $("#map01").attr("data-bind", "mapsHandler01: { config: config, mapper: mapper }");  

    // Binding Handlers
    ko.bindingHandlers.mapsHandler01 = lopeway.bindingHandlers.maps.Google.v2;

    // View Model
    RedmondWA = lopeway.locations.world.usa.wa.redmond;
    viewModel = {
        Goog2: {
            config: {
                center: RedmondWA,
                zoom: 2
            },
            mapper: {}
        }
    };
    ko.applyBindings(viewModel.Goog2, $("#map01").get(0));

    // Test Markers
    m1 = { name: "Test#01", lat: 10, lng: 0 };
    m2 = { name: "Test#02", lat: 20, lng: 0 };

    test("maps.Google.v2", function () {
        // Expect
        expect(14);
        // Arrange
        var curr = viewModel.Goog2.mapper;
        // Act
        // Assert
        ok(curr);
        ok(curr.map);
        ok(curr.addMarker);
        ok(curr.delMarker);
        ok(curr.markers);
        ok(curr.addMarker(m1));
        equal(curr.markers().length, 1);
        ok(curr.addMarker(m1));
        equal(curr.markers().length, 1);
        ok(curr.addMarker(m2));
        equal(curr.markers().length, 2);
        ok(curr.delMarker(m1));
        ok(curr.delMarker(m2));
        equal(curr.markers().length, 0);
    });
});