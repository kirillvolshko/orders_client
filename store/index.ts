"use client";
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { authService } from "./auth/authService";
import { userService } from "./user/userService";
import { ordersService } from "./orders/ordersService";
import { productsService } from "./products/productsService";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
  [productsService.reducerPath]: productsService.reducer,
  [ordersService.reducerPath]: ordersService.reducer,
  auth: authReducer,
});

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authService.middleware as Middleware,
        userService.middleware as Middleware,
        productsService.middleware as Middleware,
        ordersService.middleware as Middleware
      ),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
