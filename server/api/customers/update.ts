import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body || !body.id) {
      throw new Error("Invalid request data");
    }
    const customer = await prisma.customers.update({
      where: { id: body.id },
      data: {
        firstName: body.firstName,
        surname: body.surname,
        salutation: body.salutation,
        town: body.town,
        digitalAddress: body.digitalAddress,
        mobileNumber: body.mobileNumber,
        streetName: body.streetName,
      },
    });
    return customer;
  } catch (e) {
    console.log(e);
    return { error: e.message };
  }
});
