// auth.ts (Server)
"use server";

import { cookies } from "next/headers";

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

type LogoutResult = {
  ok: boolean;
  status: number;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function extractToken(payload: unknown, keys: string[]): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  for (const key of keys) {
    const directValue = readString(payload[key]);
    if (directValue) {
      return directValue;
    }
  }

  const nestedData = payload.data;
  if (!isRecord(nestedData)) {
    return null;
  }

  for (const key of keys) {
    const nestedValue = readString(nestedData[key]);
    if (nestedValue) {
      return nestedValue;
    }
  }

  return null;
}

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

  const token = extractToken(payload, ["token", "accessToken", "access_token"]);
  const refreshToken = extractToken(payload, ["refreshToken", "refresh_token"]);

  if (token) {
    const cookieStore = await cookies();

    cookieStore.set("admin_access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    if (refreshToken) {
      cookieStore.set("admin_refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
    }
  }

  return {
    ok: true,
    data: (payload ?? {}) as Record<string, unknown>,
  } satisfies LoginSuccess;
};

export const logoutAdmin = async (): Promise<LogoutResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("admin_access_token")?.value;

  const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  let status = 200;
  let message = "Logged out";
  let ok = true;

  if (accessToken) {
    const res = await fetch(`${apiBaseUrl}/api/v1/auth/admin/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    status = res.status;
    ok = res.ok;

    if (!res.ok) {
      message = "Logout request failed";
    }
  }

  cookieStore.set("admin_access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  cookieStore.set("admin_refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return {
    ok,
    status,
    message,
  };
};