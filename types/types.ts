import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type DashboardSectionKey =
  | "overview"
  | "projectInfo"
  | "bloodRequests"
  | "donors"
  | "hospitals"
  | "notifications"
  | "analytics";

export type DashboardSectionLabels = {
  brand: string;
  sidebarRole: string;
  profileName: string;
  profileEmail: string;
  sections: Record<DashboardSectionKey, string>;
};

export type DashboardSectionMeta = {
  key: DashboardSectionKey;
  icon: LucideIcon;
  label: string;
};

export type DashboardViewProps = {
  sectionName: string;
  title: string;
  description: string;
  locale: string;
  sectionLabels: Record<DashboardSectionKey, string>;
  ui: DashboardUiLabels;
  snapshot: DashboardSnapshot;
  onNavigateSection?: (section: DashboardSectionKey) => void;
};

export type DashboardViewComponent = ComponentType<DashboardViewProps>;

export type DashboardOverviewStats = {
  admins: number;
  donors: number;
  patients: number;
  bloodRequests: number;
  pendingBloodBanks: number;
  unreadNotifications: number;
};

export type DashboardAdminProfile = {
  fullName: string;
  email: string;
  isSuperAdmin: boolean;
  isActive: boolean;
};

export type DashboardBloodRequest = {
  id: string;
  patientName: string;
  hospitalName: string;
  location: string;
  contactPhone: string;
  bloodType: string;
  urgency: string;
  status: string;
  createdAt: string;
};

export type DashboardDonor = {
  id: string;
  name: string;
  city: string;
  mobile: string;
  bloodType: string;
  donationsCount: number;
  isAvailable: boolean;
  isActive: boolean;
  updatedAt: string;
};

export type DashboardBloodBank = {
  id: string;
  name: string;
  city: string;
  status: string;
  phone: string;
};

export type DashboardNotification = {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export type DashboardChartDatum = {
  name: string;
  value: number;
};

export type DashboardActionResult = {
  ok: boolean;
  status: number;
  message: string;
};

export type DashboardUiLabels = {
  sidebar: {
    logout: string;
    loggingOut: string;
  };
  common: {
    total: string;
    noData: string;
    search: string;
    previous: string;
    next: string;
    page: string;
    of: string;
    all: string;
    active: string;
    inactive: string;
    available: string;
    unavailable: string;
    approved: string;
    pending: string;
    read: string;
    unread: string;
    toggleStatus: string;
    markRead: string;
    approve: string;
    reject: string;
    suspend: string;
  };
  overview: {
    totalDonations: string;
    activeDonors: string;
    urgentRequests: string;
    pendingActions: string;
    thisMonth: string;
    totalRegistered: string;
    requiresAttention: string;
    unreadNotifications: string;
    emergencyBloodRequests: string;
    recentBloodRequests: string;
    availableDonors: string;
    quickActions: string;
    createBloodRequest: string;
    createBloodRequestDesc: string;
    registerDonor: string;
    registerDonorDesc: string;
    sendAlert: string;
    sendAlertDesc: string;
    urgent: string;
    viewDetails: string;
    lastSync: string;
  };
  projectInfo: {
    adminName: string;
    email: string;
    role: string;
    status: string;
    admin: string;
    superAdmin: string;
  };
  bloodRequests: {
    searchPlaceholder: string;
    allStatuses: string;
    allUrgencies: string;
    createDialogTitle: string;
    createDialogDescription: string;
    patientNameLabel: string;
    hospitalNameLabel: string;
    locationLabel: string;
    contactPhoneLabel: string;
    bloodTypeLabel: string;
    urgencyLabel: string;
    createSubmit: string;
    createSubmitting: string;
    cancel: string;
  };
  donors: {
    searchPlaceholder: string;
  };
  hospitals: {
    searchPlaceholder: string;
    noApproved: string;
    noPending: string;
  };
  notifications: {
    searchPlaceholder: string;
    allTab: string;
    unreadTab: string;
    readTab: string;
    markAllRead: string;
    delete: string;
  };
  analytics: {
    requestsByUrgency: string;
    usersDistribution: string;
    topBloodTypes: string;
    noBloodTypes: string;
    titleMain: string;
    titleSecondary: string;
    subtitle: string;
    exportReport: string;
    totalDonations: string;
    activeDonors: string;
    completionRate: string;
    avgPerDonor: string;
    donationsOverTime: string;
    bloodTypeDistribution: string;
    donorCountByBloodType: string;
    activeSuffix: string;
    trendUp: string;
    lastSixMonths: string;
  };
};

export type DashboardSnapshot = {
  overview: {
    stats: DashboardOverviewStats;
  };
  projectInfo: {
    profile: DashboardAdminProfile;
  };
  bloodRequests: {
    total: number;
    items: DashboardBloodRequest[];
  };
  donors: {
    total: number;
    items: DashboardDonor[];
  };
  hospitals: {
    approvedTotal: number;
    pendingTotal: number;
    approvedItems: DashboardBloodBank[];
    pendingItems: DashboardBloodBank[];
  };
  notifications: {
    unreadCount: number;
    items: DashboardNotification[];
  };
  analytics: {
    requestsByUrgency: DashboardChartDatum[];
    donorsByAvailability: DashboardChartDatum[];
    usersDistribution: DashboardChartDatum[];
    bloodTypesDistribution: DashboardChartDatum[];
  };
  fetchedAt: string;
};
