"use client"; // Indicates that this code is intended for client-side execution

// Import statements for necessary modules from React and OpenLayers
import { useState, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer } from 'ol/layer.js';

// Functional component definition for the demo map
const Demo = () => {
  // State variables to hold the map and draw interaction instances
  const [map, setMap] = useState<Map | null>(null);
  const [draw, setDraw] = useState<Draw | null>(null);

  // useEffect hook to initialize the map when component mounts
  useEffect(() => {
    // Create a new map instance
    const mapInstance = new Map({
      target: "map", // DOM element ID where the map will be rendered
      layers: [
        // Add a tile layer with OpenStreetMap as the source
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-110, 46]), // Set initial center coordinates
        zoom: 6, // Set initial zoom level
      }),
    });

    // Set the map instance to state
    setMap(mapInstance);

    // Create a draw interaction for drawing LineStrings
    const drawInteraction = new Draw({
      source: new VectorSource(), // Create a vector source for drawing features
      type: "LineString", // Set the type of geometry to be drawn
    });

    // Set the draw interaction to state
    setDraw(drawInteraction);

    // Cleanup function to dispose the map instance when the component unmounts
    return () => {
      mapInstance.dispose();
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // useEffect hook to add the draw interaction to the map when map and draw instances are available
  useEffect(() => {
    if (map && draw) {
      map.addInteraction(draw);
    }
  }, [map, draw]); // Dependencies: map and draw instances

  // Return the map container div
  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

// Export the Demo component as the default export
export default Demo;
