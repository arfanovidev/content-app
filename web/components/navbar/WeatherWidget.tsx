'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudSun, Wind } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherSkeleton } from './WeatherSkeleton';
import { useLangStore } from '@/store/langStore';

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
      return CloudRain;
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
  const { data, isLoading, isError, hasCoords, locationDenied } = useWeather();
  const [mounted, setMounted] = useState(false);
  const lang = useLangStore((s) => s.lang);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading || !hasCoords) {
    return <WeatherSkeleton />;
  }

  if (isError || !data) {
    return null;
  }

  const Icon = pickIcon(data.icon);
  const temp = Math.round(data.temperature);
  const city = data.city;

  return (
    <div
      className="hidden items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium sm:flex"
      title={`${city}, ${data.country} — ${data.description}`}
    >
      <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
      <span>{temp}°C</span>
      <span className="hidden max-w-[120px] truncate text-muted-foreground md:inline">
        {city}
      </span>
    </div>
  );
}