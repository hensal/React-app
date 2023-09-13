map.js

BOTH.svg

<?xml version="1.0"?><svg width="2481" height="2073" xmlns="http://www.w3.org/2000/svg">
 <title>map marker</title>
 <g>
  <title>Layer 1</title>
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#ff7f00" stroke="#000000" stroke-width="37" stroke-miterlimit="10" d="m1075.939941,1959.629028c-38.765869,-190.301025 -107.115906,-348.665039 -189.902954,-495.439941c-61.406982,-108.87207 -132.543945,-209.363037 -198.364014,-314.937988c-21.971985,-35.244019 -40.93396,-72.477051 -62.046997,-109.054077c-42.215942,-73.136963 -76.44397,-157.934998 -74.268982,-267.932007c2.125,-107.472961 33.208008,-193.68396 78.029968,-264.171997c73.719055,-115.934967 197.20105,-210.988983 362.884033,-235.968994c135.466064,-20.423981 262.475098,14.082031 352.542969,66.748016c73.600098,43.037994 130.596069,100.527008 173.920044,168.279999c45.219971,70.716003 76.359009,154.26001 78.970947,263.231995c1.337036,55.830017 -7.804932,107.531982 -20.68396,150.417969c-13.033936,43.409058 -33.995972,79.695007 -52.645996,118.454102c-36.406006,75.658936 -82.04895,144.981934 -127.85498,214.345947c-136.437012,206.605957 -264.496094,417.309937 -320.580078,706.026978z" id="svg_2"/>
  <circle fill-rule="evenodd" clip-rule="evenodd" cx="1080.546" cy="740.047" r="183.332031" id="svg_4" fill="black"/>
 </g>
</svg>

Map.js



import React, { useEffect, useState } from "react";
import L, { Layer } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  LayerGroup,
  LayersControl,
  Popup,
} from "react-leaflet";
import { useAtom } from "jotai";
import socketIOClient from "socket.io-client";
import TSFDICON from "./Icons/TSFD.svg";
import TAISAICON from "./Icons/TAISA.svg";
import BOTHICON from "./Icons/BOTH.svg";

import { stationList, selectedStationAtom, stationData } from "../store";
import "./Map.css";

const SOCKEENDPOINT = process.env.REACT_APP_BACKEND_URL;

const myIconTSFD = new L.Icon({
  iconUrl: TSFDICON,
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});

const myIconTAISA = new L.Icon({
  iconUrl: TAISAICON,
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});

const myIconBOTH = new L.Icon({
  iconUrl: BOTHICON,
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});

function FlyMapTo(props) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(props.center, map.getZoom()); //props.zoom);
  });
  return null;
}

function Legend() {
  const map = useMap();
  const position = "bottomleft";

 // Define the desired height and width (in pixels)
 const legendHeight = "200px";
 const legendWidth = "190px";

 // Apply the height and width as inline styles
 const legendStyle = {
   height: legendHeight,
   width: legendWidth,
 };

  return (
    <div
      className={`leaflet-control leaflet-control-custom leaflet-${position}`}
      style={legendStyle} // Apply the styles here
      >
      <div className="leaflet-control-layers leaflet-control-layers-expanded">
        <div className="leaflet-control-layers-body">
          <div>
           
            <img src={TSFDICON} className="icon" />
            <span style={{ color: "TAGF" }}>簡易流向計</span>
            <br></br>
            <img src={BOTHICON} className="icon icon-both"/>
            <span style={{ color: "TAGF" }}>簡易開度計・簡易流向計</span>
            <br></br>
            <img src={TAISAICON} className="icon" />
            <span style={{ color: "TAGF" }}>河床堆積量計</span>
            <br></br>            
          </div>
        </div>
      </div>
    </div>
  );
}

function Map() {
  const [Data] = useAtom(stationData);
  const [stations] = useAtom(stationList);
  const [selectedStation, setSelectedStation] = useAtom(selectedStationAtom);
  const [, getStationData] = useAtom(stationData);
  const [lat_long, setlat_long] = useState([
    32.71776829575492, 130.64599818998556,
  ]);

  const newSelstation = stations.filter((selstation) => {
    return selstation.device_id === selectedStation;
  });

  useEffect(() => {
    getStationData(selectedStation);
    const socket = socketIOClient(SOCKEENDPOINT);
    socket.connect();
    socket.on(`${selectedStation}`, (data) => {
      console.log("Realtime Data", data);
      getStationData(selectedStation);
    });
    if (newSelstation.length) {
      setlat_long(newSelstation[0].lat_long.split(","));
    }
    return () => socket.disconnect();    
  }, [selectedStation]);

  return (
    <>     
      {stations && (
        <MapContainer
          center={lat_long}
          zoom={10}
          maxZoom={14}
          minZoom={5}
          scrollWheelZoom={true}         
        >
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
          />
          <TileLayer
            url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
            attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
          />         
          {stations.map((station, idx) => (
            <Marker
              key={idx}
              eventHandlers={{
                click: (e) => {
                  setSelectedStation(station.device_id);
                  setlat_long(station.lat_long.split(","));
                },
              }}
              icon={
                station.sensor_model == "簡易流向計"
                  ? myIconTSFD
                  : station.sensor_model == "簡易開度計・簡易流向計"
                  ? myIconBOTH
                  : myIconTAISA               
              }             
              position={station.lat_long.split(",")}
              className="marker"
            >
              <Tooltip>
                <h2>{station.deployed_location}</h2>
              </Tooltip>
            </Marker>
          ))}
          <Legend />
          <FlyMapTo center={lat_long} />         
        </MapContainer>
      )}     
    </>
  );
}

export default Map;



Map.css

.leaflet-container {
  width: 100%;
  height: 100%;
  z-index: 0;
  /* min-height: 700px; */
}

.marker {
  background-color: red;
}

.leaflet-bottomleft{
  margin-top: 85px !important;
}

.icon{
  width: 30px;
  margin: 1px;
}

.icon-both{
  width: 14px;
  margin: 1px 8px;
}

.selected-marker {
  /* Your highlighted marker styles */
  /* For example, you can change the marker's color, size, or add a border */
  border: 2px solid pink;
}
