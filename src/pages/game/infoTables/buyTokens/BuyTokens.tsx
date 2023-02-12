import React from "react";
import styles from "./buyTokens.module.scss";

import ResourceSectionItem from "./resourceSectionItem/ResourceSectionItem";

interface IBuyTokens {
  color: "green" | "orange" | "pink" | "blue";
  buyToken: Function;
  sellToken: Function;
  isActive: boolean;
}

const BuyTokens: React.FC<IBuyTokens> = ({
  color,
  buyToken,
  sellToken,
  isActive,
}) => {
  const onBuyClick = () => {};

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <h3>Buy tokens</h3>
      <div className={styles.wrapper}>
        <div className={styles.resource_section}>
          <ResourceSectionItem
            type={"air_three"}
            text={"3"}
            onBuyClick={() => buyToken("air", "three")}
            onSellClick={() => sellToken("air", "three")}
            isActive={isActive}
          />
          <ResourceSectionItem
            type={"air_eight"}
            text={"8"}
            onBuyClick={() => buyToken("air", "eight")}
            onSellClick={() => sellToken("air", "eight")}
            isActive={isActive}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.resource_section}>
          <ResourceSectionItem
            type={"food_three"}
            text={"3"}
            onBuyClick={() => buyToken("food", "three")}
            onSellClick={() => sellToken("food", "three")}
            isActive={isActive}
          />
          <ResourceSectionItem
            type={"food_eight"}
            text={"8"}
            onBuyClick={() => buyToken("food", "eight")}
            onSellClick={() => sellToken("food", "eight")}
            isActive={isActive}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.resource_section}>
          <ResourceSectionItem
            type={"mineral_three"}
            text={"3"}
            onBuyClick={() => buyToken("mineral", "three")}
            onSellClick={() => sellToken("mineral", "three")}
            isActive={isActive}
          />
          <ResourceSectionItem
            type={"mineral_eight"}
            text={"8"}
            onBuyClick={() => buyToken("mineral", "eight")}
            onSellClick={() => sellToken("mineral", "eight")}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyTokens;
