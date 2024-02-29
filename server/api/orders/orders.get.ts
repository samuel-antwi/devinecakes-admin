import { prisma } from "@/utils/prisma";
import { get } from "lodash-es";

export default defineCachedEventHandler(async (event) => {
  const newOrder = getRouterParam(event, "newOrder");
  console.log("newOrder", newOrder);
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        deliveryDate: "asc",
      },
    });
    return orders;
  } catch (e) {
    console.error(e);
  }
});
