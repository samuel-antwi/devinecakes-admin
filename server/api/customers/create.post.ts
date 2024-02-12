import { prisma } from "@/utils/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const customers = await prisma.customers.create({
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
    return customers;
  } catch (e) {
    console.error(e);
  }
});
