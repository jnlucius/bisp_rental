import Layout from "@/components/layout";
import { getAllPostIds, getPostData } from "@/lib/getPosts";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import prisma from "../../lib/prisma";

/*export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}*/

export async function getServerSideProps({ params }) {
  //const postData = getPostData(parseInt(params.id));
  const postData = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
  });
  return {
    props: {
      postData,
    },
  };
}

export default function PostDetails({ postData }) {
  return (
    <Layout>
      <Row className="mt-5">
        <Col>
          <Image
            src="/images/1.jpg"
            width={500}
            height={400}
            className="w-100 h-100 rounded"
          ></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-5">{postData.title}</h2>
          <p className="mb-0">
            <span className="fw-bold">Price:</span> {postData.price}
          </p>
          <p className="mb-0">
            <span className="fw-bold">Address:</span> {postData.city}
            {", "}
            {postData.district}, {postData.street}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs="auto" className="mt-0 border-end">
          <p className="mb-0 me-0">
            <span className="fw-bold">Floor:</span> {postData.floor}
          </p>
          <p className="mb-0 me-0">
            <span className="fw-bold">Rooms:</span> {postData.rooms}
          </p>
        </Col>
        <Col xs="auto" className="mt-0 border-end">
          <p className="mb-0 me-0">
            <span className="fw-bold">Furniture:</span>{" "}
            {postData.furniture ? "Yes" : "No"}
          </p>
          <p className="mb-0 me-0">
            <span className="fw-bold">Appliances:</span>{" "}
            {postData.appliances ? "Yes" : "No"}
          </p>
        </Col>
        <Col xs="auto" className="mt-0 border-end">
          <p className="mb-0 me-0">
            <span className="fw-bold">Total area:</span> {postData.total_area}
          </p>
          <p className="mb-0 me-0">
            <span className="fw-bold">Living area:</span> {postData.living_area}
          </p>
        </Col>
      </Row>

      <br />
    </Layout>
  );
}
