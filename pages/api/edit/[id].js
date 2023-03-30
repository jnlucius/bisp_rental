import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  const {
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
  } = req.body;
  console.log(title);
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      published: false,
      title: title,
      city: city,
      district: district,
      street: street,
      rooms: parseInt(rooms, 10),
      floor: parseInt(floor, 10),
      furniture: furniture,
      appliances: appliances,
      total_area: parseFloat(total_area),
      living_area: parseFloat(living_area),
      price: parseFloat(price),
      for_sale: for_sale,
    },
  });
  res.json(post);
}
