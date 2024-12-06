"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "./components/chat";
import WeatherWidget from "./components/weather-widget";
import { getWeather } from "./utils/weather";
import { cptReduce } from "./utils/cpt_reduce";
import FileViewer from "./components/file-viewer";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});
  const [outputData, setOutputData] = useState("");

  const functionCallHandler = async (call) => {
    if (call?.function?.name === "get_weather") {
      const args = JSON.parse(call.function.arguments);
      const data = getWeather(args.location);  
      setWeatherData(data);
      return JSON.stringify(data);
    } else if (call?.function?.name === "reduce_cpt_data") {
      try {
        const args = JSON.parse(call.function.arguments);
        const data = await cptReduce(JSON.stringify(args));
        setOutputData(data);
        return data;
      } catch (error) {
        console.error("CPT data reduction failed:", error);
        return JSON.stringify({ error: "CPT data reduction failed" });
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget {...weatherData} />
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;