import { z } from "zod";

export const deliveryPersionSchema = z.object({
  name: z.string({ message: "name should be string" }),
  phone: z
    .string({ message: "phone number should be string" })
    .length(13, "Delivery persion should be 13 character long"),
  warehouse_id: z.number({ message: "warehouse id should be a number" }),
});
