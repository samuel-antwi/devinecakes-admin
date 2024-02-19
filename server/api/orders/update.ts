import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body || !body.id) {
      throw new Error("Invalid request data");
    }
    const order = await prisma.orders.update({
      where: { id: body.id },
      data: {
        paymentReference: body.paymentReference,
        paymentStatus: body.paymentStatus,
        orderStatus: body.orderStatus,
        cakeType: body.cakeType,
        description: body.description,
        deliveryDate: body.deliveryDate,
        deliveryMethod: body.deliveryMethod,
        quantity: body.quantity,
        createdBy: body.createdBy,
        orderNumber: body.orderNumber,
        customerId: body.customerId,
        amount: body.amount,
      },
    });
    return order;
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
});