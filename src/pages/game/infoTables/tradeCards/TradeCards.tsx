import React from "react";
import styles from "./tradeCards.module.scss";

import { SmallResourceCard } from "../../items/Items";

interface ITradeCards {
  color: "green" | "orange" | "pink" | "blue";
  tradeCards: Function;
  exchangeRate: number;
}

const TradeCards: React.FC<ITradeCards> = ({
  color,
  tradeCards,
  exchangeRate,
}) => {
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <h3>Trade cards</h3>
      <div className={styles.wrapper}>
        <div className={styles.trade_section}>
          <p className={styles.exchange_rate}>
            exchange rate: <i>{exchangeRate}</i>
          </p>
        </div>
        <div className={styles.trade_section}>
          <SmallResourceCard resource={"air"} />
          <button onClick={() => tradeCards("air", "food")}>→</button>
          <button onClick={() => tradeCards("food", "air")}>←</button>
          <SmallResourceCard resource={"food"} />
        </div>
        <div className={styles.trade_section}>
          <SmallResourceCard resource={"air"} />
          <button onClick={() => tradeCards("air", "mineral")}>→</button>
          <button onClick={() => tradeCards("mineral", "air")}>←</button>
          <SmallResourceCard resource={"mineral"} />
        </div>

        <div className={styles.trade_section}>
          <SmallResourceCard resource={"food"} />
          <button onClick={() => tradeCards("food", "mineral")}>→</button>
          <button onClick={() => tradeCards("mineral", "food")}>←</button>
          <SmallResourceCard resource={"mineral"} />
        </div>
      </div>
    </div>
  );
};

export default TradeCards;
