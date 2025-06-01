"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");

    startTransition(async () => {
      try {
        console.log("[LoginForm] Attempting login...");

        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          console.error("[LoginForm] Authentication failed:", result.error);
          setError(
            "Invalid credentials. Please check your username/email and password."
          );
          return;
        }

        if (result?.ok) {
          console.log("[LoginForm] Login successful, redirecting...");
          router.push("/dashboard");
          return;
        }

        setError("Login failed. Please try again.");
      } catch (error: unknown) {
        console.error("[LoginForm] Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <Card className="w-full max-w-sm p-6 bg-background">
      <h1 className="text-2xl font-bold w-full text-center">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your email address.
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
                    href="/forgot-password"
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
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={"/signup"}
              className="text-sm text-muted-foreground cursor-pointer hover:text-primary font-semibold"
            >
              Sign up
            </Link>
          </span>
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default LoginForm;
