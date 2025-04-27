"use client";
import { Spinner } from "@/components/common/ui/Spinner";

import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useGetProductsQuery } from "@/store/products/productsService";
import { TableComponent } from "@/components/common/ui/TableComponent";
import { getProductColumns } from "../columns/products-columns";

export const ProductsTabel = () => {
  const { data, error, isLoading } = useGetProductsQuery({});
  useErrorHandler(error);

  if (isLoading) return <Spinner />;
  return <TableComponent data={data ?? []} columns={getProductColumns()} />;
};
