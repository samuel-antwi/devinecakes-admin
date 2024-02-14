import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const customer = await prisma.customers.delete({
      where: { id: body.id },
    });
    return customer;
  } catch (e) {}
});
