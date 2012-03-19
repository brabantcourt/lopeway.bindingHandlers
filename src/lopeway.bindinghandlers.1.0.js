/*global $,jQuery,google,ko,lopeway,Microsoft,window*/
(function (lopeway, $, undefined) {

	"use strict";

	var bindingHandlers, isSame;

	// Dependencies
	isSame = lopeway.locations.isSame;

	bindingHandlers = {
		maps: {
			Google: {
				v2: {
					init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

						var config, mapper, mapService;

						config = valueAccessor().config;
						mapper = valueAccessor().mapper;

						mapService = new lopeway.classes.MapService(config, element);

						mapper.map = mapService.map;
						mapper.addMarker = mapService.addMarker;
						mapper.delMarker = mapService.delMarker;
						mapper.markers = mapService.getMarkers;

					}
				}
			}
		}
	};

	lopeway.bindingHandlers = bindingHandlers;

}(window.lopeway = window.lopeway || {}, jQuery));