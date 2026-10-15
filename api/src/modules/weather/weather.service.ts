import { Injectable, Logger, BadRequestException } from '@nestjs/common';

export interface WeatherResponse {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  clouds: number;
  sunrise: number;
  sunset: number;
  fetchedAt: string;
}

interface CacheEntry {
  data: WeatherResponse;
  expiresAt: number;
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  private get apiKey(): string {
    const key = process.env.OPENWEATHER_KEY;
    if (!key) {
      throw new BadRequestException('OPENWEATHER_KEY not configured');
    }
    return key;
  }

  async getByCoords(
    lat: number,
    lon: number,
    units: string = 'metric',
  ): Promise<WeatherResponse> {
    if (!lat || !lon) {
      throw new BadRequestException('lat and lon are required');
    }

    // Validate ranges
    if (lat < -90 || lat > 90) {
      throw new BadRequestException('lat must be between -90 and 90');
    }
    if (lon < -180 || lon > 180) {
      throw new BadRequestException('lon must be between -180 and 180');
    }

    const cacheKey = `${lat.toFixed(2)}:${lon.toFixed(2)}:${units}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      this.logger.log(`Cache hit: ${cacheKey}`);
      return cached.data;
    }

    this.logger.log(`Fetching weather for ${lat}, ${lon}`);

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const errorText = await res.text();
        this.logger.error(`OpenWeather error: ${res.status} ${errorText}`);
        throw new BadRequestException(
          `Weather API error: ${res.status}`,
        );
      }

      const raw: any = await res.json();

      const weather: WeatherResponse = {
        city: raw.name,
        country: raw.sys?.country,
        temperature: raw.main?.temp,
        feelsLike: raw.main?.feels_like,
        humidity: raw.main?.humidity,
        pressure: raw.main?.pressure,
        description: raw.weather?.[0]?.description,
        icon: raw.weather?.[0]?.icon,
        windSpeed: raw.wind?.speed,
        clouds: raw.clouds?.all,
        sunrise: raw.sys?.sunrise,
        sunset: raw.sys?.sunset,
        fetchedAt: new Date().toISOString(),
      };

      // Save to cache
      this.cache.set(cacheKey, {
        data: weather,
        expiresAt: Date.now() + this.CACHE_TTL,
      });

      return weather;
    } catch (error) {
      this.logger.error(`Failed to fetch weather:`, error);
      throw error;
    }
  }
}
