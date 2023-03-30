import React, { useState } from "react";
import Layout from "@/components/layout";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";

export async function getServerSideProps({ params }) {
  const postData = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: {
      postData,
    },
  };
}

export default function Edit(props) {
  const postData = props.postData;
  const [title, setTitle] = useState(postData.title);
  const [city, setCity] = useState(postData.city);
  const [district, setDistrict] = useState(postData.district);
  const [street, setStreet] = useState(postData.street);
  const [rooms, setRooms] = useState(postData.rooms);
  const [floor, setFloor] = useState(postData.floor);
  const [furniture, setFurniture] = useState(postData.furniture);
  const [appliances, setAppliances] = useState(postData.appliances);
  const [total_area, setTotal_area] = useState(postData.total_area);
  const [living_area, setLiving_area] = useState(postData.living_area);
  const [price, setPrice] = useState(postData.price);
  const [for_sale, setFor_sale] = useState(postData.for_sale);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === postData.author?.email;

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
      await fetch(`/api/edit/${postData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };
  /*if (!postData.published) {
    title = `${title} (Draft)`;
  }*/
  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Editing post</h1>
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
              defaultChecked={furniture}
            />
          </label>
          <label>
            Appliances:
            <input
              onChange={(e) => setAppliances(!appliances)}
              placeholder="Appliances"
              type="checkbox"
              defaultChecked={appliances}
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
              defaultChecked={for_sale}
            />
          </label>
          <input type="submit" value="Edit" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
}
