"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserId } from "@/hooks/useUserId";
import { useGetProfileQuery } from "@/store/user/userService";

export const ProfileUser = () => {
  const userId = useUserId() || "";
  const { data, isLoading, error } = useGetProfileQuery(userId, {
    skip: !userId,
  });

  useErrorHandler(error);
  if (isLoading) return <Spinner />;
  return (
    <div className="bg-neutral-300 rounded-md p-[30px] flex flex-col gap-5">
      <p className="font-semibold">Name: {data?.name}</p>
      <p className="font-semibold">Email: {data?.email}</p>
      <p className="font-semibold">Balance: {data?.balance}</p>
    </div>
  );
};
