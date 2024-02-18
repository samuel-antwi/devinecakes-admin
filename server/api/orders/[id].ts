import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: id,
      },
      include: {
        customer: true,
      },
    });
    return order;
  } catch (e) {}
});
