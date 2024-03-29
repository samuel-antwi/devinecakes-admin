import type { OrderType } from "./order";

export type CustomerType = {
  salutation?: string;
  firstName: string;
  surname: string;
  mobileNumber: string;
  town: string;
  deliveryAddress?: string;
  digitalAddress?: string;
  streetName?: string;
  id?: string;
  label?: string;
  customer?: any;
  orders?: OrderType[];
};
