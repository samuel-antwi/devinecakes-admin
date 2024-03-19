import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body || !body.id) {
      throw new Error("Invalid request data");
    }
    const order = await prisma.orders.updateMany({
      where: {
        id: body.id,
      },
      data: {
        orderStatus: body.orderStatus,
        paymentStatus: body.paymentStatus,
        receivedAmount: 0,
        balance: 0,
        total: 0,
      },
    });
    return order;
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
});
