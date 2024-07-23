import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string({ message: "name should be a string" }),
  pincode: z.string({ message: "pincode should a string" }).length(6),
});
