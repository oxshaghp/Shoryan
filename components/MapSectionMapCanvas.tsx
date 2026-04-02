"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type PointType = "donor" | "request" | "hospital";

type MapPoint = {
  id: number;
  name: string;
  type: PointType;
  bloodType?: string;
  area: string;
  location: [number, number];
};

type MarkerTypesLabels = {
  donor: string;
  request: string;
  hospital: string;
};

type PopupLabels = {
  area: string;
  bloodType: string;
};

type MapSectionMapCanvasProps = {
  center: [number, number];
  points: MapPoint[];
  pointColor: Record<PointType, string>;
  pointEmoji: Record<PointType, string>;
  markerTypes: MarkerTypesLabels;
  popupLabels: PopupLabels;
};

function MapSectionMapCanvas({
  center,
  points,
  pointColor,
  pointEmoji,
  markerTypes,
  popupLabels,
}: MapSectionMapCanvasProps) {
  const markerIcon = (type: PointType) =>
    divIcon({
      className: "",
      html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:14px;background:${pointColor[type]};box-shadow:0 10px 18px -10px rgba(0,0,0,.42);border:2px solid #ffffff;"><span style="font-size:16px;line-height:1;">${pointEmoji[type]}</span><span style="position:absolute;left:50%;bottom:-7px;width:11px;height:11px;background:${pointColor[type]};transform:translateX(-50%) rotate(45deg);border-right:2px solid #ffffff;border-bottom:2px solid #ffffff;"></span></div>`,
      iconSize: [34, 44],
      iconAnchor: [17, 42],
      popupAnchor: [0, -35],
    });

  return (
    <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.location}
          icon={markerIcon(point.type)}
        >
          <Popup>
            <div className="min-w-52 text-sm text-(--hero-ink)">
              <p className="font-bold">{point.name}</p>
              <p className="mt-1 font-semibold">
                {pointEmoji[point.type]} {markerTypes[point.type]}
              </p>
              <p className="mt-1 text-(--hero-copy)">
                {popupLabels.area}: {point.area}
              </p>
              {point.bloodType && (
                <p className="text-(--hero-copy)">
                  {popupLabels.bloodType}: {point.bloodType}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapSectionMapCanvas;
