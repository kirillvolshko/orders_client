import { ColumnDef } from "@tanstack/react-table";
import { dateTransaltion } from "@/utils/dateTranslation";

export interface IOrderResponse {
  id: string;
  quantity: number;
  totalPrice: string;
  createdAt: string;
  user: {
    name: string;
  };
  product: {
    name: string;
  };
}

export const getOrderColumns = (): ColumnDef<IOrderResponse>[] => {
  return [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "user.name",
      header: "User Name",
    },
    {
      accessorKey: "product.name",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => `$${row.original.totalPrice}`,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => dateTransaltion(row.original.createdAt),
    },
  ];
};
