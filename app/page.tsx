"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "./components/chat";
import { cptReduce } from "./utils/cpt_reduce";
import { cptFooting } from "./utils/cpt_footing";
import FileViewer from "./components/file-viewer";
import FileManager from "./components/file-manager";

const FunctionCalling = () => {
  const [outputData, setOutputData] = useState("");

  const functionCallHandler = async (call) => {
    if (call?.function?.name === "reduce_cpt_data") {
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
      else if (call?.function?.name === "cpt_data_footing") {
      try {
        const args = JSON.parse(call.function.arguments);
        const data = await cptFooting(JSON.stringify(args));
        setOutputData(data);
        return data;
      } catch (error) {
        console.error("CPT data footing failed:", error);
        return JSON.stringify({ error: "CPT data footing failed" });
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <FileManager />
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