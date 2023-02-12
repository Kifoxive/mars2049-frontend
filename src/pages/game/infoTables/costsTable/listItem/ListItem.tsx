import React from "react";
import styles from "./listItem.module.scss";

import { SmallResourceCard } from "../../../items/Items";
import { IUserData } from "../../../types";

interface IListItem {
  text: string;
  pricing: {
    air?: number;
    food?: number;
    mineral?: number;
    road_cards?: number;
  };
  building:
    | "air_station"
    | "food_station"
    | "mineral_station"
    | "base"
    | "laboratory"
    | "peaceful_mission"
    | "agressive_mission"
    | "road"
    | "H2O_station";
  selected: boolean;
  setDesiredBuilding: Function;
  color: IUserData["color"];
}

const ListItem: React.FC<IListItem> = ({
  text,
  pricing,
  building,
  selected,
  setDesiredBuilding,
  color,
}) => {
  const pricingCards = Object.keys(pricing) as (keyof typeof pricing)[];

  const onSetDesiredBuildingClick = () => {
    setDesiredBuilding(building);
  };

  return (
    <li className={styles.list_item}>
      <div className={styles.list_item__text}>
        <p
          className={`${styles.badge} ${selected ? styles[color] : ""} ${
            styles.color
          }`}
        />
        <span className={`${selected ? styles[color] : ""} ${styles.color}`}>
          {text}
        </span>
      </div>
      <div className={styles.list_item__costs}>
        {pricingCards.map((priceGroup, index) => {
          //  return <div key={index}></div>;
          const groupCards: React.ReactElement<typeof SmallResourceCard>[] = [];
          const cardsCount = pricing[priceGroup];
          // it`s definitely a number
          //  @ts-ignore
          if (cardsCount > 4)
            return (
              <div className={styles.overflow_container} key={index}>
                <span className={styles.overflow_container__number}>
                  {cardsCount}x
                </span>
                <SmallResourceCard resource={priceGroup} />
              </div>
            );
          // it definitely includes at least one of them
          //  @ts-ignore
          for (let i = 0; i < cardsCount; i++) {
            groupCards.push(
              <SmallResourceCard key={i} resource={priceGroup} />
            );
          }
          return groupCards;
        })}
      </div>
    </li>
  );
};

export default ListItem;
