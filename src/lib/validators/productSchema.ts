import { z } from "zod";

export const productSchema = z.object({
  name:z.string({message:"Product name should ba a string"}),
  image: z.instanceof(File, {message : "Product image should be a image"}),
  description : z.string({message: "product  description should be a string"}),
  price: z.number({message: "product price should be a number"}),
})