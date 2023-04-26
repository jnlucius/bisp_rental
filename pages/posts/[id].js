import Layout from "@/components/layout";
import { getAllPostIds, getPostData } from "@/lib/getPosts";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Link from "next/link";

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

async function publishPost(id) {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id) {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

export default function PostDetails(props) {
  const postData = props.postData;
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === postData.author?.email;
  let title = postData.title;
  if (!postData.published) {
    title = `${title} (Draft)`;
  }
  return (
    <Layout>
      <Row className="mt-5">
        <Col>
          <Image
            src={postData.image}
            width={500}
            height={400}
            className="w-100 h-100 rounded"
          ></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mt-5">{title}</h2>
          <p>By {postData?.author?.name || "Unknown author"}</p>
          <p className="mb-0">
            <span className="fw-bold">Price:</span> {postData.price}
          </p>
          <p className="mb-0">
            <span className="fw-bold">Address:</span> {postData.city}
            {", "}
            {postData.district}, {postData.street}
          </p>
          <p className="mb-0">
            <span className="fw-bold">Contact phone:</span> {postData.phone}
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
      {!postData.published && userHasValidSession && postBelongsToUser && (
        <button
          className="btn btn-primary me-2"
          onClick={() => publishPost(postData.id)}
        >
          Publish
        </button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <button
          className="btn btn-primary me-2"
          onClick={() => deletePost(postData.id)}
        >
          Delete
        </button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <Link className="btn btn-primary px-3" href={`/edit/${postData.id}`}>
          Edit
        </Link>
      )}
    </Layout>
  );
}
