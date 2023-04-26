import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import MapPopup from "../components/MapPopup";
import Link from "next/link";

const Map = ({ data }) => {
  const ACCESS_TOKEN =
    "pk.eyJ1IjoibWFrc2hvdWsiLCJhIjoiY2xnd2I4MnY1MGE3cjNybG5yd3BqMGl2NCJ9.pbTzbUl_Ip_3YttJRb3_-A";
  return (
    <MapContainer
      center={[41.3115363894988, 69.27970801384232]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: "20rem", width: "100%" }}
    >
      <TileLayer
        url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {data.map((post) => (
        <Marker
          key={post.id}
          position={[post.location.split("/")[0], post.location.split("/")[1]]}
          draggable={true}
          animate={true}
        >
          <Popup>
            <Link href={`/posts/${post.id}`}>
              <MapPopup db={post} />
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

//https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}
