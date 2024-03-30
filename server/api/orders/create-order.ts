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
        total: body.price * body.quantity,
      },
    });

    return {
      statusCode: 200,
      body: orders,
    };
  } catch (error) {
    console.error(error);

    let errorMessage = "An error occurred while creating the order.";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      // Customize the status code based on the specific error type if needed
      // For example, if it's a validation error, you can set statusCode to 400
    }

    return {
      statusCode,
      body: {
        error: errorMessage,
      },
    };
  }
});