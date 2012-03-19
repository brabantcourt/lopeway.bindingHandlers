/*globals $,jQuery,google,ko,window*/
(function (lopeway, $, undefined) {

	"use strict";

    var MapService;
    // Classes
    MapService = (function () {

        // Private variables
        var isSame, isValid, markers;

        // Private methods
        isSame = lopeway.locations.isSame;
        isValid = lopeway.locations.isValid;

        // Private observables
        markers = [];

        // Constructor
        function MapService(c, e) {
            // If the config center location is invalid, zero it
            if (!isValid({ lat: c.center.lat, lng: c.center.lng })) {
                c.center.lat = 0;
                c.center.lng = 0;
            }
            this.map = new google.maps.Map(e, {
                zoom: c.zoom || 1,
                center: new google.maps.LatLng(c.center.lat || 0, c.center.lng || 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }

        // Public methods
        MapService.prototype.addMarker = function (m) {
            // If the marker's location is valid, then...
            // Iterate over the markers, if the location (m)
            // Exists (is in markers), set its map
            // Otherwise create the marker and push it to markers
            var curr, infowindow, marker;
            if (isValid({ lat: m.lat, lng: m.lng })) {
                curr = ko.utils.arrayFirst(markers, isSame(m));
                if (curr) {
                    // Exists: Replace it on the map
                    curr.marker.setMap(this.map);
                } else {
                    // Create it, add it to the map and cache it
                    marker = new google.maps.Marker({
                        title: m.name || "",
                        position: new google.maps.LatLng(m.lat, m.lng),
                        map: this.map,
                        draggable: false,
                        visible: true
                    });
                    markers.push({
                        lat: m.lat,
                        lng: m.lng,
                        marker: marker
                    });
                    // If the parameter(m) includes .info, then
                    // Create an InfoWindow and a 'click' event on the marker to show it
                    if (m.info) {
                        infowindow = new google.maps.InfoWindow({
                            content: m.info
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(this.map, marker);
                        });
                    }
                }
                return true;
            } else {
                return false;
            }
        };
        MapService.prototype.delMarker = function (m) {
            // If the marker's location is valid, then...
            // Iterate over the markers, if the location(l)
            // Exists (is in markers), set its map to null
            // Otherwise, there's nothing to do
            var curr;
            if (isValid({ lat: m.lat, lng: m.lng })) {
                curr = ko.utils.arrayFirst(markers, isSame(m));
                if (curr) {
                    curr.marker.setMap(null);
                }
                return true;
            } else {
                return false;
            }
        };
        MapService.prototype.getMarkers = function () {
            // Iterates over the internal markers set
            // If the marker's map is null (it's been deleted) then don't count it
            // Otherwise strips out the Google Maps marker (internal object) and return the lat*lng
            var arr = [], curr, i;
            if (markers) {
                for (i = 0; i < markers.length; i = i + 1) {
                    curr = markers[i];
                    if (curr.marker.map) {
                        arr.push({ lat: curr.lat, lng: curr.lng });
                    }
                }
            }
            return arr;
        };

        return MapService;

    }());

    lopeway.classes = {
        MapService: MapService
    };

}(window.lopeway = window.lopeway || {}, jQuery));