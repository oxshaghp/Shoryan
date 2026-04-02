"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

import type { AppLocale } from "@/lib/i18n/config";

type PointType = "donor" | "request" | "hospital";

type MapPoint = {
  id: number;
  name: string;
  type: PointType;
  bloodType?: string;
  area: string;
  location: [number, number];
};

type MapLabels = {
  title: string;
  subtitle: string;
  filters: {
    type: string;
    allTypes: string;
    allAreas: string;
    area: string;
  };
  markerTypes: {
    donor: string;
    request: string;
    hospital: string;
  };
  popup: {
    area: string;
    bloodType: string;
  };
  pointsShown: string;
};

type MapSectionProps = {
  lang: AppLocale;
  labels: MapLabels;
};

const mapPoints: MapPoint[] = [
  { id: 1, name: "Ahmed M.", type: "donor", bloodType: "A+", area: "Nasr City", location: [30.0488, 31.3413] },
  { id: 2, name: "Nour Clinic", type: "hospital", area: "Heliopolis", location: [30.0914, 31.3176] },
  { id: 3, name: "Urgent O- Case", type: "request", bloodType: "O-", area: "Maadi", location: [29.9602, 31.2569] },
  { id: 4, name: "Salma H.", type: "donor", bloodType: "B+", area: "Heliopolis", location: [30.1001, 31.3419] },
  { id: 5, name: "City General Hospital", type: "hospital", area: "Nasr City", location: [30.0698, 31.3204] },
  { id: 6, name: "Emergency AB+", type: "request", bloodType: "AB+", area: "Nasr City", location: [30.0404, 31.3301] },
];

const pointColor: Record<PointType, string> = {
  donor: "#25a55f",
  request: "#e63d3d",
  hospital: "#2f7fe0",
};

const pointEmoji: Record<PointType, string> = {
  donor: "🟢",
  request: "🔴",
  hospital: "🏥",
};

type MapCanvasProps = {
  center: [number, number];
  points: MapPoint[];
  pointColor: Record<PointType, string>;
  pointEmoji: Record<PointType, string>;
  markerTypes: MapLabels["markerTypes"];
  popupLabels: MapLabels["popup"];
};

const LeafletMapCanvas = dynamic<MapCanvasProps>(() => import("./MapSectionMapCanvas").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-sm text-(--hero-copy)">
      Loading map...
    </div>
  ),
});

function MapSection({ lang, labels }: MapSectionProps) {
  const [selectedType, setSelectedType] = useState<"all" | PointType>("all");
  const [selectedArea, setSelectedArea] = useState("all");

  const areas = useMemo(() => {
    const unique = new Set(mapPoints.map((point) => point.area));
    return Array.from(unique);
  }, []);

  const filteredPoints = useMemo(
    () =>
      mapPoints.filter((point) => {
        if (selectedType !== "all" && point.type !== selectedType) return false;
        if (selectedArea !== "all" && point.area !== selectedArea) return false;
        return true;
      }),
    [selectedArea, selectedType]
  );

  const mapCenter: [number, number] = [30.0444, 31.2357];

  return (
    <section data-lang={lang} className="bg-[#fff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-(--hero-ink) sm:text-5xl">{labels.title}</h2>
          <p className="mt-5 text-xl leading-relaxed text-(--hero-copy)">{labels.subtitle}</p>
        </header>

        <div className="mt-12 overflow-hidden rounded-3xl border border-[#ece1e4] bg-linear-to-br from-[#f8eef0] via-[#f7f1f2] to-[#f3f5f7] p-4 shadow-[0_14px_38px_-28px_rgb(0_0_0/0.46)] sm:p-5 lg:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/70 bg-white/65 p-3 shadow-[0_8px_20px_-18px_rgb(0_0_0/0.4)] backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-(--hero-copy)">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25a55f]/14 px-2.5 py-1 text-[#1f8c50]">
                {pointEmoji.donor} {labels.markerTypes.donor}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e63d3d]/14 px-2.5 py-1 text-[#c33333]">
                {pointEmoji.request} {labels.markerTypes.request}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2f7fe0]/14 px-2.5 py-1 text-[#286fca]">
                {pointEmoji.hospital} {labels.markerTypes.hospital}
              </span>
            </div>

            <div className="ms-auto grid w-full gap-2 sm:w-auto sm:grid-cols-2">
              <label className="relative block min-w-44">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-(--hero-copy)">
                  {labels.filters.type}
                </span>
                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value as "all" | PointType)}
                  className="w-full appearance-none rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-(--hero-ink) outline-none ring-(--hero-accent)/25 transition focus:border-(--hero-accent) focus:ring-3"
                >
                  <option value="all">{labels.filters.allTypes}</option>
                  <option value="donor">{labels.markerTypes.donor}</option>
                  <option value="request">{labels.markerTypes.request}</option>
                  <option value="hospital">{labels.markerTypes.hospital}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute inset-e-3 top-8.25 size-4 text-(--hero-copy)" />
              </label>

              <label className="relative block min-w-44">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-(--hero-copy)">
                  {labels.filters.area}
                </span>
                <select
                  value={selectedArea}
                  onChange={(event) => setSelectedArea(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-(--hero-ink) outline-none ring-(--hero-accent)/25 transition focus:border-(--hero-accent) focus:ring-3"
                >
                  <option value="all">{labels.filters.allAreas}</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute inset-e-3 top-8.25 size-4 text-(--hero-copy)" />
              </label>
            </div>
          </div>

          <div className="relative h-105 overflow-hidden rounded-2xl border border-white/75 bg-white/55 sm:h-120 lg:h-130">
            <LeafletMapCanvas
              center={mapCenter}
              points={filteredPoints}
              pointColor={pointColor}
              pointEmoji={pointEmoji}
              markerTypes={labels.markerTypes}
              popupLabels={labels.popup}
            />

            <div className="pointer-events-none absolute bottom-4 inset-s-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-medium text-(--hero-copy) shadow-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-(--hero-accent)" />
                {filteredPoints.length} {labels.pointsShown}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;