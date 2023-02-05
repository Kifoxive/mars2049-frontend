import React from "react";
import styles from "./inventory.module.scss";

import { ResourceCard } from "../items/Items";

interface ICardStock {
  count: number;
  resource: "air" | "food" | "mineral" | "road_cards";
}

const CardStack: React.FC<ICardStock> = ({
  count,
  resource,
}): React.ReactElement<typeof ResourceCard[]> => {
  const stack = [];
  for (let i = 0; i < count; i++) {
    stack.push(<ResourceCard resource={resource} key={i} shift={i} />);
  }
  return (
    <div className={styles.card_group} style={{ zIndex: 10 }}>
      {stack}
    </div>
  );
};

interface IInventory {
  cards: {
    air: number;
    food: number;
    mineral: number;
  };
  resource_tokens: {
    air: {
      three: number;
      eight: number;
    };
    food: {
      three: number;
      eight: number;
    };
    mineral: {
      three: number;
      eight: number;
    };
  };
  mission_cards: {
    peaceful_mission: Object[];
    agressive_mission: Object[];
  };
  road_cards: number;
}

const Inventory: React.FC<IInventory> = ({
  cards,
  resource_tokens,
  mission_cards,
  road_cards,
}) => {
  const { air, food, mineral } = cards;

  const air_stack = CardStack({
    count: air,
    resource: "air",
  });
  const food_stack = CardStack({
    count: food,
    resource: "food",
  });
  const mineral_stack = CardStack({
    count: mineral,
    resource: "mineral",
  });
  const road_cards_stack = CardStack({
    count: road_cards,
    resource: "road_cards",
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {road_cards_stack}
        {air_stack}
        {food_stack}
        {mineral_stack}
      </div>
    </div>
  );
};

export default Inventory;
