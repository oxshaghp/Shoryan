"use server";

import { cookies } from "next/headers";

import type {
  DashboardBloodBank,
  DashboardBloodRequest,
  DashboardChartDatum,
  DashboardDonor,
  DashboardNotification,
  DashboardSnapshot,
} from "@/types/types";

type ApiEnvelope = {
  statusCode?: number;
  message?: string;
  data?: unknown;
  meta?: unknown;
};

type ApiResult = {
  ok: boolean;
  status: number;
  data: unknown;
  meta: unknown;
};

const DEFAULT_LIMIT = 8;

function buildMockSnapshot(): DashboardSnapshot {
  const donors: DashboardDonor[] = [
    {
      id: "mock-donor-1",
      name: "Ahmed Ali",
      city: "Cairo",
      mobile: "+966500000001",
      bloodType: "O POSITIVE",
      donationsCount: 15,
      isAvailable: true,
      isActive: true,
      updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: "mock-donor-2",
      name: "Sara Nasser",
      city: "Alexandria",
      mobile: "+966500000002",
      bloodType: "A POSITIVE",
      donationsCount: 12,
      isAvailable: false,
      isActive: true,
      updatedAt: new Date(Date.now() - 1000 * 60 * 34).toISOString(),
    },
    {
      id: "mock-donor-3",
      name: "Mohammed Hassan",
      city: "Giza",
      mobile: "+966500000003",
      bloodType: "B NEGATIVE",
      donationsCount: 10,
      isAvailable: true,
      isActive: true,
      updatedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
    {
      id: "mock-donor-4",
      name: "Mariam Adel",
      city: "Mansoura",
      mobile: "+966500000004",
      bloodType: "AB POSITIVE",
      donationsCount: 8,
      isAvailable: true,
      isActive: true,
      updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: "mock-donor-5",
      name: "Yousef Khaled",
      city: "Cairo",
      mobile: "+966500000005",
      bloodType: "O NEGATIVE",
      donationsCount: 6,
      isAvailable: false,
      isActive: false,
      updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
  ];

  const bloodRequests: DashboardBloodRequest[] = [
    {
      id: "mock-request-1",
      patientName: "Fatima Saleh",
      hospitalName: "Cairo Medical Center",
      location: "Cairo",
      contactPhone: "+20 123 456 7890",
      bloodType: "O POSITIVE",
      urgency: "EMERGENCY",
      status: "OPEN",
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: "mock-request-2",
      patientName: "Abdullah Omar",
      hospitalName: "Alexandria General Hospital",
      location: "Alexandria",
      contactPhone: "+20 123 456 7891",
      bloodType: "A NEGATIVE",
      urgency: "URGENT",
      status: "PARTIALLY FULFILLED",
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      id: "mock-request-3",
      patientName: "Lama Saad",
      hospitalName: "Giza University Hospital",
      location: "Giza",
      contactPhone: "+20 123 456 7892",
      bloodType: "B POSITIVE",
      urgency: "NORMAL",
      status: "OPEN",
      createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      id: "mock-request-4",
      patientName: "Khaled Younis",
      hospitalName: "Mansoura Emergency Hospital",
      location: "Mansoura",
      contactPhone: "+20 123 456 7893",
      bloodType: "AB NEGATIVE",
      urgency: "URGENT",
      status: "OPEN",
      createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    },
  ];

  const approvedBanks: DashboardBloodBank[] = [
    {
      id: "mock-bank-1",
      name: "King Fahad Blood Bank",
      city: "Riyadh",
      status: "APPROVED",
      phone: "+966112223333",
    },
    {
      id: "mock-bank-2",
      name: "Al Noor Hospital Bank",
      city: "Jeddah",
      status: "APPROVED",
      phone: "+966122223333",
    },
  ];

  const pendingBanks: DashboardBloodBank[] = [
    {
      id: "mock-bank-3",
      name: "Al Amal Center",
      city: "Dammam",
      status: "PENDING",
      phone: "+966132223333",
    },
    {
      id: "mock-bank-4",
      name: "Al Rahma Medical Bank",
      city: "Madinah",
      status: "PENDING",
      phone: "+966142223333",
    },
  ];

  const notifications: DashboardNotification[] = [
    {
      id: "mock-notification-1",
      title: "Emergency request nearby",
      body: "A compatible donor is needed within 5 km.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: "mock-notification-2",
      title: "New blood bank registration",
      body: "A new blood bank is waiting for approval.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
    {
      id: "mock-notification-3",
      title: "Donor status changed",
      body: "One donor changed availability status.",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
  ];

  return {
    overview: {
      stats: {
        admins: 4,
        donors: 58,
        patients: 31,
        bloodRequests: 17,
        pendingBloodBanks: pendingBanks.length,
        unreadNotifications: notifications.filter((item) => !item.isRead).length,
      },
    },
    projectInfo: {
      profile: {
        fullName: "Admin User",
        email: "admin@sharyan.com",
        isSuperAdmin: true,
        isActive: true,
      },
    },
    bloodRequests: {
      total: 17,
      items: bloodRequests,
    },
    donors: {
      total: 58,
      items: donors,
    },
    hospitals: {
      approvedTotal: 26,
      pendingTotal: pendingBanks.length,
      approvedItems: approvedBanks,
      pendingItems: pendingBanks,
    },
    notifications: {
      unreadCount: notifications.filter((item) => !item.isRead).length,
      items: notifications,
    },
    analytics: {
      requestsByUrgency: [
        { name: "EMERGENCY", value: 4 },
        { name: "URGENT", value: 7 },
        { name: "NORMAL", value: 6 },
      ],
      donorsByAvailability: [
        { name: "Available", value: 36 },
        { name: "Unavailable", value: 22 },
      ],
      usersDistribution: [
        { name: "Admins", value: 4 },
        { name: "Donors", value: 58 },
        { name: "Patients", value: 31 },
      ],
      bloodTypesDistribution: [
        { name: "O POSITIVE", value: 19 },
        { name: "A POSITIVE", value: 13 },
        { name: "B POSITIVE", value: 10 },
        { name: "AB POSITIVE", value: 6 },
        { name: "O NEGATIVE", value: 6 },
        { name: "A NEGATIVE", value: 4 },
      ],
    },
    fetchedAt: new Date().toISOString(),
  };
}

function mergeSnapshotWithMock(snapshot: DashboardSnapshot, mock: DashboardSnapshot): DashboardSnapshot {
  return {
    ...snapshot,
    overview: {
      stats: {
        admins: snapshot.overview.stats.admins || mock.overview.stats.admins,
        donors: snapshot.overview.stats.donors || mock.overview.stats.donors,
        patients: snapshot.overview.stats.patients || mock.overview.stats.patients,
        bloodRequests: snapshot.overview.stats.bloodRequests || mock.overview.stats.bloodRequests,
        pendingBloodBanks: snapshot.overview.stats.pendingBloodBanks || mock.overview.stats.pendingBloodBanks,
        unreadNotifications: snapshot.overview.stats.unreadNotifications || mock.overview.stats.unreadNotifications,
      },
    },
    projectInfo: {
      profile: {
        fullName: snapshot.projectInfo.profile.fullName || mock.projectInfo.profile.fullName,
        email: snapshot.projectInfo.profile.email || mock.projectInfo.profile.email,
        isSuperAdmin: snapshot.projectInfo.profile.isSuperAdmin,
        isActive: snapshot.projectInfo.profile.isActive,
      },
    },
    bloodRequests: {
      total: snapshot.bloodRequests.total || mock.bloodRequests.total,
      items: snapshot.bloodRequests.items.length ? snapshot.bloodRequests.items : mock.bloodRequests.items,
    },
    donors: {
      total: snapshot.donors.total || mock.donors.total,
      items: snapshot.donors.items.length ? snapshot.donors.items : mock.donors.items,
    },
    hospitals: {
      approvedTotal: snapshot.hospitals.approvedTotal || mock.hospitals.approvedTotal,
      pendingTotal: snapshot.hospitals.pendingTotal || mock.hospitals.pendingTotal,
      approvedItems: snapshot.hospitals.approvedItems.length
        ? snapshot.hospitals.approvedItems
        : mock.hospitals.approvedItems,
      pendingItems: snapshot.hospitals.pendingItems.length ? snapshot.hospitals.pendingItems : mock.hospitals.pendingItems,
    },
    notifications: {
      unreadCount: snapshot.notifications.unreadCount || mock.notifications.unreadCount,
      items: snapshot.notifications.items.length ? snapshot.notifications.items : mock.notifications.items,
    },
    analytics: {
      requestsByUrgency: snapshot.analytics.requestsByUrgency.length
        ? snapshot.analytics.requestsByUrgency
        : mock.analytics.requestsByUrgency,
      donorsByAvailability: snapshot.analytics.donorsByAvailability.length
        ? snapshot.analytics.donorsByAvailability
        : mock.analytics.donorsByAvailability,
      usersDistribution: snapshot.analytics.usersDistribution.length
        ? snapshot.analytics.usersDistribution
        : mock.analytics.usersDistribution,
      bloodTypesDistribution: snapshot.analytics.bloodTypesDistribution.length
        ? snapshot.analytics.bloodTypesDistribution
        : mock.analytics.bloodTypesDistribution,
    },
    fetchedAt: snapshot.fetchedAt || mock.fetchedAt,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown, fallback = "-"): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function readNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeDate(value: unknown): string {
  const text = typeof value === "string" ? value : "";
  if (!text) {
    return "-";
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? text : date.toISOString();
}

function normalizeLabel(value: unknown): string {
  return readString(value, "Unknown").replaceAll("_", " ");
}

function readNestedName(value: unknown): string | null {
  if (!isRecord(value)) {
    return null;
  }

  const nested = value.patient;
  if (!isRecord(nested)) {
    return null;
  }

  return typeof nested.name === "string" ? nested.name : null;
}

function extractEnvelope(payload: unknown): ApiEnvelope {
  if (!isRecord(payload)) {
    return {};
  }

  return payload as ApiEnvelope;
}

function extractItems(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (!isRecord(data)) {
    return [];
  }

  const candidateKeys = ["items", "rows", "results", "records", "data"];

  for (const key of candidateKeys) {
    const candidate = data[key];
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

function extractTotal(data: unknown, meta: unknown): number {
  if (isRecord(meta)) {
    const metaTotal = readNumber(meta.total, NaN);
    if (!Number.isNaN(metaTotal)) {
      return metaTotal;
    }

    const pagination = meta.pagination;
    if (isRecord(pagination)) {
      const paginationTotal = readNumber(pagination.total, NaN);
      if (!Number.isNaN(paginationTotal)) {
        return paginationTotal;
      }
    }
  }

  if (isRecord(data)) {
    const directTotal = readNumber(data.total, NaN);
    if (!Number.isNaN(directTotal)) {
      return directTotal;
    }

    const pagination = data.pagination;
    if (isRecord(pagination)) {
      const paginationTotal = readNumber(pagination.total, NaN);
      if (!Number.isNaN(paginationTotal)) {
        return paginationTotal;
      }
    }
  }

  return extractItems(data).length;
}

function firstValue(source: unknown, keys: string[], fallback: number): number {
  if (!isRecord(source)) {
    return fallback;
  }

  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }

  return fallback;
}

function countBy<T>(items: T[], keySelector: (item: T) => string): DashboardChartDatum[] {
  const counter = new Map<string, number>();

  for (const item of items) {
    const key = keySelector(item) || "Unknown";
    counter.set(key, (counter.get(key) ?? 0) + 1);
  }

  return Array.from(counter.entries()).map(([name, value]) => ({ name, value }));
}

function mapBloodRequests(items: unknown[]): DashboardBloodRequest[] {
  return items
    .filter(isRecord)
    .map((item) => ({
      id: readString(item.id, crypto.randomUUID()),
      patientName: readString(item.patientName ?? readNestedName(item), "Unknown patient"),
      hospitalName: readString(item.hospitalName, "Unknown hospital"),
      location: readString(item.city ?? item.location, "Unknown city"),
      contactPhone: readString(item.contactPhone, "-"),
      bloodType: normalizeLabel(item.bloodType),
      urgency: normalizeLabel(item.urgency),
      status: normalizeLabel(item.status),
      createdAt: normalizeDate(item.createdAt ?? item.updatedAt),
    }));
}

function mapDonors(items: unknown[]): DashboardDonor[] {
  return items
    .filter(isRecord)
    .map((item) => ({
      id: readString(item.id, crypto.randomUUID()),
      name: readString(item.name, "Unknown donor"),
      city: readString(item.city, "Unknown city"),
      mobile: readString(item.mobile, "-"),
      bloodType: normalizeLabel(item.bloodType),
      donationsCount: readNumber(item.donationsCount ?? item.totalDonations, 0),
      isAvailable: readBoolean(item.isAvailable, false),
      isActive: readBoolean(item.isActive, true),
      updatedAt: normalizeDate(item.updatedAt ?? item.createdAt),
    }));
}

function mapBloodBanks(items: unknown[], fallbackStatus: string): DashboardBloodBank[] {
  return items
    .filter(isRecord)
    .map((item) => ({
      id: readString(item.id, crypto.randomUUID()),
      name: readString(item.name ?? item.nameAr, "Unknown blood bank"),
      city: readString(item.city, "-"),
      status: normalizeLabel(item.status ?? fallbackStatus),
      phone: readString(item.phone, "-"),
    }));
}

function mapNotifications(items: unknown[]): DashboardNotification[] {
  return items
    .filter(isRecord)
    .map((item) => ({
      id: readString(item.id, crypto.randomUUID()),
      title: readString(item.title ?? item.type, "Notification"),
      body: readString(item.body ?? item.message, "-"),
      isRead: readBoolean(item.isRead, false),
      createdAt: normalizeDate(item.createdAt),
    }));
}

async function authorizedFetch(path: string): Promise<ApiResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("admin_access_token")?.value;

  if (!accessToken) {
    return {
      ok: false,
      status: 401,
      data: null,
      meta: null,
    };
  }

  const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const hasJson = contentType.includes("application/json");
  const payload = hasJson ? ((await response.json()) as unknown) : null;
  const envelope = extractEnvelope(payload);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data: envelope.data ?? null,
      meta: envelope.meta ?? null,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: envelope.data ?? payload,
    meta: envelope.meta ?? null,
  };
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const mockSnapshot = buildMockSnapshot();

  const [
    dashboardStatsResult,
    adminMeResult,
    adminsResult,
    donorsResult,
    patientsResult,
    bloodRequestsResult,
    approvedBanksResult,
    pendingBanksResult,
    notificationsResult,
    unreadResult,
  ] = await Promise.all([
    authorizedFetch("/api/v1/admin/dashboard"),
    authorizedFetch("/api/v1/auth/admin/me"),
    authorizedFetch(`/api/v1/admin/admins?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/admin/donors?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/admin/patients?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/admin/blood-requests?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/blood-banks?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/blood-banks/pending?page=1&limit=${DEFAULT_LIMIT}`),
    authorizedFetch(`/api/v1/notifications?page=1&limit=${DEFAULT_LIMIT}&userType=ADMIN`),
    authorizedFetch("/api/v1/notifications/unread-count?userType=ADMIN"),
  ]);

  const allUnauthorized = [
    dashboardStatsResult,
    adminMeResult,
    adminsResult,
    donorsResult,
    patientsResult,
    bloodRequestsResult,
    approvedBanksResult,
    pendingBanksResult,
    notificationsResult,
    unreadResult,
  ].every((result) => !result.ok && result.status === 401);

  if (allUnauthorized) {
    return mockSnapshot;
  }

  const bloodRequests = mapBloodRequests(extractItems(bloodRequestsResult.data));
  const donors = mapDonors(extractItems(donorsResult.data));
  const approvedBanks = mapBloodBanks(extractItems(approvedBanksResult.data), "APPROVED");
  const pendingBanks = mapBloodBanks(extractItems(pendingBanksResult.data), "PENDING");
  const notifications = mapNotifications(extractItems(notificationsResult.data));

  const dashboardStatsSource = isRecord(dashboardStatsResult.data) ? dashboardStatsResult.data : {};

  const adminsTotal = extractTotal(adminsResult.data, adminsResult.meta);
  const donorsTotal = extractTotal(donorsResult.data, donorsResult.meta);
  const patientsTotal = extractTotal(patientsResult.data, patientsResult.meta);
  const bloodRequestsTotal = extractTotal(bloodRequestsResult.data, bloodRequestsResult.meta);
  const approvedBanksTotal = extractTotal(approvedBanksResult.data, approvedBanksResult.meta);
  const pendingBanksTotal = extractTotal(pendingBanksResult.data, pendingBanksResult.meta);

  const unreadFromApi = firstValue(unreadResult.data, ["unreadCount", "count", "total"], 0);

  const adminProfileSource = isRecord(adminMeResult.data) ? adminMeResult.data : {};
  const firstName = readString(adminProfileSource.firstName, "");
  const lastName = readString(adminProfileSource.lastName, "");
  const fullName = `${firstName} ${lastName}`.trim() || readString(adminProfileSource.name, "Admin User");

  const snapshot: DashboardSnapshot = {
    overview: {
      stats: {
        admins: firstValue(dashboardStatsSource, ["admins", "totalAdmins", "adminsCount"], adminsTotal),
        donors: firstValue(dashboardStatsSource, ["donors", "totalDonors", "donorsCount"], donorsTotal),
        patients: firstValue(dashboardStatsSource, ["patients", "totalPatients", "patientsCount"], patientsTotal),
        bloodRequests: firstValue(
          dashboardStatsSource,
          ["bloodRequests", "totalBloodRequests", "bloodRequestsCount"],
          bloodRequestsTotal
        ),
        pendingBloodBanks: firstValue(
          dashboardStatsSource,
          ["pendingBloodBanks", "pendingBanks", "pendingBloodBanksCount"],
          pendingBanksTotal
        ),
        unreadNotifications:
          unreadFromApi ||
          firstValue(dashboardStatsSource, ["unreadNotifications", "notificationsUnread", "unreadCount"], 0),
      },
    },
    projectInfo: {
      profile: {
        fullName,
        email: readString(adminProfileSource.email, "admin@sharyan.com"),
        isSuperAdmin: readBoolean(adminProfileSource.isSuperAdmin, false),
        isActive: readBoolean(adminProfileSource.isActive, true),
      },
    },
    bloodRequests: {
      total: bloodRequestsTotal,
      items: bloodRequests,
    },
    donors: {
      total: donorsTotal,
      items: donors,
    },
    hospitals: {
      approvedTotal: approvedBanksTotal,
      pendingTotal: pendingBanksTotal,
      approvedItems: approvedBanks,
      pendingItems: pendingBanks,
    },
    notifications: {
      unreadCount: unreadFromApi,
      items: notifications,
    },
    analytics: {
      requestsByUrgency: countBy(bloodRequests, (item) => item.urgency),
      donorsByAvailability: [
        { name: "Available", value: donors.filter((item) => item.isAvailable).length },
        { name: "Unavailable", value: donors.filter((item) => !item.isAvailable).length },
      ],
      usersDistribution: [
        { name: "Admins", value: adminsTotal },
        { name: "Donors", value: donorsTotal },
        { name: "Patients", value: patientsTotal },
      ],
      bloodTypesDistribution: countBy(donors, (item) => item.bloodType),
    },
    fetchedAt: new Date().toISOString(),
  };

  if (snapshot.hospitals.approvedTotal === 0 && snapshot.hospitals.pendingTotal === 0) {
    snapshot.hospitals.approvedTotal = approvedBanks.length;
    snapshot.hospitals.pendingTotal = pendingBanks.length;
  }

  return mergeSnapshotWithMock(snapshot, mockSnapshot);
}
