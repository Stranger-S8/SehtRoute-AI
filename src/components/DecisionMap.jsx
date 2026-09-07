import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker SVG
function createMarkerIcon(color, label) {
  const svg = `<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="${color}" opacity="0.95"/>
    <circle cx="16" cy="15" r="9" fill="white" opacity="0.95"/>
    <text x="16" y="19" font-size="${label.length > 2 ? '8' : '10'}" font-weight="bold" text-anchor="middle" fill="${color}" font-family="Arial">${label}</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -35],
    className: ''
  });
}

export default function DecisionMap({
  hospitals = [],
  regionHospitals = [],
  selectedHospitalId,
  center,
  zoom,
  onSelectHospital,
  onOpenHospitalModal
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: center || [31.5204, 74.3587],
      zoom: zoom || 11,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(mapInstance.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

    // Ensure map tiles calibrate after mounting/revealing container
    const timer = setTimeout(() => {
      if (mapInstance.current) {
        mapInstance.current.invalidateSize();
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update center when region changes
  useEffect(() => {
    if (mapInstance.current && center) {
      mapInstance.current.setView(center, zoom || 11, { animate: true });
      setTimeout(() => mapInstance.current?.invalidateSize(), 150);
    }
  }, [center, zoom]);

  // Update markers when hospitals or selection changes
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove old markers
    markersRef.current.forEach(m => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    // Decide which list of hospitals to render:
    // If triage evaluated list has items, use that; otherwise use static region hospitals
    const displayList = hospitals && hospitals.length > 0 ? hospitals : (regionHospitals || []);
    if (displayList.length === 0) return;

    const isTriageMode = hospitals && hospitals.length > 0;

    displayList.forEach((h, i) => {
      const isSelected = selectedHospitalId === h.id;

      let color, label;
      if (isTriageMode) {
        color = h.isBypass ? '#ef4444' : (i === 0 ? '#00897B' : '#134074');
        label = h.isBypass ? '✕' : `${i + 1}`;
      } else {
        color = h.sector === 'Public' ? '#0284c7' :
                h.sector === 'Military' ? '#d97706' :
                h.sector?.includes('Trust') ? '#059669' : '#7c3aed';
        label = h.sector === 'Public' ? 'PUB' : (h.sector === 'Private' ? 'PVT' : 'H');
      }

      const marker = L.marker([h.lat, h.lon], {
        icon: createMarkerIcon(color, label)
      });

      const bedsAvail = h.bedsAvailable ?? (h.totalErBeds - h.occupiedErBeds);
      const occupancy = h.occupancyPercent ?? Math.round((h.occupiedErBeds / h.totalErBeds) * 100);

      const popupHtml = `
        <div style="font-family: 'Outfit', sans-serif; min-width: 220px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 0.68rem; font-weight: 700; color: ${color}; text-transform: uppercase;">
              ${h.sector || 'Hospital'} · ${h.city || 'Punjab'}
            </span>
            ${isTriageMode ? `<span style="font-size: 0.7rem; font-weight: 800; color: ${h.isBypass ? '#ef4444' : '#00897B'}">Rank #${i + 1}</span>` : ''}
          </div>
          <div style="font-weight: 700; font-size: 0.9rem; color: #0B2545; margin-bottom: 4px; line-height: 1.2;">
            ${h.shortName || h.name}
          </div>
          <div style="font-size: 0.72rem; color: #64748b; margin-bottom: 8px;">${h.type}</div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.74rem; margin-bottom: 8px; background: #f8fafc; padding: 6px 8px; borderRadius: 4px;">
            <div>
              <div style="color: #64748b; font-size: 0.68rem;">ER Beds Free</div>
              <strong style="color: #0B2545">${bedsAvail} / ${h.totalErBeds}</strong>
            </div>
            <div>
              <div style="color: #64748b; font-size: 0.68rem;">Offload Queue</div>
              <strong style="color: #0B2545">${h.offloadDelayMins} mins</strong>
            </div>
          </div>

          ${isTriageMode && h.isBypass ? `<div style="color: #dc2626; font-size: 0.73rem; font-weight: 600; margin-bottom: 6px;">⛔ BYPASS — Missing: ${h.missingResources.join(', ')}</div>` : ''}

          ${isTriageMode && !h.isBypass ? `
            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <span style="font-size: 1.15rem; font-weight: 800; color: #00897B; font-family: 'JetBrains Mono', monospace;">
                  ${h.ttdc} min
                </span>
                <span style="font-size: 0.68rem; color: #94a3b8; margin-left: 4px;">TTDC</span>
              </div>
              <span style="font-size: 0.7rem; color: #64748b;">Transit: ${h.transitMins}m</span>
            </div>
          ` : `
            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.72rem; color: #64748b;">NEDOCS: <strong>${h.nedocsScore}</strong></span>
              <span style="font-size: 0.7rem; font-weight: 700; color: #00897B;">Click to Inspect</span>
            </div>
          `}
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 290
      });

      marker.on('click', () => {
        if (onSelectHospital) onSelectHospital(h.id);
        if (onOpenHospitalModal) onOpenHospitalModal(h);
      });

      if (isSelected) {
        marker.openPopup();
      }

      marker.addTo(mapInstance.current);
      markersRef.current.push(marker);
    });

    // If there's a selected hospital, pan to it
    if (selectedHospitalId) {
      const selected = displayList.find(h => h.id === selectedHospitalId);
      if (selected) {
        mapInstance.current.setView([selected.lat, selected.lon], 13, { animate: true });
      }
    }
  }, [hospitals, regionHospitals, selectedHospitalId]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '450px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}
    />
  );
}
