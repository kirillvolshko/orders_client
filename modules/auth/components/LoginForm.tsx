"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/store/auth/authService";
import { useDispatch } from "react-redux";
import { setUserId } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import LoginSchema from "../schema/loginSchema";
import { useState } from "react";
import { Spinner } from "@/components/common/ui/Spinner";

type FormValues = z.infer<typeof LoginSchema>;
const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { error }] = useLoginMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    const { user } = await login(data).unwrap();

    dispatch(setUserId(user.id));
    form.reset();
    setIsRedirecting(true);
    router.push("/managment-panel");
  };
  if (isRedirecting) return <Spinner />;
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-5"
        >
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <InputField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
