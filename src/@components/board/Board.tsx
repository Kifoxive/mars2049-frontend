import React from "react";
import styles from "./board.module.scss";

import { IGameData, IPossibleBuildings } from "src/pages/game/types";
import Building, {
  PossiblyBuildingPlace,
} from "src/pages/game/building/Building";
import { useAppSelector } from "src/redux/store";

function getBoardGrid(HEIGHT: number) {
  const CIRCLE_R = HEIGHT / 2;
  const RAD15 = Math.PI / 12;
  const boardGrid: Array<{ y: number; x: number }>[] = [];

  for (let i = 0; i <= 5; i++) {
    const R = CIRCLE_R - (i * HEIGHT) / 12;
    boardGrid[i] = [];
    for (let j = 1; j <= 24; j++) {
      const y = R * Math.cos(RAD15 * j) + R + CIRCLE_R - R;
      const x = R * Math.sin(RAD15 * j) + R + CIRCLE_R - R;
      boardGrid[i][j - 1] = { y: Math.round(y), x: Math.round(x) };
    }
  }

  return boardGrid;
}

const Meridians = () => {
  const meridians = [];
  for (let i = 1; i <= 24; i++) {
    meridians.push(
      <div
        key={i}
        className={styles.meridian}
        style={{ transform: `rotate(${i * (360 / 24)}deg)` }}
      />
    );
  }
  return meridians;
};

const Paralels = (HEIGHT: number) => {
  const paralels = [];
  for (let i = 1; i <= 5; i++) {
    paralels.push(
      <div
        key={i}
        className={styles.paralel}
        style={{
          width: `${(i * HEIGHT) / 6}px`,
          height: `${(i * HEIGHT) / 6}px`,
        }}
      />
    );
  }
  return paralels;
};

function makeShift(shift: number, meridian: number) {
  let result = (meridian -= shift + 1);

  if (meridian < 0) {
    result = 24 - Math.abs(meridian);
  } else if (meridian > 23) {
    result = meridian - 24;
  } else result = meridian;

  return result;
}

const PossibleBuildings = {
  all: ["air_station", "food_station", "mineral_station", "base", "laboratory"],
  no_base: ["air_station", "food_station", "mineral_station", "laboratory"],
  no_labaratory: ["air_station", "food_station", "mineral_station", "base"],
  station: ["air_station", "food_station", "mineral_station"],
  road: ["road"],
  H2O_station: ["H2O_station"],
};

const Board: React.FC<IGameData & { shift: number; addBuilding: Function }> = ({
  board,
  shift,
  addBuilding,
}) => {
  const { desiredBuilding } = useAppSelector((state) => state.game);

  const HEIGHT = 700;
  const meridians = Meridians();
  const paralels = Paralels(HEIGHT);
  const boardCoorGrid = React.useMemo(() => getBoardGrid(HEIGHT), [HEIGHT]);

  const boardBuildings: Array<
    React.ReactElement<typeof Building> | IPossibleBuildings | null
  > = [];

  if (
    typeof desiredBuilding === "string" &&
    desiredBuilding === "H2O_station"
  ) {
    boardBuildings.push(
      <PossiblyBuildingPlace
        indexP={6}
        indexM={0}
        y={HEIGHT / 2}
        x={HEIGHT / 2}
        key={`${HEIGHT / 2}/${HEIGHT / 2}`}
        addBuilding={addBuilding}
      />
    );
  }

  board.forEach((paralel, indexP) => {
    paralel.forEach((item, indexM) => {
      const { y, x } = boardCoorGrid[indexP][makeShift(shift, indexM)];
      if (item === null) return;
      else if (typeof item === "string") {
        if (desiredBuilding === null) return;

        if (typeof desiredBuilding === "string") {
          if (PossibleBuildings[item].includes(desiredBuilding)) {
            boardBuildings.push(
              <PossiblyBuildingPlace
                indexP={indexP}
                indexM={indexM}
                y={y}
                x={x}
                key={`${indexM}/${indexP}`}
                addBuilding={addBuilding}
                text={item}
              />
            );
          }
        }
        return;
      }

      const props = {
        building: item.building,
        owner: item.owner,
        color: item.color,
        y,
        x,
      };

      if (typeof item.building !== "string") return;

      boardBuildings.push(
        <Building
          {...props}
          key={`${indexM}/${indexP}`}
          rotateDeg={
            item.building === "road" ? 180 - (item.meridian - shift) * 15 : 0
          }
        />
      );
    });
  });
  return (
    <div className={styles.container} style={{ height: HEIGHT, width: HEIGHT }}>
      <div className={styles.mars}>
        {meridians}
        {paralels}
        <div>{boardBuildings}</div>
        <div className={styles.mars__red} />
      </div>
    </div>
  );
};
// const Point = ({ x, y }: { x: number; y: number }) => {
//   const sX: string = String(x);
//   const sY: string = String(y);
//   return (
//     <div
//       className={styles.pointer}
//       style={{ top: `${sX}px`, left: `${sY}px` }}
//     />
//   );
// };

export default Board;
