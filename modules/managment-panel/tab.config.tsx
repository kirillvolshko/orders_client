"use client";

import { ListOrdered, ShoppingCart } from "lucide-react";
import { Products } from "./components/Products";
import { Orders } from "./components/Orders";

export const TabsConfig = [
  {
    title: "Orders",
    icon: ListOrdered,
    content: <Orders />,
  },
  {
    title: "Products",
    icon: ShoppingCart,
    content: <Products />,
  },
];
