import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body || !body.id) {
      throw new Error("Invalid request data");
    }
    const order = await prisma.orders.update({
      where: {
        id: body.id,
      },
      data: {
        orderStatus: "cancelled",
      },
    });
    return order;
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
});
