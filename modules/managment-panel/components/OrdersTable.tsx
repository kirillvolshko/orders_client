"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { TableComponent } from "@/components/common/ui/TableComponent";
import { useUserId } from "@/hooks/useUserId";
import { useGetOrdersQuery } from "@/store/orders/ordersService";
import { getOrderColumns } from "../columns/orders-columns";

export const OrdersTable = () => {
  const userId = useUserId() || "";
  const { data, error, isLoading } = useGetOrdersQuery(userId, {});
  useErrorHandler(error);

  if (isLoading) return <Spinner />;
  return <TableComponent data={data ?? []} columns={getOrderColumns()} />;
};
