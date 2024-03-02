import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const customers = await prisma.customers.findMany();
    return customers;
  } catch (e) {
    console.error(e);
  }
});
