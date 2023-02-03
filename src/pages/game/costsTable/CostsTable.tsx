import React from "react";
import styles from "./costsTable.module.scss";
import ListItem from "./listItem/ListItem";

const itemsNames = {
  air_station: "Air Station",
  food_station: "Food Station",
  mineral_station: "Mineral station",
  base: "Base",
  laboratory: "Laboratory",
  peaceful_mission: "Peaceful Mission",
  agressive_mission: "Agressive Mission",
  roads: "Road to H2O station",
  H2O_station: "H2O station",
};

interface ICostsTable {
  color: "green" | "orange" | "pink" | "blue";
  buildingCosts: {
    air_station: { food: number; mineral: number };
    food_station: { air: number; mineral: number };
    mineral_station: { air: number; mineral: number };
    base: { air: number; food: number; mineral: number };
    laboratory: { air: number; mineral: number };
    peaceful_mission: { air: number; food: number };
    agressive_mission: { air: number; mineral: number };
    roads: { road_cards: number };
    H2O_station: { air: number; food: number; mineral: number };
  };
}

const CostsTable: React.FC<ICostsTable> = ({ buildingCosts, color }) => {
  const rows = Object.keys(buildingCosts) as (keyof typeof buildingCosts)[];

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <h3>Building costs</h3>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {rows.map((rowName, index) => {
            return (
              <ListItem
                key={index}
                text={itemsNames[rowName]}
                pricing={buildingCosts[rowName]}
                building={rowName}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CostsTable;
