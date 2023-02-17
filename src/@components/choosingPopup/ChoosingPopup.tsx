import React, { useState } from "react";
import styles from "./choosingPopup.module.scss";

import { discovery, robbery } from "src/assets";
import { ResourceCard } from "../../pages/game/items/Items";
import { IGameData } from "src/pages/game/types";

interface IChoosingPopup {
  type: "discovery" | "robbery";
  submitAction: Function;
  gameData?: IGameData;
  playerName?: string;
}

const ChoosingPopup: React.FC<IChoosingPopup> = ({
  type,
  submitAction,
  gameData,
  playerName,
}) => {
  const [opponentName, setOpponentName] = useState<string | null>(null);
  const [opponentCards, setOpponentCards] = useState<{
    air: number;
    food: number;
    mineral: number;
  } | null>(null);

  React.useEffect(() => {
    if (gameData && opponentName) {
      /* @ts-ignore because object can contain more values (users) */
      setOpponentCards(gameData.playersObj[opponentName].cards);
    }
  }, [opponentName]);

  const onDiscoverySelectCard = (
    resource: "air" | "food" | "mineral" | "road_cards"
  ) => {
    submitAction({ type, resource });
  };

  const onRobberySelectCard = (resource: "air" | "food" | "mineral") => {
    submitAction({ type, resource, opponentName });
  };

  if (type === "discovery") {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            Discovery <img src={discovery} alt="discovery" />
          </h3>
          <p className={styles.description}>
            Receive 1 card of any resource type, or road
          </p>
          <div className={styles.wrapper__discovery}>
            <ResourceCard
              resource="air"
              alone={true}
              onClick={() => onDiscoverySelectCard("air")}
            />
            <ResourceCard
              resource="food"
              alone={true}
              onClick={() => onDiscoverySelectCard("food")}
            />
            <ResourceCard
              resource="mineral"
              alone={true}
              onClick={() => onDiscoverySelectCard("mineral")}
            />
            <ResourceCard
              resource="road_cards"
              alone={true}
              onClick={() => onDiscoverySelectCard("road_cards")}
            />
          </div>
        </div>
      </div>
    );
  } else if (type === "robbery" && gameData) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            Robbery <img src={robbery} alt="discovery" />
          </h3>
          <p className={styles.description}>
            Choose an opponent and draw a card from him/her
          </p>
          <div className={styles.wrapper__robbery}>
            <ul>
              {gameData.playersNames.map((name) => {
                //   @ts-ignore because object can container more value (users)
                const playerColor = gameData.playersColors[name];
                return name === playerName ? null : (
                  <li
                    //   className={`${name === opponentName && styles._selected}`}
                    key={name}
                  >
                    <button
                      onClick={() => {
                        setOpponentName(name);
                      }}
                      className={`${styles[playerColor]} ${
                        name === opponentName && styles._selected
                      }`}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
            {opponentName && opponentCards && (
              <div className={styles.cards_box}>
                {opponentCards.air > 0 && (
                  <ResourceCard
                    resource="air"
                    alone={true}
                    onClick={() => onRobberySelectCard("air")}
                  />
                )}
                {opponentCards.food > 0 && (
                  <ResourceCard
                    resource="food"
                    alone={true}
                    onClick={() => onRobberySelectCard("food")}
                  />
                )}
                {opponentCards.mineral > 0 && (
                  <ResourceCard
                    resource="mineral"
                    alone={true}
                    onClick={() => onRobberySelectCard("mineral")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else return <div>ChoosingPopup</div>;
};

export default ChoosingPopup;
