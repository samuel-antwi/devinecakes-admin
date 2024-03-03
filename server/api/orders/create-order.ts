import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const orders = await prisma.orders.create({
      data: {
        paymentReference: body.paymentReference,
        paymentStatus: body.paymentStatus.toLowerCase(),
        orderStatus: body.orderStatus?.toLowerCase(),
        cakeType: body.cakeType.toLowerCase(),
        description: body.description,
        deliveryDate: body.deliveryDate,
        deliveryMethod: body.deliveryMethod.toLowerCase(),
        quantity: Number(body.quantity),
        createdBy: body.createdBy,
        orderNumber: body.orderNumber,
        customerId: body.customerId,
        amount: body.amount,
        price: body.price,
        balance: body.balance,
        receivedAmount: body.receivedAmount,
      },
    });
    return orders;
  } catch (e) {
    console.error(e);
  }
});
