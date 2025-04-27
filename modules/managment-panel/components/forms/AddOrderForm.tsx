import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";

import { useCreateOrderMutation } from "@/store/orders/ordersService";
import { CreateOrderSchema } from "../../schema/order";
import { useUserId } from "@/hooks/useUserId";
import { useGetProductsQuery } from "@/store/products/productsService";
import SelectField from "@/components/common/fields/SelectField";
import { useGetProfileQuery } from "@/store/user/userService";

type FormValues = z.infer<typeof CreateOrderSchema>;

const AddOrderForm = ({ onClose }: { onClose?: (value: boolean) => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: { productId: "", quantity: undefined },
  });

  const userId = useUserId() || "";
  const [create, { error }] = useCreateOrderMutation();
  const { refetch: refetchProfile } = useGetProfileQuery(userId);
  const { data: products, refetch: refetchProducts } = useGetProductsQuery({});
  useErrorHandler(error);

  const handleOnSubmit = async (data: FormValues) => {
    const { productId, quantity } = data;

    const selectedProduct = products?.find(
      (product) => product.id === productId
    );

    if (!selectedProduct) {
      throw new Error("Product not found");
    }

    const unitPrice = parseFloat(selectedProduct.price);
    const totalPrice = unitPrice * (quantity ?? 0);

    await create({
      userId,
      productId,
      quantity,
      totalPrice,
    }).unwrap();
    await refetchProfile();
    await refetchProducts();
    if (onClose) onClose(true);
  };

  const productOptions =
    products?.map((product) => ({
      label: product.name,
      value: product.id,
    })) ?? [];

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-5"
        >
          <SelectField
            control={form.control}
            name="productId"
            label="Product"
            placeholder="Select product name"
            options={productOptions}
          />
          <InputField
            control={form.control}
            name="quantity"
            label="Quantity"
            type="number"
            placeholder="Enter product quantity"
          />
          <Button type="submit">Create order</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddOrderForm;
