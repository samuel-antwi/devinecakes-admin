import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const customer = await prisma.customers.update({
      where: { id: body.id },
      data: { ...body },
    });
    return customer;
  } catch (e) {}
});
