"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = {
    "File search": "file-search",
    "CPT calculation": "cpt-calculation",
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Explore Generative AI usage in Geotechnical
      </div>
      <div className={styles.container}>
        {Object.entries(categories).map(([name, url]) => (
          <a key={name} className={styles.category} href={`/pages/${url}`}>
            {name}
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;