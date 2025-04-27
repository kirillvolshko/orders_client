"use client";
import InputField from "@/components/common/fields/InputField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRegistrationMutation } from "@/store/auth/authService";
import { useDispatch } from "react-redux";
import { setUserId } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import RegistratinSchema from "../schema/registrationSchema";
import { Spinner } from "@/components/common/ui/Spinner";
import { useState } from "react";

type FormValues = z.infer<typeof RegistratinSchema>;
const RegistrationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(RegistratinSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [registration, { error }] = useRegistrationMutation();
  useErrorHandler(error);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const handleOnSubmit = async (data: FormValues) => {
    const response = await registration(data).unwrap();

    dispatch(setUserId(response.user.id));

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
          <InputField
            control={form.control}
            name="name"
            label="User name"
            placeholder="Enter your name"
          />
          <Button type="submit">Registration</Button>
        </form>
      </Form>
    </div>
  );
};
export default RegistrationForm;
