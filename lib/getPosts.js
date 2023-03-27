/*import fs from "fs";
import path from "path";

const jsonDirectory = path.join(process.cwd(), "json");

export function getPosts() {
  const filePath = path.join(jsonDirectory, "data.json");
  const jsonData = fs.readFileSync(filePath);
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export function getAllPostIds() {
  const postData = getPosts();
  return postData.posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export function getPostData(id) {
  const postData = getPosts();
  let result = postData.posts.filter((post) => post.id == id);
  return {
    ...result[0],
  };
}
*/
