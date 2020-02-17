import { createContext } from "react";

type contextArguments = {
  changeSize?: () => any;
  getLocation?: () => Promise<Position>;
  location?: Position;
  slds?: string;
};

export default createContext(<contextArguments>{});
