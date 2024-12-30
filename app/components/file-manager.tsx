import React from "react";
import styles from "./file-manager.module.css";
import InputFileManager from "./input-file-manager";
import OutputFileManager from "./output-file-manager";

const FileManager = () => {
  return (
    <div className={styles.fileManager}>
      <InputFileManager />
      <OutputFileManager />
    </div>
  );
};

export default FileManager;