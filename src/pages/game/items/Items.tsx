import React, { useState } from "react";
import styles from "./items.module.scss";

interface ISmallResourceCard {
  resource: "air" | "food" | "mineral" | "road_cards";
}

export const SmallResourceCard: React.FC<ISmallResourceCard> = ({
  resource,
}) => {
  return (
    <div className={styles.small_resource_card_}>
      <div
        className={`${styles.small_resource_card__box} ${styles[resource]}`}
      />
    </div>
  );
};

interface IResourceCard {
  resource:
    | "air"
    | "food"
    | "mineral"
    | "peaceful_mission"
    | "agressive_mission"
    | "road_cards";
  shift: number;
}

export const ResourceCard: React.FC<IResourceCard> = ({ resource, shift }) => {
  return (
    <div
      className={styles.resource_card}
      style={{
        top: `${shift * 5}px`,
        left: `${shift * 1.3}px`,
      }}
    >
      <div className={`${styles.resource_card__box} ${styles[resource]}`}></div>
    </div>
  );
};

interface IToken {
  type: {
    air: "three" | "eight";
    food: "three" | "eight";
    mineral: "three" | "eight";
  };
}

export const Token: React.FC<IToken> = ({ type }) => {
  return (
    <div className={styles.token}>
      <div className={styles.token__box}></div>
    </div>
  );
};

interface IDice {
  setDiceSymbol: Function;
}

export const Dice: React.FC<IDice> = ({ setDiceSymbol }) => {
  const diceSymbols = [
    "discovery",
    "robbery",
    "mineral",
    "food",
    "skip",
    "air",
  ];
  const [dicedCount, setDicedCount] = useState<number>(0);

  //select the classes we require
  const cube = React.useRef<null | HTMLDivElement>(null);
  // const [diceResult, setDiceResult] = React.useState<IDiceSymbols | null>(null);
  const [currentClass, setCurrentClass] = React.useState<string>("");

  //this function will generate a random number between 1 and 6 (or whatever value you send it)
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  //our main roll dice function on click
  function rollDice() {
    if (dicedCount > 1) return;
    setDicedCount((prev) => ++prev);

    //genberate a random number between 1 and 6 with out getRandomInt function
    let randNum = getRandomInt(0, 6);
    //generate a class with the random number between 1 - 6 called showClass
    let showClass = "show-" + randNum;
    let result = diceSymbols[randNum];

    // setDiceResult(result);

    // if there is a class already selected remove it
    if (currentClass) {
      cube.current?.classList.remove(currentClass);
    }
    // add the new showclass with the generated number
    cube.current?.classList.add(showClass);
    //set the current class to the randomly generated number
    setCurrentClass(showClass);
    if (dicedCount === 1) setDiceSymbol(result);
  }
  // set initial side
  React.useEffect(() => {
    rollDice();
  }, []);

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.cube} ${styles[currentClass]}`}
        ref={cube}
        onClick={() => rollDice()}
      >
        <div className={`${styles.cube__face} ${styles.cube__face_0}`}>
          discovery
        </div>
        <div className={`${styles.cube__face} ${styles.cube__face_1}`}>
          robbery
        </div>
        <div className={`${styles.cube__face} ${styles.cube__face_2}`}>
          mineral
        </div>
        <div className={`${styles.cube__face} ${styles.cube__face_3}`}>
          food
        </div>
        <div className={`${styles.cube__face} ${styles.cube__face_4}`}>
          skip
        </div>
        <div className={`${styles.cube__face} ${styles.cube__face_5}`}>air</div>
      </div>
    </div>
  );
};
