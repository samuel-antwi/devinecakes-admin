import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        deliveryDate: "asc",
      },
    });
    return orders;
  } catch (e) {
    console.error(e);
  }
});
