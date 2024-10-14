import { Users } from "@/types/user";
import React, { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { useGetWeather } from "@/hooks/useGetWeather";
import { WEATHER_CODE_MAP } from "@/constants/weather-constants";
import dynamic from "next/dynamic";
import Image from "next/image";
import TemperatureChart from "@/components/Chart";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface UserModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: Users;
}

const getCurrentWeatherDescription = (
  weatherCode: number | undefined
): string => {
  return weatherCode
    ? WEATHER_CODE_MAP[weatherCode]
    : "Unknown weather condition";
};

const UserModal: FC<UserModalProps> = ({ isOpen, onRequestClose, data }) => {
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [timeArr, setTimeArr] = useState<string[]>([]);
  const [tempArr, setTempArr] = useState<number[]>([]);
  const {
    data: weather,
    loading,
    error,
  } = useGetWeather(
    data?.location.coordinates.longitude,
    data?.location.coordinates.latitude
  );
  console.log(weather);

  const weatherDescription = getCurrentWeatherDescription(
    weather?.current_weather.weathercode
  );

  useEffect(() => {
    const subset = weather?.hourly.temperature_2m.slice(0, 24);
    const hourlySubset = weather?.hourly.time.slice(0, 24);
    if (subset && hourlySubset) {
      setTempArr(subset);
      setTimeArr(hourlySubset);
      const maxValue = Math.max(...subset);
      setMaxTemp(maxValue);
      const minValue = Math.min(...subset);
      setMinTemp(minValue);
    }
  }, [weather]);

  console.log("hours", timeArr);
  console.log("temp", tempArr);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal for Weatcher"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: 1458,
          minHeight: 786,
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px 0px #4B5B6B26",
          padding: "20px",
          overflowX: "auto",
        },
      }}
    >
      {!loading && (
        <div className=" flex flex-col gap-5 w-full">
          {data.location && (
            <Map
              lat={+data.location.coordinates.latitude}
              lng={+data.location.coordinates.longitude}
              customMarkerImage={data.picture.thumbnail}
            />
          )}
          <div className="flex flex-col gap-5 items-center">
            <Image src={weatherDescription} width={40} height={40} alt="" />
            <h2 className="text-black">
              {weather?.current_weather.temperature}{" "}
              {weather?.current_weather_units.temperature}
            </h2>
            <h2 className="text-black">
              Minimum:{" "}
              <span className=" font-semibold">
                {minTemp} {weather?.current_weather_units.temperature}
              </span>
              , Maximum:{" "}
              <span className=" font-semibold">
                {maxTemp} {weather?.current_weather_units.temperature}
              </span>
            </h2>

            <TemperatureChart timeArr={timeArr} tempArr={tempArr} />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
