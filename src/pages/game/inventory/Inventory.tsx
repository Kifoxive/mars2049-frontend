import React from "react";
import styles from "./inventory.module.scss";

import { ResourceCard, ResourceToken } from "../items/Items";
import { IPlayerColor } from "../types";

interface ICardStack {
  count: number;
  resource: "air" | "food" | "mineral" | "road_cards";
}

const CardStack: React.FC<ICardStack> = ({
  count,
  resource,
}): React.ReactElement<typeof ResourceCard[]> => {
  const stack = [];
  for (let i = 0; i < count; i++) {
    stack.push(<ResourceCard resource={resource} key={i} shift={i} />);
  }
  return (
    <div className={styles.card_stack} style={{ zIndex: 10 }}>
      {stack}
    </div>
  );
};

interface ITokenStack {
  count: number;
  type:
    | "air_three"
    | "air_eight"
    | "food_three"
    | "food_eight"
    | "mineral_three"
    | "mineral_eight";
  text: string;
}

const TokenStack: React.FC<ITokenStack> = ({
  count,
  type,
  text,
}): React.ReactElement<typeof ResourceToken[]> => {
  const stack = [];
  for (let i = 0; i < count; i++) {
    stack.push(<ResourceToken type={type} key={i} text={text} shift={i} />);
  }
  return (
    <div className={styles.token_stack} style={{ zIndex: 10 }}>
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
  color: IPlayerColor;
}

const Inventory: React.FC<IInventory> = ({
  cards,
  resource_tokens,
  mission_cards,
  road_cards,
  color,
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

  const tokens = {
    three: 3,
    eight: 8,
  };

  const air_three_stack = TokenStack({
    count: resource_tokens.air.three,
    type: "air_three",
    text: String(tokens.three),
  });
  const air_eight_stack = TokenStack({
    count: resource_tokens.air.eight,
    type: "air_eight",
    text: String(tokens.eight),
  });

  const food_three_stack = TokenStack({
    count: resource_tokens.food.three,
    type: "food_three",
    text: String(tokens.three),
  });
  const food_eight_stack = TokenStack({
    count: resource_tokens.food.eight,
    type: "food_eight",
    text: String(tokens.eight),
  });

  const mineral_three_stack = TokenStack({
    count: resource_tokens.mineral.three,
    type: "mineral_three",
    text: String(tokens.three),
  });
  const mineral_eight_stack = TokenStack({
    count: resource_tokens.mineral.eight,
    type: "mineral_eight",
    text: String(tokens.eight),
  });

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles[color]}`}>
        <div className={styles.token_group}>
          {mineral_eight_stack}
          {mineral_three_stack}
        </div>
        <div className={styles.token_group}>
          {food_eight_stack}
          {food_three_stack}
        </div>
        <div className={styles.token_group}>
          {air_eight_stack}
          {air_three_stack}
        </div>
        {road_cards_stack}
        {mineral_stack}
        {food_stack}
        {air_stack}
      </div>
    </div>
  );
};

export default Inventory;
