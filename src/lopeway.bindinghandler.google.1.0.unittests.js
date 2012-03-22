/*global $,console,ko,lopeway,module,asyncTest,test,expect,equal,deepEqual,ok,raises,start,stop */
$(function () {

    "use strict";

    module("lopeway.bindinghandlers.maps.google");

    var m, RedmondWA, viewModel;

    // Create a div to contain the map and add the KnockoutJS data-binding
    $("#tests").append("<div id='map01'></div>");
    $("#map01").attr("style", "position: relative; width: 512px; height: 512px;");
    $("#map01").attr("data-bind", "mapsHandler1: { config: config, mapper: mapper }");
    $("#map01").hide();

    // Binding Handlers
    ko.bindingHandlers.mapsHandler1 = lopeway.bindingHandlers.maps.google.v2;

    // View Model
    RedmondWA = lopeway.locations.world.usa.wa.redmond;
    viewModel = {
        config: {
            center: RedmondWA,
            zoom: 2
        },
        mapper: {}
    };
    ko.applyBindings(viewModel, $("#map01").get(0));

    // Test Markers
    m = [
        { name: "Test#01", lat: 10, lng: 0 },
        { name: "Test#02", lat: 20, lng: 0 }
    ];

    test("v2", function () {
        // Expect
        expect(14);
        // Arrange
        var curr = viewModel.mapper;
        // Act
        // Assert
        ok(curr);
        ok(curr.map);
        ok(curr.addMarker);
        ok(curr.delMarker);
        ok(curr.markers);
        ok(curr.addMarker(m[0]));
        equal(curr.markers().length, 1);
        ok(curr.addMarker(m[0]));
        equal(curr.markers().length, 1);
        ok(curr.addMarker(m[1]));
        equal(curr.markers().length, 2);
        ok(curr.delMarker(m[0]));
        ok(curr.delMarker(m[1]));
        equal(curr.markers().length, 0);
    });

});