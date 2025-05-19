"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, {
      message: "Username or email is required.",
    })
    .regex(/^[a-zA-Z0-9._-]+$/, {
      message:
        "Username can only contain letters, numbers, dots, underscores, and hyphens.",
    }),
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .optional(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function ForgotForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full max-w-sm p-6 bg-background">
      <h1 className="text-2xl font-bold w-full text-center">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full flex justify-between">
                  <span>Password</span>
                  <Link
                    href="/auth/forgot-password"
                    className="text-muted-foreground cursor-pointer hover:text-primary font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your secret password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="text-sm text-muted-foreground cursor-pointer hover:text-primary font-semibold"
            >
              Sign up
            </Link>
          </span>
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default ForgotForm;
