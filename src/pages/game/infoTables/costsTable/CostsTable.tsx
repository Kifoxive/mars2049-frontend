import React from "react";
import styles from "./costsTable.module.scss";

import ListItem from "./listItem/ListItem";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { setDesiredBuilding } from "src/redux/slices/gameSlice";

const itemsNames = {
  air_station: "Air Station",
  food_station: "Food Station",
  mineral_station: "Mineral station",
  base: "Base",
  laboratory: "Laboratory",
  peaceful_mission: "Peaceful Mission",
  agressive_mission: "Agressive Mission",
  road: "Road to H2O station",
  H2O_station: "H2O station",
};

interface ICostsTable {
  color: "green" | "orange" | "pink" | "blue";
  buildingCosts: {
    air_station: { food: number; mineral: number };
    food_station: { air: number; mineral: number };
    mineral_station: { air: number; food: number };
    base: { air: number; food: number; mineral: number };
    laboratory: { air: number; mineral: number };
    peaceful_mission: { air: number; food: number };
    agressive_mission: { air: number; mineral: number };
    road: { road_cards: number };
    H2O_station: { air: number; food: number; mineral: number };
  };
  isActive: boolean;
}

const CostsTable: React.FC<ICostsTable> = ({
  buildingCosts,
  color,
  isActive,
}) => {
  const rows = Object.keys(buildingCosts) as (keyof typeof buildingCosts)[];
  const dispatch = useAppDispatch();
  const desiredBuilding = useAppSelector((state) => state.game.desiredBuilding);

  const onSetDesiredBuildingClick = (building: string) => {
    dispatch(setDesiredBuilding(building));
  };

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
                // @ts-ignore everything is good
                selected={rowName === desiredBuilding}
                color={color}
                setDesiredBuilding={onSetDesiredBuildingClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CostsTable;
