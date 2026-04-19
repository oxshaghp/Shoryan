// auth.ts (Server)
"use server";

import { LogIn } from "@/types/logIn.type";

type LoginSuccess = {
  ok: true;
  data: Record<string, unknown>;
};

type LoginFailure = {
  ok: false;
  status: number;
  message: string;
};

type LoginResult = LoginSuccess | LoginFailure;

export const logIn = async ({ email, password }: LogIn): Promise<LoginResult> => {
  const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const res = await fetch(`${apiBaseUrl}/api/v1/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJsonResponse = contentType.includes("application/json");
  const payload = isJsonResponse ? await res.json() : null;

  if (!res.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : "Login failed") || "Login failed";

    return {
      ok: false,
      status: res.status,
      message,
    } satisfies LoginFailure;
  }

  return {
    ok: true,
    data: (payload ?? {}) as Record<string, unknown>,
  } satisfies LoginSuccess;
};