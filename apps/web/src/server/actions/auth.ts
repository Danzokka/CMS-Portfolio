"use server";

import { api } from "@/lib/axios";

// Helper function to validate user session
export async function validateSession(): Promise<boolean> {
  try {
    // This will use the axios interceptor to add the Bearer token
    const response = await api.get("/auth/profile");
    return response.status === 200;
  } catch (error: unknown) {
    console.error("[Validate Session] Session validation failed:", error);
    return false;
  }
}
