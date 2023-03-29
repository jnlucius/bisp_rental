// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/layout";
import Router from "next/router";

const Draft = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [rooms, setRooms] = useState();
  const [floor, setFloor] = useState();
  const [furniture, setFurniture] = useState(false);
  const [appliances, setAppliances] = useState(false);
  const [total_area, setTotal_area] = useState();
  const [living_area, setLiving_area] = useState();
  const [price, setPrice] = useState();
  const [for_sale, setFor_sale] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    try {
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
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            type="text"
            value={city}
          />
          <input
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            type="text"
            value={district}
          />
          <input
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            type="text"
            value={street}
          />
          <input
            onChange={(e) => setRooms(e.target.value)}
            placeholder="Rooms"
            type="number"
            value={rooms}
          />
          <input
            onChange={(e) => setFloor(e.target.value)}
            placeholder="Floor"
            type="number"
            value={floor}
          />
          <label>
            Furniture:
            <input
              onChange={(e) => setFurniture(!furniture)}
              placeholder="Furniture"
              type="checkbox"
              value={furniture}
            />
          </label>
          <label>
            Appliances:
            <input
              onChange={(e) => setAppliances(!appliances)}
              placeholder="Appliances"
              type="checkbox"
              value={appliances}
            />
          </label>
          <input
            onChange={(e) => setTotal_area(e.target.value)}
            placeholder="Total area"
            type="number"
            value={total_area}
          />
          <input
            onChange={(e) => setLiving_area(e.target.value)}
            placeholder="Living area"
            type="number"
            value={living_area}
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            value={price}
          />
          <label>
            For sale:
            <input
              onChange={(e) => setFor_sale(!for_sale)}
              placeholder="For sale"
              type="checkbox"
              value={for_sale}
            />
          </label>
          <input disabled={!price || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
