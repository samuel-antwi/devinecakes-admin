import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Adjust date handling as needed

  const overdueOrders = await prisma.orders.findMany({
    where: {
      deliveryDate: {
        lt: today,
      },
      orderStatus: {
        notIn: ['delivered', 'overdue', 'cancelled'],
      },
    },
  });

  const updates = overdueOrders.map(order =>
    prisma.orders.update({
      where: { id: order.id },
      data: { orderStatus: 'overdue' },
    })
  );

  await Promise.all(updates);

  return {
    updated: updates.length,
  };
});
