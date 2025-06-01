import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/axios";
import type { JWT } from "next-auth/jwt";

interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
}

interface AuthResponse {
  accessToken: string;
  username: string;
  email: string;
  id: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenRefreshResponse {
  accessToken: string;
  expiresAt: number;
}

interface TokenRefreshResponse {
  accessToken: string;
  username: string;
  email: string;
  id: string;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("[NextAuth] Refreshing access token...");
    
    // Call the refresh endpoint with the current token
    const response = await api.post<TokenRefreshResponse>("/auth/refresh", {}, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const { accessToken, username, email, id } = response.data;

    console.log("[NextAuth] Token refreshed successfully");

    return {
      ...token,
      accessToken,
      username,
      email,
      id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // Reset expiry for another day
    };
  } catch (error) {
    console.error("[NextAuth] Error refreshing access token:", error);
    
    // If refresh fails, return token with error
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          console.error("[NextAuth] Missing credentials");
          return null;
        }

        try {
          const loginData: LoginCredentials = {
            email: credentials.email,
            password: credentials.password,
          };

          console.log("[NextAuth] Attempting login with backend...");

          // Make request to your NestJS backend - correct route
          const response = await api.post<AuthResponse>("/auth", loginData);

          const { accessToken, username, email, id } = response.data;

          if (!accessToken) {
            console.error("[NextAuth] No access token received from backend");
            return null;
          }

          console.log("[NextAuth] Login successful");

          return {
            id,
            username,
            email,
            accessToken,
          };
        } catch (error: unknown) {
          console.error(
            "[NextAuth] Login failed:",
            error instanceof Error ? error.message : "Unknown error"
          );

          // Return null to indicate failed authentication
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days (but will refresh automatically)
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days (but will refresh automatically)
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.id = user.id;
        // Set expiry time (backend token expires in 1 day)
        token.expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day from now
        return token;
      }

      // Check if we should refresh the token (refresh 30 minutes before expiry)
      const shouldRefresh = Date.now() > ((token.expiresAt as number) - 30 * 60 * 1000);
      
      if (shouldRefresh) {
        console.log("[NextAuth] Token will expire soon, refreshing...");
        return await refreshAccessToken(token);
      }

      // Token is still valid
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
      };

      // If there's an error, force logout
      if (token.error) {
        console.error("[NextAuth] Session error:", token.error);
        // This will force logout by returning null
        return {
          ...session,
          error: token.error,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },
  secret: process.env.SESSION_SECRET,
  debug: process.env.NODE_ENV === "development",
};
