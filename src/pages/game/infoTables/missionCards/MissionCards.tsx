import React from "react";
import styles from "./missionCards.module.scss";

interface IMissionCards {
  color: "green" | "orange" | "pink" | "blue";
}

const MissionCards: React.FC<IMissionCards> = ({ color }) => {
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <h3>Mission cards</h3>
      <div className={styles.wrapper}>
        <div className={styles.resource_section}>coming soon!</div>
      </div>
    </div>
  );
};

export default MissionCards;
