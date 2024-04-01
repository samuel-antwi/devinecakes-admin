import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        orderDate: "desc",
      },
    });
    return orders;
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
});