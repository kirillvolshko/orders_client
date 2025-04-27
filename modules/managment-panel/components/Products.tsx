import { ActionButton } from "@/components/common/ui/ActionButton";
import { DialogWindow } from "@/components/common/ui/DialogWindow";
import { Plus } from "lucide-react";
import AddProductForm from "./forms/AddProductForm";
import { ProductsTabel } from "./ProductsTable";

export const Products = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-end">
        <DialogWindow
          triggerComponent={
            <ActionButton icon={<Plus />} title="Add product" />
          }
          content={<AddProductForm />}
        />
      </div>
      <ProductsTabel />
    </div>
  );
};
