"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import { cptReduce } from "../../utils/cpt_reduce";
import { cptFooting } from "../../utils/cpt_footing";
import FileManager from "../../components/file-manager";
import { cptLcpc } from "../../utils/cpt_lcpc";

const FunctionCalling = () => {
  const [outputData, setOutputData] = useState("");

  const functionCallHandler = async (call) => {
    if (call?.function?.name === "cpt_calculation") {
      try {
        const args = JSON.parse(call.function.arguments);
        const reduced_data = await cptReduce(JSON.stringify(args));
        const footing_data = await cptFooting(JSON.stringify(args));
        const lcpc_data = await cptLcpc(JSON.stringify(args));
        const data = JSON.stringify({ reduced_data, footing_data, lcpc_data });
        setOutputData(data);
        return data;
      } catch (error) {
        console.error("CPT data calcultion failed:", error);
        return JSON.stringify({ error: "CPT data calculation failed" });
      }
    }
    else if (call?.function?.name === "reduce_cpt_data") {
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
    else if (call?.function?.name === "cpt_lcpc") {
      try {
        const args = JSON.parse(call.function.arguments);
        const data = await cptLcpc(JSON.stringify(args));
        setOutputData(data);
        return data;
      } catch (error) {
        console.error("CPT data LCPC method failed:", error);
        return JSON.stringify({ error: "CPT data LCPC method failed" });
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
        <div className={styles.column}>
          <FileManager />
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;