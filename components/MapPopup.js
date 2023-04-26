import Container from "react-bootstrap/Container";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import util from "../styles/util.module.css";

export default function Post({ db }) {
  let data = db;
  return (
    <Container
      className={`text-black border border-2 rounded ${util.hover_change}`}
    >
      <Row className="h-auto py-0">
        <Col>
          <Row>
            <Col>
              <h3 className="mb-0 h5 fw-bold">{data.title}</h3>
              <p className="mt-0">
                {data.city}, {data.district}, {data.street}
              </p>
            </Col>
            <Col xs={3} className="text-start">
              <p className="mt-0 h6 text-start">
                <span className="fw-bold">Price:</span> ${data.price}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Floor:</span> {data.floor}
              </p>
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Rooms:</span> {data.rooms}
              </p>
            </Col>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Furnt.:</span>{" "}
                {data.furniture ? "Yes" : "No"}
              </p>
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Appls.:</span>{" "}
                {data.appliances ? "Yes" : "No"}
              </p>
            </Col>
            <Col xs="auto" className="mt-0 border-end border-2">
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Total area:</span> {data.total_area}
              </p>
              <p className="mb-0 mt-0 me-0">
                <span className="fw-bold">Living area:</span> {data.living_area}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
