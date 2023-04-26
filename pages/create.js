// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/layout";
import Router from "next/router";
import { Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import { Marker, useMapEvents } from "react-leaflet";

const MapWrapper = () => {
  const [coordinates, setCoordinates] = useState([0, 0]);

  const MapWithNoSSR = dynamic(() => import("../components/MapCreate"), {
    ssr: false,
  });

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      },
    });

    return coordinates ? (
      <Marker position={coordinates} interactive={false} />
    ) : null;
  };

  return (
    <Layout>
      <h1>New Draft</h1>
      <h3>Enter the location</h3>
      <MapWithNoSSR pos={coordinates} marker={<Markers />} />
      <Draft coordinates={coordinates} />
    </Layout>
  );
};

const Draft = ({ coordinates }) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Tashkent");
  const [district, setDistrict] = useState("Bektemir");
  const [street, setStreet] = useState("");
  const [rooms, setRooms] = useState();
  const [floor, setFloor] = useState();
  const [furniture, setFurniture] = useState(false);
  const [appliances, setAppliances] = useState(false);
  const [total_area, setTotal_area] = useState();
  const [living_area, setLiving_area] = useState();
  const [price, setPrice] = useState();
  const [for_sale, setFor_sale] = useState(false);
  const [file, setFile] = useState([]);
  const [phone, setPhone] = useState("");

  const submitData = async (e) => {
    e.preventDefault();
    const fileName = `${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("bisp_images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const filepath = data.path;

    const res = supabase.storage
      .from("bisp_images")
      .getPublicUrl(`${filepath}`);

    const publicUrl = res.data.publicUrl;

    try {
      const location = `${coordinates[0]}/${coordinates[1]}`;
      const body = {
        title,
        city,
        district,
        street,
        rooms,
        floor,
        furniture,
        appliances,
        total_area,
        living_area,
        price,
        for_sale,
        publicUrl,
        location,
        phone,
      };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        //style={{ position: "fixed", top: "32em", overflow: "scroll" }}
        onSubmit={submitData}
      >
        <div className="my-3">
          <label className="form-label">Enter the title:</label>
          <input
            autoFocus
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </div>

        <Row>
          <Col>
            <div className="mb-3">
              <label for="selectCity" className="form-label">
                City:
              </label>
              <select
                id="selectCity"
                className="form-select "
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              >
                <option value={""} disabled selected>
                  Select the city
                </option>
                <option value={"Tashkent"}>Tashkent</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label for="selectedDist" className="form-label">
                District:
              </label>
              <select
                id="selectedDist"
                className="form-select"
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value={""} disabled selected>
                  Select the district
                </option>
                <option value={"Bektemir"}>Bektemir</option>
                <option value={"Chilonzor"}>Chilonzor</option>
                <option value={"Yashnobod"}>Yashnobod</option>
                <option value={"Mirobod"}>Mirobod</option>
                <option value={"Mirzo-Ulugbek"}>Mirzo-Ulugbek</option>
                <option value={"Sergely"}>Sergely</option>
                <option value={"Shayxontoxur"}>Shayxontoxur</option>
                <option value={"Olmazor"}>Olmazor</option>
                <option value={"Uchtepa"}>Uchtepa</option>
                <option value={"Yakkasoroy"}>Yakkasoroy</option>
                <option value={"Yunusobod"}>Yunusobod</option>
                <option value={"Yangihayot"}>Yangihayot</option>
              </select>
            </div>
          </Col>
        </Row>

        <div className="mb-3">
          <label className="form-label">Enter the street:</label>
          <input
            className="form-control"
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            type="text"
            value={street}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter the contact phone:</label>
          <input
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            type="text"
            value={phone}
          />
        </div>
        <Row>
          <Col>
            <div className="mb-3">
              <label for="inputRooms" className="form-label">
                Number of Rooms:
              </label>
              <input
                className="form-control"
                onChange={(e) => setRooms(e.target.value)}
                placeholder="Rooms"
                type="number"
                value={rooms}
                id="inputRooms"
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label for="inputFloor" className="form-label">
                Floor Number:
              </label>
              <input
                className="form-control "
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Floor"
                type="number"
                value={floor}
                id="inputFloor"
              />
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <div className="form-check">
              <input
                onChange={(e) => setFurniture(!furniture)}
                className="form-check-input"
                type="checkbox"
                defaultChecked={furniture}
                id="furnCheck"
              />
              <label class="form-check-label" for="furnCheck">
                Furniture
              </label>
            </div>
          </Col>
          <Col>
            <div className="form-check">
              <input
                onChange={(e) => setAppliances(!appliances)}
                className="form-check-input"
                placeholder="Appliances"
                type="checkbox"
                defaultChecked={appliances}
                id="aplCheck"
              />
              <label class="form-check-label" for="aplCheck">
                Appliances
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mb-3">
              <label className="form-label">Enter the total area:</label>
              <input
                className="form-control"
                onChange={(e) => setTotal_area(e.target.value)}
                placeholder="Total area"
                type="number"
                value={total_area}
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label className="form-label">Enter the living area:</label>
              <input
                className="form-control"
                onChange={(e) => setLiving_area(e.target.value)}
                placeholder="Living area"
                type="number"
                value={living_area}
              />
            </div>
          </Col>
        </Row>
        <div className="mb-3">
          <label className="form-label">Enter the price:</label>
          <input
            className="form-control w-25"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            value={price}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            onChange={(e) => setFor_sale(!for_sale)}
            placeholder="For sale"
            type="checkbox"
            defaultChecked={for_sale}
            value={for_sale}
            id="saleProp"
          />
          <label class="form-check-label" for="saleProp">
            Want to sale the property?
          </label>
        </div>

        <div className="mb-3">
          <label for="PropertyImage" className="form-label">
            Property image
          </label>
          <input
            className="form-control"
            type="file"
            id="PropertyImage"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <input
          className="btn btn-primary"
          disabled={!price || !title}
          type="submit"
          value="Create"
        />
        <a className="ms-3" href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </div>
  );
};

export default MapWrapper;
