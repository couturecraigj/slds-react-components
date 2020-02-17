
import React, { useContext, useEffect } from "react";
import Context from "./Context";

const Svg = ({ xlinkHref = "", size = "x-small", type = "", icon = "" }) => {
  const { slds } = useContext(Context);
  useEffect(() => {
    // if (type && icon)
    //   window
    //     .fetch(`/icons/${type}/${icon}.svg`, { mode: "no-cors" })
    //     .then(res => res.text())
    //     .then(console.log);
  }, []);
  return (
    <svg
      className={`slds-icon slds-icon slds-icon_${size} slds-icon-text-default`}
    >
      <use xlinkHref={slds+xlinkHref} />
    </svg>
  );
};

export default Svg;
