import React from "react";
import styles from "./listItem.module.scss";

import { SmallResourceCard } from "../../items/Items";
import { useAppDispatch } from "src/redux/store";
import { setDesiredBuilding } from "src/redux/slices/gameSlice";

interface ListItem {
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
}

const ListItem: React.FC<ListItem> = ({ text, pricing, building }) => {
  const pricingCards = Object.keys(pricing) as (keyof typeof pricing)[];
  const dispatch = useAppDispatch();

  const onSetDesiredBuildingClick = () => {
    dispatch(setDesiredBuilding(building));
  };

  return (
    <li className={styles.list_item}>
      <div className={styles.list_item__text}>
        <p className={styles.badge} onClick={onSetDesiredBuildingClick} />
        <span>{text}</span>
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
