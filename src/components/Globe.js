import React, { Component } from "react";
import planetaryjs from "planetary.js";

import { fetchingData } from "../data";
// import topojson from "topojson";
import {
  array,
  axisBottom,
  brush,
  contourDensity,
  fetch,
  geo,
  projection,
  d3
} from "d3";

export default class extends Component {
  state = {
    issLat: "40.730610",
    issLon: "-73.935242"
  };

  // componentWillReceiveProps(nextProps){

  // }
  shouldComponentUpdate() {
    return false;
  }

  async componentDidMount() {
    const res = fetchingData();
    const something = await res;

    var planet = planetaryjs.planet();

    // You can remove this statement if `world-110m.json`
    // is in the same path as the HTML page:
    planet.loadPlugin(
      planetaryjs.plugins.earth({
        topojson: {
          file:
            "https://raw.githubusercontent.com/BinaryMuse/planetary.js/v1.1.2/dist/world-110m.json"
        },
        /* Let's add some color to the globe */
        oceans: { fill: "#0D4551" },
        land: { fill: "#4CAF50" },
        borders: { stroke: "#1B5E20" }
      })
    );

    // Load the `pings` plugin to draw animated pings on the globe
    planet.loadPlugin(
      planetaryjs.plugins.pings({
        color: "#ffffff",
        ttl: 4000,
        angle: 90
      })
    );

    planet.loadPlugin(
      planetaryjs.plugins.drag({
        onDragStart: function() {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function() {
          this.plugins.autorotate.resume();
        }
      })
    );
    planet.loadPlugin(autorotate(2));

    // Set up the globe's initial scale, offset, and rotation.
    planet.projection
      .scale(210)
      .translate([220, 240])
      .rotate([0, -10, 0]);
    var canvas = document.getElementById("rotatingGlobe");

    setInterval(function() {
      // Let's add a random ping in the pacific ocean, every second
      planet.plugins.pings.add(something.issLon, something.issLat);
    }, 1000);
    // This plugin will automatically rotate the globe around its vertical
    // axis a configured number of degrees every second.
    function autorotate(degPerSec) {
      // Planetary.js plugins are functions that take a `planet` instance
      // as an argument...
      return function(planet) {
        var lastTick = null;
        var paused = false;
        planet.plugins.autorotate = {
          pause: function() {
            paused = true;
          },
          resume: function() {
            paused = false;
          }
        };
        // ...and configure hooks into certain pieces of its lifecycle.
        planet.onDraw(function() {
          if (paused || !lastTick) {
            lastTick = new Date();
          } else {
            var now = new Date();
            var delta = now - lastTick;
            // This plugin uses the built-in projection (provided by D3)
            // to rotate the globe each time we draw it.
            var rotation = planet.projection.rotate();
            rotation[0] += (degPerSec * delta) / 1000;
            if (rotation[0] >= 180) rotation[0] -= 360;
            planet.projection.rotate(rotation);
            lastTick = now;
          }
        });
      };
    }

    var canvas = document.getElementById("rotatingGlobe");
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio == 2) {
      canvas.width = 800;
      canvas.height = 800;
      canvas.getContext("2d").scale(2, 2);
    }

    planet.draw(canvas);
  }

  render() {
    return (
      <div className="panel__globe" ref="globe" id="globe__wrapper">
        <canvas id="rotatingGlobe" width="450px" height="450px" />
      </div>
    );
  }
}
