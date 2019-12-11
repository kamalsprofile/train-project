!function(n){var t={};function I(g){if(t[g])return t[g].exports;var a=t[g]={i:g,l:!1,exports:{}};return n[g].call(a.exports,a,a.exports,I),a.l=!0,a.exports}I.m=n,I.c=t,I.d=function(n,t,g){I.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:g})},I.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},I.t=function(n,t){if(1&t&&(n=I(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var g=Object.create(null);if(I.r(g),Object.defineProperty(g,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var a in n)I.d(g,a,function(t){return n[t]}.bind(null,a));return g},I.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return I.d(t,"a",t),t},I.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},I.p="",I(I.s=131)}({131:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);\nvar _data_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(93, 1);\n\nvar geo;\nvar watchID;\nvar map;\nvar mapMarker;\nconsole.log(_data_json__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction show_map(_ref) {\n  var lat = _ref.lat,\n      lon = _ref.lon;\n  var latlng = new google.maps.LatLng(lat, lon);\n\n  if (map) {\n    //map.panTo(latlng);\n    mapMarker.setPosition(latlng);\n    map.setCenter(latlng);\n    console.log(\'UPDATE\', latlng);\n  } else {\n    var myOptions = {\n      zoom: 5,\n      center: latlng,\n      mapTypeId: google.maps.MapTypeId.ROADMAP\n    };\n    map = new google.maps.Map(document.getElementById(\'map_canvas\'), myOptions); //map.setTilt(0); // turns off the annoying default 45-deg view\n\n    mapMarker = new google.maps.Marker({\n      position: latlng,\n      title: \'You are here.\',\n      map: map\n    });\n    console.log(\'SUCCESS!\');\n  }\n}\n\nfunction simulate_moving(source, destination) {\n  var myLocation = source;\n  return new Promise(function (resolve) {\n    var myInterval = setInterval(function () {\n      show_map(myLocation);\n\n      if (parseInt(myLocation.lat) == parseInt(destination.lat)) {\n        myLocation.lat = destination.lat;\n      } else if (parseInt(myLocation.lat) < parseInt(destination.lat)) {\n        myLocation.lat = parseInt(myLocation.lat) + 1;\n      } else {\n        myLocation.lat = parseInt(myLocation.lat) - 1;\n      }\n\n      if (parseInt(myLocation.lon) == parseInt(destination.lon)) {\n        myLocation.lon = destination.lon;\n      } else if (parseInt(myLocation.lon) < parseInt(destination.lon)) {\n        myLocation.lon = parseInt(myLocation.lon) + 1;\n      } else {\n        myLocation.lon = parseInt(myLocation.lon) - 1;\n      }\n\n      if (myLocation.lat === destination.lat && myLocation.lon === destination.lon) {\n        clearInterval(myInterval);\n        resolve(\'finished\');\n      }\n    }, 300);\n  });\n}\n\nfunction move_train(stations) {\n  var i, myLocation;\n  return regeneratorRuntime.async(function move_train$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          i = 0;\n\n        case 1:\n          if (!(i < stations.length - 1)) {\n            _context.next = 8;\n            break;\n          }\n\n          myLocation = stations[i];\n          _context.next = 5;\n          return regeneratorRuntime.awrap(simulate_moving(myLocation, stations[i + 1]));\n\n        case 5:\n          i++;\n          _context.next = 1;\n          break;\n\n        case 8:\n        case "end":\n          return _context.stop();\n      }\n    }\n  });\n}\n\nvar getMap = function getMap() {\n  console.log("hello");\n};\n\nvar displayTrain = function displayTrain(train) {\n  console.log(train);\n\n  if (train) {\n    return " <div class=\\"col col-4\\" id=\\"train-".concat(train.id, "\\" >\\n<h1>").concat(train.name, "</h1>\\n<div class=\\"row\\">\\n").concat(train.stations.map(function (station) {\n      return "<div class=\\"col col-4\\">".concat(station.name, "</div>");\n    }).join(""), "\\n    \\n</div>\\n<button id=\\"train-").concat(train.id, "\\" onclick=\\"getMap()\\" class=\\"btn btn-primary\\">anything</button>\\n</div>");\n  }\n};\n\nvar root = document.querySelector("#root");\n_data_json__WEBPACK_IMPORTED_MODULE_0__.forEach(function (element) {\n  console.log(element);\n  root.insertAdjacentHTML("beforeend", displayTrain(element));\n  var btn = document.createElement("button");\n  btn.innerHTML = "hello";\n  btn.setAttribute("id", "train-".concat(element.id));\n  btn.setAttribute("class", "see-map");\n  document.querySelector("#train-".concat(element.id)).appendChild(btn);\n  btn.addEventListener("click", function () {\n    var canvas = document.createElement("div");\n    canvas.setAttribute("id", "map-canvas");\n    root.innerHTML = \'\';\n    root.innerHTML = element.id;\n    console.log(element.stations);\n    move_train(element.stations);\n    root.appendChild(canvas);\n    console.log(element.id);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTMxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhIGZyb20gXCIuL2RhdGEuanNvblwiO1xuXG5cbnZhciBnZW87XG52YXIgd2F0Y2hJRDtcbnZhciBtYXA7XG52YXIgbWFwTWFya2VyO1xuXG5jb25zb2xlLmxvZyhEYXRhKTtcblxuXG5mdW5jdGlvbiBzaG93X21hcCh7IGxhdCwgbG9uIH0pIHtcbiAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XG4gICAgaWYgKG1hcCkge1xuICAgICAgICAvL21hcC5wYW5UbyhsYXRsbmcpO1xuICAgICAgICBtYXBNYXJrZXIuc2V0UG9zaXRpb24obGF0bG5nKTtcbiAgICAgICAgbWFwLnNldENlbnRlcihsYXRsbmcpO1xuICAgICAgICBjb25zb2xlLmxvZygnVVBEQVRFJywgbGF0bG5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbXlPcHRpb25zID0ge1xuICAgICAgICAgICAgem9vbTogNSxcbiAgICAgICAgICAgIGNlbnRlcjogbGF0bG5nLFxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgICB9O1xuXG4gICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcF9jYW52YXMnKSwgbXlPcHRpb25zKTtcbiAgICAgICAgLy9tYXAuc2V0VGlsdCgwKTsgLy8gdHVybnMgb2ZmIHRoZSBhbm5veWluZyBkZWZhdWx0IDQ1LWRlZyB2aWV3XG5cbiAgICAgICAgbWFwTWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbjogbGF0bG5nLFxuICAgICAgICAgICAgdGl0bGU6ICdZb3UgYXJlIGhlcmUuJyxcbiAgICAgICAgICAgIG1hcDogbWFwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnU1VDQ0VTUyEnKTtcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBzaW11bGF0ZV9tb3Zpbmcoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgIGxldCBteUxvY2F0aW9uID0gc291cmNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB2YXIgbXlJbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNob3dfbWFwKG15TG9jYXRpb24pXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG15TG9jYXRpb24ubGF0KSA9PSBwYXJzZUludChkZXN0aW5hdGlvbi5sYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG15TG9jYXRpb24ubGF0ID0gZGVzdGluYXRpb24ubGF0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KG15TG9jYXRpb24ubGF0KSA8IHBhcnNlSW50KGRlc3RpbmF0aW9uLmxhdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlMb2NhdGlvbi5sYXQgPSBwYXJzZUludChteUxvY2F0aW9uLmxhdCkgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXlMb2NhdGlvbi5sYXQgPSBwYXJzZUludChteUxvY2F0aW9uLmxhdCkgLSAxO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KG15TG9jYXRpb24ubG9uKSA9PSBwYXJzZUludChkZXN0aW5hdGlvbi5sb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIG15TG9jYXRpb24ubG9uID0gZGVzdGluYXRpb24ubG9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlSW50KG15TG9jYXRpb24ubG9uKSA8IHBhcnNlSW50KGRlc3RpbmF0aW9uLmxvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgbXlMb2NhdGlvbi5sb24gPSBwYXJzZUludChteUxvY2F0aW9uLmxvbikgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXlMb2NhdGlvbi5sb24gPSBwYXJzZUludChteUxvY2F0aW9uLmxvbikgLSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChteUxvY2F0aW9uLmxhdCA9PT0gZGVzdGluYXRpb24ubGF0ICYmIG15TG9jYXRpb24ubG9uID09PSBkZXN0aW5hdGlvbi5sb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnZmluaXNoZWQnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgMzAwXG4gICAgICAgIClcbiAgICB9KVxuXG5cblxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVfdHJhaW4oc3RhdGlvbnMpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGlvbnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGxldCBteUxvY2F0aW9uID0gc3RhdGlvbnNbaV07XG4gICAgICAgIGF3YWl0IHNpbXVsYXRlX21vdmluZyhteUxvY2F0aW9uLCBzdGF0aW9uc1tpICsgMV0pXG5cbiAgICB9XG5cbn1cblxuXG5cblxudmFyIGdldE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG59XG5jb25zdCBkaXNwbGF5VHJhaW4gPSAodHJhaW4pID0+IHtcbiAgICBjb25zb2xlLmxvZyh0cmFpbilcbiAgICBpZiAodHJhaW4pIHtcbiAgICAgICAgcmV0dXJuIGAgPGRpdiBjbGFzcz1cImNvbCBjb2wtNFwiIGlkPVwidHJhaW4tJHt0cmFpbi5pZH1cIiA+XG48aDE+JHt0cmFpbi5uYW1lfTwvaDE+XG48ZGl2IGNsYXNzPVwicm93XCI+XG4ke3RyYWluLnN0YXRpb25zLm1hcCgoc3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYDxkaXYgY2xhc3M9XCJjb2wgY29sLTRcIj4ke3N0YXRpb24ubmFtZX08L2Rpdj5gKVxuICAgICAgICAgICAgfSkuam9pbihcIlwiKX1cbiAgICBcbjwvZGl2PlxuPGJ1dHRvbiBpZD1cInRyYWluLSR7dHJhaW4uaWR9XCIgb25jbGljaz1cImdldE1hcCgpXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5hbnl0aGluZzwvYnV0dG9uPlxuPC9kaXY+YDtcbiAgICB9XG5cblxufVxuXG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIik7XG5EYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgY29uc29sZS5sb2coZWxlbWVudClcbiAgICByb290Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBkaXNwbGF5VHJhaW4oZWxlbWVudCkpO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLmlubmVySFRNTCA9IFwiaGVsbG9cIjtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRyYWluLSR7ZWxlbWVudC5pZH1gKVxuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgc2VlLW1hcGApXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3RyYWluLSR7ZWxlbWVudC5pZH1gKS5hcHBlbmRDaGlsZChidG4pO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1hcC1jYW52YXNcIik7XG4gICAgICAgIHJvb3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJvb3QuaW5uZXJIVE1MID0gZWxlbWVudC5pZDtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5zdGF0aW9ucylcbiAgICAgICAgbW92ZV90cmFpbihlbGVtZW50LnN0YXRpb25zKTtcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50LmlkKVxuICAgIH0pXG59KVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBSUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUhBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUtBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///131\n')},93:function(module){eval('module.exports = JSON.parse("[{\\"id\\":1,\\"name\\":\\"train-1\\",\\"stations\\":[{\\"name\\":\\"station-1\\",\\"lat\\":\\"43.856430\\",\\"lon\\":\\"18.413029\\"},{\\"name\\":\\"station-2\\",\\"lat\\":\\"55.676098\\",\\"lon\\":\\"12.568337\\"},{\\"name\\":\\"station-3\\",\\"lat\\":\\"59.334591\\",\\"lon\\":\\"18.063240\\"}]},{\\"id\\":2,\\"name\\":\\"train-2\\",\\"stations\\":[{\\"name\\":\\"station-1\\",\\"lat\\":\\"43.856430\\",\\"lon\\":\\"18.413029\\"},{\\"name\\":\\"station-2\\",\\"lat\\":\\"55.676098\\",\\"lon\\":\\"12.568337\\"},{\\"name\\":\\"station-3\\",\\"lat\\":\\"59.334591\\",\\"lon\\":\\"18.063240\\"}]},{\\"id\\":3,\\"name\\":\\"train-3\\",\\"stations\\":[{\\"name\\":\\"station-1\\",\\"lat\\":\\"43.856430\\",\\"lon\\":\\"18.413029\\"},{\\"name\\":\\"station-2\\",\\"lat\\":\\"55.676098\\",\\"lon\\":\\"12.568337\\"},{\\"name\\":\\"station-3\\",\\"lat\\":\\"59.334591\\",\\"lon\\":\\"18.063240\\"}]},{\\"id\\":4,\\"name\\":\\"train-4\\",\\"stations\\":[{\\"name\\":\\"station-1\\",\\"lat\\":\\"43.856430\\",\\"lon\\":\\"18.413029\\"},{\\"name\\":\\"station-2\\",\\"lat\\":\\"55.676098\\",\\"lon\\":\\"12.568337\\"},{\\"name\\":\\"station-3\\",\\"lat\\":\\"59.334591\\",\\"lon\\":\\"18.063240\\"}]},{\\"id\\":5,\\"name\\":\\"train-5\\",\\"stations\\":[{\\"name\\":\\"station-1\\",\\"lat\\":\\"43.856430\\",\\"lon\\":\\"18.413029\\"},{\\"name\\":\\"station-2\\",\\"lat\\":\\"55.676098\\",\\"lon\\":\\"12.568337\\"},{\\"name\\":\\"station-3\\",\\"lat\\":\\"59.334591\\",\\"lon\\":\\"18.063240\\"}]}]");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///93\n')}});