import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';

export interface EarthquakeEvent {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number | null;
    url: string;
    detail: string;
    felt: number | null;
    cdi: number | null;
    mmi: number | null;
    alert: string | null;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number | null;
    dmin: number | null;
    rms: number | null;
    gap: number | null;
    magType: string;
    type: string;
    title: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
}

export async function fetchEarthquakeData(): Promise<EarthquakeEvent[]> {
  try {
    // Fetch Myanmar GeoJSON strictly
    // We downloaded the GeoJSON locally to bypass Cloudflare blocking the direct request
    const myanmarRes = await fetch(`${import.meta.env.BASE_URL}myanmar.geojson`);
    
    if (!myanmarRes.ok) {
      throw new Error(`Failed to fetch Myanmar boundary GeoJSON. Status: ${myanmarRes.status}`);
    }
    
    const text = await myanmarRes.text();
    let myanmarGeoJson;
    try {
      myanmarGeoJson = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse GeoJSON. Response was:", text.substring(0, 200));
      throw new Error('Invalid JSON received for Myanmar boundary.');
    }
    
    if (!myanmarGeoJson || !myanmarGeoJson.features || myanmarGeoJson.features.length === 0) {
      throw new Error('Invalid or empty Myanmar boundary GeoJSON received.');
    }

    // Fetch USGS Data (past 120+ years, min mag 4.0 within bounding box to reduce initial payload)
    // Bounding box roughly covers Myanmar: 9.5 to 28.5 Lat, 92.0 to 101.5 Lon
    const usgsRes = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=9.5&maxlatitude=28.5&minlongitude=92.0&maxlongitude=101.5&starttime=1900-01-01&minmagnitude=4&limit=20000');
    if (!usgsRes.ok) throw new Error('Failed to fetch USGS data');
    const usgsData = await usgsRes.json();

    // Strictly filter USGS Data using Myanmar GeoJSON (True point-in-polygon)
    const filteredFeatures = usgsData.features.filter((feature: any) => {
      const pt = point([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]);
      
      // Check if the earthquake point is inside ANY of the polygons in the Myanmar GeoJSON
      return myanmarGeoJson.features.some((polyFeature: any) => {
        try {
          return booleanPointInPolygon(pt, polyFeature);
        } catch (e) {
          return false;
        }
      });
    });

    return filteredFeatures;
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    throw error;
  }
}
