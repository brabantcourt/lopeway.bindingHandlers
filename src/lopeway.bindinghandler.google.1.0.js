/*global $,jQuery,console,ko,lopeway,window*/
(function (lopeway, $, undefined) {

    "use strict";

    var google;

    google = {
        v2: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

                var config, mapper, mapService;

                config = valueAccessor().config;
                mapper = valueAccessor().mapper;

                mapService = new lopeway.classes.MapService(config, element);

                // Methods
                mapper.map = mapService.map;
                mapper.addMarker = mapService.addMarker;
                mapper.delMarker = mapService.delMarker;
                mapper.markers = mapService.getMarkers;

            }
        }
    };

    lopeway.bindingHandlers = lopeway.bindingHandlers || {};
    lopeway.bindingHandlers.maps = lopeway.bindingHandlers.maps || {};
    lopeway.bindingHandlers.maps.google = google;

} (window.lopeway = window.lopeway || {}, jQuery));