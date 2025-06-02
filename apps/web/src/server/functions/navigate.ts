"use server";

import { redirect } from "next/navigation";

export async function navigate(path: string): Promise<void> {
  // Use Next.js redirect to navigate to the specified path
  redirect(path);
}
