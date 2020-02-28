import { createContext } from "react";

export type contextArguments = {
  changeSize?: () => any;
  getLocation?: () => Promise<Position | undefined>;
  location?: Position | undefined;
  slds?: string;
};

export default createContext(<contextArguments>{});
