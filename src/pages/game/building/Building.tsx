import React from "react";
import styles from "./building.module.scss";

import { IBuilding } from "../types";
import { useAppSelector } from "src/redux/store";

const Building: React.FC<IBuilding> = ({
  building,
  owner,
  color,
  y,
  x,
  rotateDeg = 0,
}) => {
  return (
    <div
      className={styles.building}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <div
        className={`${styles.building__wrapper} ${styles[color]} ${styles[building]}`}
        style={{
          transform: `rotate(${rotateDeg}deg)`,
        }}
      />
    </div>
  );
};

interface IPossiblyBuildingPlace {
  y: number;
  x: number;
  indexP: number;
  indexM: number;
  addBuilding: Function;
  text?: string;
}

export const PossiblyBuildingPlace: React.FC<IPossiblyBuildingPlace> = ({
  y,
  x,
  indexP,
  indexM,
  addBuilding,
  text,
}) => {
  const { desiredBuilding } = useAppSelector((state) => state.game);

  return (
    <div
      onClick={() => addBuilding(desiredBuilding, indexP, indexM)}
      className={styles.poss_build}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      +
    </div>
  );
};

export default Building;
