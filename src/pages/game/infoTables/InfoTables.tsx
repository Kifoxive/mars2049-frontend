import React, { useState } from "react";
import styles from "./infoTables.module.scss";

import { IPlayerColor } from "../types";
import CostsTable from "./costsTable/CostsTable";
import { factory, mission, tokens } from "src/assets";
import BuyTokens from "./buyTokens/BuyTokens";

interface IInfoTables {
  color: IPlayerColor;
  buyToken: Function;
  sellToken: Function;
  isActive: boolean;
}
type views = "pricesTable" | "buyTokens" | "missionCards";

const InfoTables: React.FC<IInfoTables> = ({
  color,
  buyToken,
  sellToken,
  isActive,
}) => {
  const [currentTableView, setCurrentTableView] =
    useState<views>("pricesTable");

  const btnOnclick = (e: any) => {
    e.preventDefault();
    setCurrentTableView(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {currentTableView === "pricesTable" ? (
          <CostsTable
            buildingCosts={{
              air_station: { food: 2, mineral: 2 },
              food_station: { air: 2, mineral: 2 },
              mineral_station: { air: 2, food: 2 },
              base: { air: 3, food: 3, mineral: 3 },
              laboratory: { air: 4, mineral: 3 },
              peaceful_mission: { air: 3, food: 1 },
              agressive_mission: { air: 1, mineral: 3 },
              road: { road_cards: 3 },
              H2O_station: { air: 8, food: 8, mineral: 8 },
            }}
            color={color}
            isActive={isActive}
          />
        ) : currentTableView === "buyTokens" ? (
          <BuyTokens
            color={color}
            buyToken={buyToken}
            sellToken={sellToken}
            isActive={isActive}
          />
        ) : currentTableView === "missionCards" ? (
          <div>missions</div>
        ) : (
          <div>smth else</div>
        )}
      </div>
      <div className={styles.infoTables_control}>
        <div className={styles.infoTables_control__button} onClick={btnOnclick}>
          <button
            value="pricesTable"
            className={
              currentTableView === "pricesTable" ? styles._selected : ""
            }
          >
            <img src={factory} alt="pricesTable" />
          </button>
          <button
            value="buyTokens"
            className={currentTableView === "buyTokens" ? styles._selected : ""}
          >
            <img src={tokens} alt="buyTokens" />
          </button>
          <button
            value="missionCards"
            className={
              currentTableView === "missionCards" ? styles._selected : ""
            }
          >
            <img src={mission} alt="missionCards" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoTables;
