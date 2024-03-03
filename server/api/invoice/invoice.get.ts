import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const { filter_by, query } = getQuery(event);
  console.log("Filter By", filter_by, "Query", query);

  let whereCondition = {
    OR: [{ paymentStatus: "paid" }, { paymentStatus: "partially paid" }],
  };

  if (query) {
    switch (filter_by) {
      case "customer":
        const queryParts = query.split(" ").filter(Boolean); // Split the query by spaces and remove any empty strings
        const nameConditions = queryParts.map((part) => ({
          OR: [
            {
              customer: { firstName: { contains: part, mode: "insensitive" } },
            },
            { customer: { surname: { contains: part, mode: "insensitive" } } },
          ],
        }));
        whereCondition = {
          AND: [whereCondition, ...nameConditions],
        };
        break;
      case "paymentReference":
        whereCondition = {
          AND: [
            whereCondition,
            { paymentReference: { contains: query, mode: "insensitive" } },
          ],
        };
        break;
      case "paymentStatus":
        // This assumes you want to match the exact payment status
        whereCondition = {
          AND: [
            whereCondition,
            { paymentStatus: { contains: query, mode: "insensitive" } }, // Consider adjusting if you need case-insensitive matching or partial matches
          ],
        };
        break;
      // Add more cases here if you need to filter by other fields.
      default:
        // No additional filtering based on `filter_by` if it doesn't match known criteria
        break;
    }
  }

  try {
    const invoice = await prisma.orders.findMany({
      where: whereCondition,
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
