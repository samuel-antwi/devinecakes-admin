import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  const { filter_by, query } = getQuery(event) as {
    filter_by: string;
    query: string;
  };

  console.log("Filter by:", filter_by);
  console.log("Query:", query);

  let whereCondition = {};

  // Check if the query param exists and is related to a date filter
  if ((filter_by === "date" || filter_by === "deliveryDate") && query) {
    // Remove quotes that might be surrounding the query parameter
    const cleanedQuery = query.replace(/^"|"$/g, "");

    try {
      const dateQuery = new Date(cleanedQuery);
      if (isNaN(dateQuery.getTime())) {
        throw new Error("Provided Date object is invalid.");
      }
      // Dynamically set the filter property based on filter_by
      const dateFieldName = filter_by === "date" ? "orderDate" : "deliveryDate";

      whereCondition = {
        [dateFieldName]: {
          gte: dateQuery,
          lt: new Date(dateQuery.getTime() + 24 * 60 * 60 * 1000), // Adds one day in milliseconds
        },
      };
    } catch (error) {
      return { error: "Invalid date format" };
    }
  }
  try {
    const orders = await prisma.orders.findMany({
      where: whereCondition,
      orderBy: {
        orderDate: "desc",
      },
    });
    return orders;
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
});
