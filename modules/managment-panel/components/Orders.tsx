import { ActionButton } from "@/components/common/ui/ActionButton";
import { DialogWindow } from "@/components/common/ui/DialogWindow";
import { Plus } from "lucide-react";
import AddOrderForm from "./forms/AddOrderForm";
import { OrdersTable } from "./OrdersTable";

export const Orders = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-end">
        <DialogWindow
          triggerComponent={<ActionButton icon={<Plus />} title="Add order" />}
          content={<AddOrderForm />}
        />
      </div>
      <OrdersTable />
    </div>
  );
};
