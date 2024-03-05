import { prisma } from "@/utils/prisma";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { filter_by, query } = getQuery(event) as {
    filter_by: string;
    query: string;
  };

  let whereCondition = {};

  // Check if the query param exists and is related to a date filter
  if (filter_by === "date" && query) {
    // Remove quotes that might be surrounding the query parameter
    const cleanedQuery = query.replace(/^"|"$/g, "");

    try {
      const dateQuery = new Date(cleanedQuery);
      if (isNaN(dateQuery.getTime())) {
        throw new Error("Provided Date object is invalid.");
      }
      // Assuming you want to filter orders based on the orderDate
      whereCondition = {
        orderDate: {
          gte: dateQuery,
          lt: new Date(dateQuery.getTime() + 24 * 60 * 60 * 1000), // Adds one day in milliseconds
        },
      };
    } catch (error) {
      console.error("Date parsing error:", error);
      return { error: "Invalid date format" };
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
        balance: true,
      },
    });
    return invoice;
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
});
