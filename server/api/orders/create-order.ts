import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const orders = await prisma.orders.create({
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
    return orders;
  } catch (e) {
    console.error(e);
  }
});
