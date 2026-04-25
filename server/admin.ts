"use server";

import { cookies } from "next/headers";

import type { DashboardActionResult } from "@/types/types";

type ApiEnvelope = {
  message?: string;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function adminRequest(path: string, method: "PATCH" | "POST" | "DELETE", body?: Record<string, unknown>): Promise<DashboardActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("admin_access_token")?.value;

  if (!accessToken) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const res = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? ((await res.json()) as unknown) : null;

  const envelope = isRecord(payload) ? (payload as ApiEnvelope) : null;
  const message = envelope?.message ?? (res.ok ? "Success" : "Request failed");

  return {
    ok: res.ok,
    status: res.status,
    message,
  };
}

export async function toggleDonorActive(id: string): Promise<DashboardActionResult> {
  return adminRequest(`/api/v1/admin/donors/${id}/toggle-active`, "PATCH");
}

export async function markNotificationRead(id: string): Promise<DashboardActionResult> {
  if (id.startsWith("mock-notification-")) {
    return {
      ok: true,
      status: 200,
      message: "Marked as read",
    };
  }

  return adminRequest(`/api/v1/notifications/${id}/read`, "PATCH");
}

export async function markAllNotificationsRead(): Promise<DashboardActionResult> {
  return adminRequest("/api/v1/notifications/mark-all-read", "PATCH");
}

export async function deleteNotification(id: string): Promise<DashboardActionResult> {
  if (id.startsWith("mock-notification-")) {
    return {
      ok: true,
      status: 200,
      message: "Deleted",
    };
  }

  return adminRequest(`/api/v1/notifications/${id}`, "DELETE");
}

export async function approveBloodBank(id: string): Promise<DashboardActionResult> {
  return adminRequest(`/api/v1/blood-banks/${id}/approve`, "PATCH");
}

export async function rejectBloodBank(id: string): Promise<DashboardActionResult> {
  return adminRequest(`/api/v1/blood-banks/${id}/reject`, "PATCH");
}

export async function suspendBloodBank(id: string): Promise<DashboardActionResult> {
  return adminRequest(`/api/v1/blood-banks/${id}/suspend`, "PATCH");
}

export async function approveBloodRequest(id: string): Promise<DashboardActionResult> {
  if (id.startsWith("mock-request-")) {
    return {
      ok: true,
      status: 200,
      message: "Approved",
    };
  }

  return adminRequest(`/api/v1/blood-requests/${id}`, "PATCH", {
    status: "FULFILLED",
  });
}

export async function rejectBloodRequest(id: string): Promise<DashboardActionResult> {
  if (id.startsWith("mock-request-")) {
    return {
      ok: true,
      status: 200,
      message: "Rejected",
    };
  }

  return adminRequest(`/api/v1/blood-requests/${id}/cancel`, "PATCH");
}

export async function completeBloodRequest(id: string): Promise<DashboardActionResult> {
  if (id.startsWith("mock-request-")) {
    return {
      ok: true,
      status: 200,
      message: "Completed",
    };
  }

  return adminRequest(`/api/v1/blood-requests/${id}`, "PATCH", {
    status: "FULFILLED",
  });
}

type CreateBloodRequestInput = {
  patientName: string;
  hospitalName: string;
  location: string;
  contactPhone: string;
  bloodType: string;
  urgency: string;
};

export async function createBloodRequest(input: CreateBloodRequestInput): Promise<DashboardActionResult> {
  const payload = {
    patientName: input.patientName,
    hospitalName: input.hospitalName,
    city: input.location,
    location: input.location,
    contactPhone: input.contactPhone,
    bloodType: input.bloodType,
    urgency: input.urgency,
    status: "OPEN",
  };

  return adminRequest("/api/v1/blood-requests", "POST", payload);
}
