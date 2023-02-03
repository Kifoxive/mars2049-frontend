import React from "react";
import styles from "./board.module.scss";

import { IGameData } from "src/pages/game/types";
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

  const boardBuildings: Array<React.ReactElement<typeof Building> | null> = [];

  board.forEach((paralel, indexP) => {
    paralel.forEach((item, indexM) => {
      const { y, x } = boardCoorGrid[indexP][makeShift(shift, indexM)];
      if (item === null) return;
      else if (item === true) {
        if (desiredBuilding === null) return;
        boardBuildings.push(
          <PossiblyBuildingPlace
            indexP={indexP}
            indexM={indexM}
            y={y}
            x={x}
            key={`${indexM}/${indexP}`}
            addBuilding={addBuilding}
          />
        );
        return;
      }

      const props = {
        building: item.building,
        owner: item.owner,
        color: item.color,
        y,
        x,
      };

      boardBuildings.push(<Building {...props} key={`${indexM}/${indexP}`} />);
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
