import { prisma } from "@/utils/prisma";

export default defineCachedEventHandler(async (event) => {
  try {
    const orders = await prisma.orders.findMany();
    return orders;
  } catch (e) {
    console.error(e);
  }
});
