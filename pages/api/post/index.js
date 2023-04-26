import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
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
    publicUrl,
    location,
    phone,
  } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      city: city,
      district: district,
      street: street,
      location: location,
      phone: phone,
      rooms: parseInt(rooms, 10),
      floor: parseInt(floor, 10),
      furniture: furniture,
      appliances: appliances,
      total_area: parseFloat(total_area),
      living_area: parseFloat(living_area),
      price: parseFloat(price),
      for_sale: for_sale,
      image: publicUrl,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
