import React from "react";
import styles from "./resourceSectionItem.module.scss";

import { ResourceToken } from "src/pages/game/items/Items";
import { shopping_cart, return_button } from "src/assets";

interface IResourceSectionItem {
  type:
    | "air_three"
    | "air_eight"
    | "food_three"
    | "food_eight"
    | "mineral_three"
    | "mineral_eight";
  text: string;
  onBuyClick: React.MouseEventHandler<HTMLButtonElement>;
  onSellClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
}

const ResourceSectionItem: React.FC<IResourceSectionItem> = ({
  type,
  text,
  onBuyClick,
  onSellClick,
  isActive,
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.item_control}>
        <button
          onClick={onBuyClick}
          className={`${styles.item_control__btn} ${styles.btn_buy}`}
          disabled={!isActive}
        >
          {/* buy */}
          <img src={shopping_cart} alt="shopping cart" />
        </button>
        <button
          onClick={onSellClick}
          className={`${styles.item_control__btn} ${styles.btn_sell}`}
          disabled={!isActive}
        >
          {/* sell */}
          <img src={return_button} alt="return button" />
        </button>
      </div>
      <ResourceToken type={type} text={text} />
    </div>
  );
};
export default ResourceSectionItem;
