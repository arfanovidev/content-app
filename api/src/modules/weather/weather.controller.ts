import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lon', ParseFloatPipe) lon: number,
    @Query('units') units: string = 'metric',
  ) {
    return this.weatherService.getByCoords(lat, lon, units);
  }
}
