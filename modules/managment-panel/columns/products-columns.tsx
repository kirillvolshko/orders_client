import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  price: string;
  stock: number;
};

export const getProductColumns = (): ColumnDef<Product>[] => {
  return [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
  ];
};
