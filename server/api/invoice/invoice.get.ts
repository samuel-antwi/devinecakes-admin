import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log(query);
  try {
    const invoice = await prisma.orders.findMany({
      where: {
        OR: [{ paymentStatus: "paid" }, { paymentStatus: "part paid" }],
      },
      orderBy: {
        deliveryDate: "asc",
      },
      select: {
        id: true,
        orderDate: true,
        paymentReference: true,
        customer: true,
        paymentStatus: true,
        receivedAmount: true,
      },
    });
    return invoice;
  } catch (e) {
    console.error(e);
  }
});
