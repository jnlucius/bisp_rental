import Container from "react-bootstrap/Container";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import util from "../styles/util.module.css";

/*const data = {
  title: "New apartment in the centre",
  city: "Tashkent",
  district: "Mirzo-Ulugbek",
  street: "Istiqlol",
  rooms: 3,
  floor: 4,
  furniture: true,
  appliances: true,
  total_area: 70,
  living_area: 64,
  price: 145000,
};*/

export default function Post({ db }) {
  let data = db;
  return (
    <Container className={`border border-2 rounded ${util.hover_change}`}>
      <Row className="h-auto py-0">
        <Col lg={2} sm={3} className="px-0">
          <Image
            src={data.image}
            width={500}
            height={400}
            className="w-100 h-100 rounded"
          ></Image>
        </Col>
        <Col>
          <Row>
            <Col>
              <h3 className="mb-0">{data.title}</h3>
              <p className="mt-0">
                {data.city}, {data.district}, {data.street}
              </p>
            </Col>
            <Col xs={3} className="text-start">
              <p className="mt-0 text-start">
                <span className="fw-bold">Price:</span> {data.price}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 me-0">
                <span className="fw-bold">Floor:</span> {data.floor}
              </p>
              <p className="mb-0 me-0">
                <span className="fw-bold">Rooms:</span> {data.rooms}
              </p>
            </Col>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 me-0">
                <span className="fw-bold">Furniture:</span>{" "}
                {data.furniture ? "Yes" : "No"}
              </p>
              <p className="mb-0 me-0">
                <span className="fw-bold">Appliances:</span>{" "}
                {data.appliances ? "Yes" : "No"}
              </p>
            </Col>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 me-0">
                <span className="fw-bold">Total area:</span> {data.total_area}
              </p>
              <p className="mb-0 me-0">
                <span className="fw-bold">Living area:</span> {data.living_area}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
