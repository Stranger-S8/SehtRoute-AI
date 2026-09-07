import { HEALTHCARE_REGIONS } from '../data/hospitalsData';

/**
 * Evaluates TTDC for each hospital against a parsed patient requirement.
 * Returns hospitals sorted by TTDC score (lowest first = best choice).
 */
export function evaluateHospitals(regionKey, parsedTriage, trafficMultiplier = 1.0) {
  const region = HEALTHCARE_REGIONS[regionKey];
  if (!region) return [];

  const requiredResources = (parsedTriage.mandatory_facilities || []).map(f =>
    f.toLowerCase().replace(/\s+/g, '_')
  );

  return region.hospitals.map(hospital => {
    // 1. T_transit
    const transitMins = Math.round(hospital.baseTransitMins * trafficMultiplier);

    // 2. T_offload
    const offloadMins = hospital.offloadDelayMins;

    // 3. P_capacity: check if ALL mandatory resources are available
    let capacityPenalty = 0;
    let missingResources = [];

    for (const req of requiredResources) {
      const normalized = req.replace(/\s+/g, '_');
      let available = false;

      // Map parsed facility names to hospital resource keys
      if (normalized.includes('cath_lab') || normalized.includes('catheterization')) {
        available = hospital.activeResources.cath_lab === true;
      } else if (normalized.includes('ventilator') || normalized.includes('mechanical_ventilator')) {
        available = (hospital.activeResources.mechanical_ventilator || 0) > 0;
      } else if (normalized.includes('icu') || normalized.includes('icu_bed') || normalized.includes('cardiac_icu')) {
        available = (hospital.activeResources.tertiary_icu_bed || 0) > 0;
      } else if (normalized.includes('trauma') || normalized.includes('trauma_bay')) {
        available = (hospital.activeResources.level1_trauma_bay || 0) > 0;
      } else if (normalized.includes('ct') || normalized.includes('ct_scanner')) {
        available = hospital.activeResources.ct_scanner === true;
      } else if (normalized.includes('stroke') || normalized.includes('stroke_suite')) {
        available = hospital.activeResources.stroke_suite === true;
      } else if (normalized.includes('burn')) {
        // Most general hospitals don't have burn units
        available = false;
      } else if (normalized.includes('defibrillator') || normalized.includes('blood_bank') ||
                 normalized.includes('basic') || normalized.includes('emergency') ||
                 normalized.includes('oxygen') || normalized.includes('diagnostic')) {
        available = true; // assume basic equipment is available
      } else if (normalized.includes('pediatric')) {
        available = (hospital.activeResources.tertiary_icu_bed || 0) > 0;
      } else {
        available = true; // unknown resource, assume available
      }

      if (!available) {
        capacityPenalty = Infinity;
        missingResources.push(req.replace(/_/g, ' '));
      }
    }

    // Total TTDC
    const ttdc = capacityPenalty === Infinity ? Infinity : transitMins + offloadMins;
    const isBypass = capacityPenalty === Infinity;

    // Bed/ward availability
    const bedsAvailable = Math.max(0, hospital.totalErBeds - hospital.occupiedErBeds);
    const occupancyPercent = Math.round((hospital.occupiedErBeds / hospital.totalErBeds) * 100);

    return {
      ...hospital,
      transitMins,
      offloadMins,
      capacityPenalty,
      ttdc,
      isBypass,
      missingResources,
      bedsAvailable,
      occupancyPercent,
      statusLabel: isBypass ? 'BYPASS' : (ttdc <= 20 ? 'OPTIMAL' : (ttdc <= 40 ? 'AVAILABLE' : 'DELAYED')),
      statusColor: isBypass ? 'red' : (ttdc <= 20 ? 'green' : (ttdc <= 40 ? 'navy' : 'amber'))
    };
  }).sort((a, b) => a.ttdc - b.ttdc);
}

/**
 * Generate a reservation token ID.
 */
export function generateReservationToken(hospitalId) {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `SR-LCK-${rand}-${hospitalId.toUpperCase().replace(/-/g, '')}`;
}
