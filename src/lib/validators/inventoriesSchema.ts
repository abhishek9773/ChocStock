import { z } from "zod";
import { productSchema } from "./productSchema";

export const inventoriesSchema = z.object({
  sku: z.string({ message: "sku should be a string" }).length(8),
  warehouse_id: z.number({ message: "warehouse_id must be a number" }),
  product_id: z.number({ message: "product_id should be a number" }),
});
