import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { CreateProductSchema } from "../../schema/product";
import { useCreateProductsMutation } from "@/store/products/productsService";

type FormValues = z.infer<typeof CreateProductSchema>;
const AddProductForm = ({
  onClose,
}: {
  onClose?: (value: boolean) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { name: "", price: "", stock: undefined },
  });
  const [create, { error }] = useCreateProductsMutation();
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    const { name, price, stock } = data;
    await create({
      name,
      price,
      stock,
    }).unwrap();
    if (onClose) onClose(true);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-5"
        >
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter product name"
          />
          <InputField
            control={form.control}
            name="price"
            label="Price"
            placeholder="Enter price product"
          />
          <InputField
            control={form.control}
            name="stock"
            label="Stock"
            type="number"
            placeholder="Enter product stock"
          />

          <Button type="submit">Add product</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
