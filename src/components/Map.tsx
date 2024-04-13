"use client"; // This line might be a comment about the environment or usage requirement

// Import statements for necessary modules from React and OpenLayers
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Stroke, Fill, Style } from "ol/style";

// Functional component definition for the map
const MapComponent = () => {
  // Ref to hold reference to the map container
  const mapRef = useRef<HTMLDivElement>(null);

  // useEffect hook to initialize the map when component mounts
  useEffect(() => {
    // Check if mapRef has been initialized
    if (!mapRef.current) return;

    // Create a new map instance
    const map = new Map({
      target: mapRef.current,
      layers: [
        // Add a tile layer with OpenStreetMap as the source
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0], // Set initial center coordinates
        zoom: 2, // Set initial zoom level
      }),
    });

    // Create a vector source and layer for drawing features
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "red",
          }),
        }),
      }),
    });
    map.addLayer(vectorLayer);

    // Draw interaction for drawing points, lines, and polygons
    const draw = new Draw({
      source: vectorSource,
      type: "Point", // Change type to 'LineString' or 'Polygon' for lines and polygons respectively
    });
    map.addInteraction(draw);

    // Cleanup function to dispose the map when component unmounts
    return () => {
      map.dispose();
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Return the map container div
  return (
    <div
      ref={mapRef}
      className="map"
      style={{ width: "100%", height: "400px" }} // Set width and height styles
    ></div>
  );
};

// Export the MapComponent as the default export
export default MapComponent;
