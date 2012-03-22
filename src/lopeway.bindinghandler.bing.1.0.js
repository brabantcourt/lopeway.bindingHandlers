/*global $,jQuery,console,ko,lopeway,Microsoft,window*/
(function (lopeway, $, undefined) {

    "use strict";

    var bing, isSame;

    // Dependencies
    isSame = lopeway.locations.isSame;

    bing = {
        v1: {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

                var config, searchManager, map, mapper, queue = [], request;

                // Converts geocode requests into Microsoft.Maps format
                request = function (o) {
                    // function is map
                    // Converts
                    //  input = { address, success }
                    // output = { where=address, count, callback=success, errorCallback }
                    return {
                        where: o.address,
                        count: 1,
                        callback: function (geocodeResult, userData) {
                            if (geocodeResult.results[0].location) {
                                var l = geocodeResult.results[0].location;
                                o.success(l.latitude, l.longitude);
                            }
                        }
                        //errorCallback: function (geocodeRequest) {}
                    };
                };

                config = valueAccessor().config;
                mapper = valueAccessor().mapper;

                // Creates new Google Map based on 'config'
                map = new Microsoft.Maps.Map(element, {
                    credentials: config.credentials,
                    center: new Microsoft.Maps.Location(config.center.lat, config.center.lng),
                    zoom: config.zoom || 0,
                    width: config.width,
                    height: config.height,
                    mapTypeId: Microsoft.Maps.MapTypeId.road
                });

                // Prepares for Geocoding
                // NB On success, asychronously invokes the callback
                // This will check the queue of existing geocode requests and encode them
                // Once this succeeds, subsequent requests don't need to be queued but may invoke it directly 
                Microsoft.Maps.loadModule('Microsoft.Maps.Search', {
                    callback: function () {
                        searchManager = new Microsoft.Maps.Search.SearchManager(map);
                        $.each(queue, function (i, r) {
                            searchManager.geocode(request(r));
                        });
                    }
                });

                // Methods
                mapper.map = map;
                mapper.addMarker = function (l) {
                    // Iterate over the markers, if the location (l)
                    // Exists (is in markers), set its map
                    // Otherwise create the marker and push it to markers
                    var i, currE, currL, found = false, same = isSame(l);
                    for (i = 0; i < map.entities.getLength() && !found; i = i + 1) {
                        currE = map.entities.get(i);
                        if (currE instanceof Microsoft.Maps.Pushpin) {
                            currL = currE.getLocation();
                            found = same({ lat: currL.latitude, lng: currL.longitude });
                        }
                    }
                    // After checking everything...
                    if (!found) {
                        // Create it, add it to the map and cache it
                        map.entities.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(l.lat, l.lng), { text: l.name }));
                    }
                    return true;
                };
                mapper.delMarker = function (l) {
                    // Iterate over the markers, if the location(l)
                    // Exists (is in markers), set its map to null
                    // Otherwise, there's nothing to do
                    var i, currE, currL, found = false, same = isSame(l);
                    for (i = 0; i < map.entities.getLength() && !found; i = i + 1) {
                        currE = map.entities.get(i);
                        if (currE instanceof Microsoft.Maps.Pushpin) {
                            currL = currE.getLocation();
                            found = same({ lat: currL.latitude, lng: currL.longitude });
                            if (found) {
                                // Because this function is dependent on i, do it here
                                map.entities.removeAt(i);
                            }
                        }
                    }
                    return true;
                };
                mapper.markers = function () {
                    // Iterates over the markers
                    // If the marker's map is null (it's been deleted) then don't count it
                    // Otherwise strips out the Google Maps marker (internal object) and return the lat*lng
                    var arr = [], currE, currL, i;
                    for (i = 0; i < map.entities.getLength(); i = i + 1) {
                        currE = map.entities.get(i);
                        if (currE instanceof Microsoft.Maps.Pushpin) {
                            currL = currE.getLocation();
                            arr.push({ lat: currL.latitude, lng: currL.longitude });
                        }
                    }
                    return arr;
                };
                mapper.geocode = function (o) {
                    // Check whether geocoding's been enabled
                    if (!searchManager) {
                        // If not exists, then queue this request
                        queue.push(o);
                    } else {
                        // If yes exists, then encode it
                        searchManager.geocode(request(o));
                    }
                    return true;
                };
            }
        }
    };

    lopeway.bindingHandlers = lopeway.bindingHandlers || {};
    lopeway.bindingHandlers.maps = lopeway.bindingHandlers.maps || {};
    lopeway.bindingHandlers.maps.bing = bing;

} (window.lopeway = window.lopeway || {}, jQuery));