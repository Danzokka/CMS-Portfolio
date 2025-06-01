import axios, { type AxiosResponse, type AxiosError } from "axios";
import { getSession } from "next-auth/react";

interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add Bearer token
api.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }

      // Log request for debugging
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`
      );

      return config;
    } catch (error) {
      console.error("[API Request Error]:", error);
      return config;
    }
  },
  (error: AxiosError) => {
    console.error("[API Request Interceptor Error]:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and success
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const { response, config } = error;

    if (response) {
      const { status, data } = response;

      // Log error responses
      console.error(
        `[API Error] ${status} ${config?.url}:`,
        data?.message || error.message
      );

      // Handle different error status codes
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.warn("[API] Unauthorized access - redirecting to login");
          // Here you could trigger a logout or redirect to login
          break;
        case 403:
          // Forbidden
          console.warn("[API] Forbidden access");
          break;
        case 404:
          // Not found
          console.warn("[API] Resource not found");
          break;
        case 422:
          // Validation error
          console.warn("[API] Validation error:", data?.message);
          break;
        case 500:
          // Server error
          console.error("[API] Internal server error");
          break;
        default:
          console.error(
            "[API] Unexpected error:",
            data?.message || error.message
          );
      }

      // Return structured error
      const apiError: ApiError = {
        message: data?.message || "An unexpected error occurred",
        statusCode: status,
        error: data?.error,
      };

      return Promise.reject(apiError);
    }

    // Network error or no response
    console.error("[API Network Error]:", error.message);

    const networkError: ApiError = {
      message: "Network error - please check your connection",
      statusCode: 0,
      error: "NETWORK_ERROR",
    };

    return Promise.reject(networkError);
  }
);

export default api;
