"use client";

import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user_id } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user_id) {
      router.push("/auth");
    }
  }, [user_id, router]);

  return <>{children}</>;
};
