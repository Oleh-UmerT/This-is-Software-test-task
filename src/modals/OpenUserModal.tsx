import { Users } from "@/types/user";
import React, { FC } from "react";
import Modal from "react-modal";
import { useGetWeather } from "@/hooks/useGetWeather";
import { WEATHER_CODE_MAP } from "@/constants/weather-constants";

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

const UserModal: FC<UserModalProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  console.log(data);
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
          width: 558,
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
        },
      }}
    >
      <h1 className="text-black">{data.name.first}</h1>
      <h2 className="text-black">
        {weather?.current_weather.temperature}{" "}
        {weather?.current_weather_units.temperature} {weatherDescription}
      </h2>
    </Modal>
  );
};

export default UserModal;
