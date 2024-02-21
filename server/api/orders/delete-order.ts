import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body || !body.id) {
      throw new Error("Invalid request data");
    }
    const order = await prisma.orders.delete({
      where: { id: body.id },
    });
    return order;
  } catch (e: any) {
    return { error: e.message };
  }
});
