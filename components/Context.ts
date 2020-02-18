import { createContext } from "react";

type contextArguments = {
  changeSize?: () => any;
  getLocation?: () => Promise<Position | undefined>;
  location?: Position | undefined;
  slds?: string;
};

export default createContext(<contextArguments>{});
