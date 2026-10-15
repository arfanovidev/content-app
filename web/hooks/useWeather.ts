'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { WeatherResponse } from '@/types';

interface Coords {
  lat: number;
  lon: number;
}

const DEFAULT_COORDS: Coords = { lat: 23.8103, lon: 90.4125 }; // Dhaka
const CACHE_KEY = 'weather-coords';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

function loadCachedCoords(): Coords | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.lat === 'number' &&
      typeof parsed?.lon === 'number' &&
      typeof parsed?.savedAt === 'number' &&
      Date.now() - parsed.savedAt < CACHE_TTL
    ) {
      return { lat: parsed.lat, lon: parsed.lon };
    }
  } catch {
    // ignore
  }
  return null;
}

function saveCoords(coords: Coords) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...coords, savedAt: Date.now() }),
    );
  } catch {
    // ignore
  }
}

export function useWeather() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    const cached = loadCachedCoords();
    if (cached) {
      setCoords(cached);
      return;
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setCoords(DEFAULT_COORDS);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        saveCoords(next);
        setCoords(next);
      },
      () => {
        setLocationDenied(true);
        setCoords(DEFAULT_COORDS);
      },
      { timeout: 10000, maximumAge: CACHE_TTL },
    );
  }, []);

  const query = useQuery({
    queryKey: ['weather', coords?.lat, coords?.lon],
    queryFn: async () => {
      if (!coords) return null;
      const res = await api.get<WeatherResponse>(
        `${API_ENDPOINTS.WEATHER}?lat=${coords.lat}&lon=${coords.lon}`,
      );
      return res.data;
    },
    enabled: !!coords,
    staleTime: 10 * 60 * 1000,
  });

  return {
    ...query,
    locationDenied,
    hasCoords: !!coords,
  };
}