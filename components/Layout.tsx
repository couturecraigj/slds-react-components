import React, { useRef, useEffect, useState } from "react";
import useLCC from "../hooks/useLCC";
import getWindowHeight from "../hooks/getWindowHeight";
import Context from "./Context";
import useLocation from "../hooks/useLocation";
const defaultHeightVariance = { upper: 4, lower: 0 };

const Layout = ({
  children,
  white = false,
  getSize = true,
  heightVariances = defaultHeightVariance
}: {
  children: any;
  white?: boolean;
  getSize?: boolean;
  heightVariances?: { upper: number; lower: number };
}) => {
  heightVariances = { ...defaultHeightVariance, ...heightVariances };
  const slds = ".";
  const [location, getLocation] = useLocation();
  const [sendMessage] = useLCC(event => {
    if (!event) return;
    if (!event.message) return;
    // if (event.message.type === "fonts") console.log(event.message);
    // if (event.message.type === "slds") setSlds(event.message.payload);
    // if (event.message.type === "icons") console.log(event.message);
  });

  const [initialized, setInitialized] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const changeSize = async () => {
    if (!getSize) return;
    if (!divRef.current) return;
    const windowHeight = getWindowHeight();

    if (
      windowHeight >=
        divRef.current.offsetHeight +
          (heightVariances.lower < 0
            ? heightVariances.lower
            : -heightVariances.lower) &&
      windowHeight <= divRef.current.offsetHeight + heightVariances.upper
    ) {
      return;
    }

    const size = {
      height: divRef.current.offsetHeight,
      width: divRef.current.offsetWidth
    };
    return sendMessage(
      {
        type: "size",
        payload: size
      },
      "height:" + size.height + ";"
    );
  };
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      changeSize();
      return () => {};
    } else {
      const onResize = () => {
        return setTimeout(changeSize, 200);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [initialized]);
  return (
    <Context.Provider
      value={{
        changeSize,
        // changeSize: () => {},
        location,
        getLocation,
        slds
      }}
    >
      <div ref={divRef}>
        <link
          rel="stylesheet"
          href={`${slds}/styles/salesforce-lightning-design-system.min.css`}
        />
        <style>
          {white
            ? `
            body, html {
              background: white;
              overflow: hidden;
            }
            div .slds-card {
              box-shadow: none;
            }
            `
            : `
            body, html {
              background: transparent;
              overflow: hidden;
            }
            `}
        </style>
        {children}
      </div>
    </Context.Provider>
  );
};

export default Layout;
