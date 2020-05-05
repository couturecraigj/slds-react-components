import { useContext } from "react";
import Context, { contextArguments } from "../components/Context";

const useSldsContext = (): contextArguments => {
  return useContext(Context);
};

export default useSldsContext;
