"use client";
import { useState, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import TileLayer from "ol/layer/Tile";

const Demo = () => {
  const [map, setMap] = useState<Map | null>(null);
  const [draw, setDraw] = useState<Draw | null>(null);

  useEffect(() => {
    const mapInstance = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-110, 46]),
        zoom: 6,
      }),
    });

    setMap(mapInstance);

    const drawInteraction = new Draw({
      source: new VectorSource(),
      type: "LineString",
    });

    setDraw(drawInteraction);

    return () => {
      mapInstance.dispose(); // Dispose the map instance when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (map && draw) {
      map.addInteraction(draw);
    }
  }, [map, draw]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default Demo;
