import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ text }) => {
  const ACCESS_TOKEN =
    "pk.eyJ1IjoibWFrc2hvdWsiLCJhIjoiY2xnd2I4MnY1MGE3cjNybG5yd3BqMGl2NCJ9.pbTzbUl_Ip_3YttJRb3_-A";
  return (
    <MapContainer
      center={[41.3115363894988, 69.27970801384232]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "20rem", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker
        position={[41.3115363894988, 69.27970801384232]}
        draggable={true}
        animate={true}
      >
        <Popup>{text}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
