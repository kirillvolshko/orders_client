import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  stock: z.number(),
});
