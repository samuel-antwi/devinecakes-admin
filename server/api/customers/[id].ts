import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const customer = await prisma.customers.findUnique({
      where: {
        id: id,
      },
      include: {
        orders: true,
      },
    });
    return customer;
  } catch (e) {}
});
