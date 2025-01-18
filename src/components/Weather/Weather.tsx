'use client';
import React, { useEffect, useState } from 'react';
import { BsMoon, BsSun } from "react-icons/bs";
import Sidebar from '../Sidebar/Sidebar';

interface WeatherCurrent {
  temp_c: number;
  feelslike_c: number;
  pressure_mb: number;
  humidity: number;
  wind_kph: number;
  visibility_km: number;
  condition: { text: string; icon: string };
  is_day: number;
}

interface WeatherForecastDay {
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: { text: string; icon: string };
    astro: {
      sunrise: string;
      sunset: string;
    };
  };
  hour: {
    time_epoch: number;
    temp_c: number;
    condition: { text: string; icon: string };
  }[];
}

interface WeatherData {
  current: WeatherCurrent;
  forecast: {
    forecastday: WeatherForecastDay[];
  };
}

const conditionTranslations: Record<string, string> = {
  "Clear ": "Ясно",
  "Partly Cloudy ": "Частично облачно",
  "Partly cloudy": "Частично облачно",
  "Cloudy ": "Облачно",
  "Overcast ": "Пасмурно",
  "Overcast": "Пасмурно",
  "Rain": "Дождь",
  "Thunderstorm": "Гроза",
  "Snow": "Снег",
  "Light drizzle": "Легкий дождь",
  "Light snow": "Легкий снег",
};

const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Москва');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e9cb10b01e4a475b8be64921251501&q=${selectedCity}&days=7`);

        if (!response.ok) {
          throw new Error('Ошибка при получении данных о погоде');
        }

        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  if (loading) {
    return <div className='text-[50px] flex justify-center mt-48'>Загрузка...</div>;
  }

  if (error) {
    return <div className='text-[50px] flex justify-center mt-48'>Ошибка: {error}</div>;
  }

  const getDayOfWeek = (epoch: number): string => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  };
  const currentConditionText = weatherData?.current?.condition?.text
    ? conditionTranslations[weatherData.current.condition.text.trim()] || weatherData.current.condition.text
    : "Нет данных о состоянии";

  return (
    <section className='flex justify-center mt-10 font-signika'>
      <div>
        <h1 className='text-[28px] sm:text-[40px] xl:text-[50px] flex justify-center'>{selectedCity}, Россия</h1>

        <Sidebar
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
        />

        {weatherData && (
          <div className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[50px] sm:text-[70px] xl:text-[100px] my-5 flex flex-row justify-center items-center'>
              {weatherData.current.is_day === 1 ? (
                <BsSun className='w-15 h-15 text-yellow-300 mr-5' />
              ) : (
                <BsMoon className='w-15 h-15 text-yellow-300 mr-5' />
              )}
              {Math.round(weatherData.current.temp_c)}°C
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-center gap-16 text-[20px] mb-10 sm:mb-1 mt-10'>
              <span>
                <p>По ощущениям: {Math.round(weatherData.current.feelslike_c)}°C</p>
                <p>Состояние: {currentConditionText}</p>
              </span>
              <span>
                <p>Ветер: {(weatherData.current.wind_kph * 1000 / 3600).toFixed(1)} м/с</p>
                <p>Давление: {weatherData.current.pressure_mb} гПа</p>
              </span>
              <span>
                <p>Влажность: {weatherData.current.humidity}%</p>
                <p>Видимость: {weatherData.current.visibility_km} км</p>
              </span>
            </div>
            <hr className='w-[250px] sm:w-[500px] xl:w-[700px] h-[1px] my-10 flex justify-center' />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 p-5'>
              {weatherData.forecast.forecastday.slice(1, 7).map((day) => ( // Начинаем с завтрашнего дня
                <div key={day.date_epoch} className='border p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
                  <h2 className='font-bold'>{getDayOfWeek(day.date_epoch)}</h2>
                  <div className='flex flex-row items-center'>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} className='w-10 h-10 mr-3' />
                    <p className='text-[20px] mr-3'>{Math.round(day.hour[7].temp_c)}°</p>
                    <p className='text-gray-400'>{Math.round(day.hour[20].temp_c)}°</p>
                  </div>
                  <p>{conditionTranslations[day.day.condition.text] || day.day.condition.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;