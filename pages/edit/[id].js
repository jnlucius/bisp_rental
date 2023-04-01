import React, { useState } from "react";
import Layout from "@/components/layout";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { Row, Col } from "react-bootstrap";

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

          <input className="btn btn-primary" type="submit" value="Edit" />
          <a className="ms-2" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
}
