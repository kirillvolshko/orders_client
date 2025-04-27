import { z } from "zod";

export const CreateOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
