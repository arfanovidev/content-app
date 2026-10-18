'use client';

import { useEffect, useState } from 'react';
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudSun,
  Wind,
} from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherSkeleton } from './WeatherSkeleton';

const DISABLED = process.env.NEXT_PUBLIC_DISABLE_WEATHER === 'true';

function pickIcon(iconCode?: string) {
  if (!iconCode) return Cloud;
  const code = iconCode.slice(0, 2);
  switch (code) {
    case '01':
      return Sun;
    case '02':
    case '03':
    case '04':
      return CloudSun;
    case '09':
    case '10':
    case '11':
      return CloudRain;
    case '13':
      return CloudSnow;
    case '50':
      return Wind;
    default:
      return Cloud;
  }
}

export function WeatherWidget() {
  if (DISABLED) return null;

  const { data, isLoading, isError, hasCoords } = useWeather();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <WeatherSkeleton />;
  if (isLoading) return <WeatherSkeleton />;
  if (isError || !hasCoords || !data) return null;

  const Icon = pickIcon(data.icon);
  const temp = Math.round(data.temperature);

  return (
    <div
      className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium"
      title={`${data.city}, ${data.country} — ${data.description}`}
    >
      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
      <span>{temp}°</span>
    </div>
  );
}