import axios from "axios";
import { useState, useEffect } from "react";
import { WeatherData } from "@/types/weather";

export const useGetWeather = (lon: string, lan: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<WeatherData>(
          `https://api.open-meteo.com/v1/forecast?latitude=${lan}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weather_code`
        );
        setData(response.data);
        setError(null);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lan, lon]);

  return { data, loading, error };
};
