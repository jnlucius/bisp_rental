import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "@/components/layout";
import Post from "../components/post";
import useSWR from "swr";
import { getPosts } from "../lib/getPosts";
import Link from "next/link";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

const inter = Inter({ subsets: ["latin"] });

//let prisma = new PrismaClient();
export async function getStaticProps() {
  //const postData = getPosts();
  const postData = await prisma.post.findMany({
    where: {
      published: true,
    },
  });
  return {
    props: { postData },
    revalidate: 10,
  };
}

export default function Home({ postData }) {
  /*const [query, setQuery] = useState("");
  const [furniture, setFurniture] = useState(false);
  const [appliances, setAppliances] = useState(false);

  const posts = postData.posts;

  const searchFilter = (array) => {
    return array.filter((el) => el.title.toLowerCase().includes(query));
  };

  const furnitureFilter = (array) => {
    return furniture ? array.filter((post) => post.furniture) : array;
  };

  const appliancesFilter = (array) => {
    return appliances ? array.filter((post) => post.appliances) : array;
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFurniture = () => {
    setFurniture(!furniture);
  };

  const handleAppliances = () => {
    setAppliances(!appliances);
  };

  const filteredPosts = appliancesFilter(furnitureFilter(searchFilter(posts)));*/

  return (
    <Layout home>
      <Head>
        <title>Rentals</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<div className="w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0">
        <input onChange={handleChange} type="text" placeholder="Search..." />
      </div>
      <div>
        <label>
          <span className="fw-bold me-1">Furniture:</span>{" "}
        </label>
        <input type="checkbox" value={furniture} onChange={handleFurniture} />
      </div>
      <div>
        <label>
          <span className="fw-bold me-1">Appliances:</span>{" "}
        </label>
        <input type="checkbox" value={appliances} onChange={handleAppliances} />
  </div>*/}
      <h3>Recent posts:</h3>
      {postData.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Post db={post} />
        </Link>
      ))}
    </Layout>
  );
}
