"use strict";

export type IUserData = {
  username: string;
  color: "green" | "orange" | "pink" | "blue";
  playerId: string | null;

  bases: number;

  resourceStations: {
    max: number;
    air: number;
    food: number;
    mineral: number;
  };

  labaratories: {
    rate: 4 | 3 | 2;
    two: number;
    three: number;
  };

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

  road: number;
  road_cards: number;

  H2O_station: boolean;

  lastDie: any;
  isMyTurn: boolean;
  shift: number;
};

export enum buildings {
  "air_station",
  "food_station",
  "mineral_station",
  "base",
  "laboratory",
  "road",
  "H2O_station",
}

export type IBuildingObj = {
  building: buildings;
  owner: string;
  color: string;
  paralel: number;
  meridian: number;
};

export interface IBuilding {
  building: buildings;
  owner: string;
  color: string;
  y: number;
  x: number;
  rotateDeg?: number;
}

export type IGameData = {
  board: Array<IBuildingObj | IPossibleBuildings | null>[];
  currentTurnPlayer: IUserData;
  totalGameTurn: number;
};

export type IDiceSymbols =
  | "discovery"
  | "robbery"
  | "mineral"
  | "food"
  | "skip"
  | "air";

export type IPossibleBuildings =
  | "all"
  | "no_base"
  | "no_labaratory"
  | "station"
  | "road"
  | "H2O_station";
