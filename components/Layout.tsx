import React, { useRef, useEffect, useState } from "react";
import useLCC from "../hooks/useLCC";
import getWindowHeight from "../hooks/getWindowHeight";
import Context from "./Context";
import useLocation from "../hooks/useLocation";
const defaultHeightVariance = { upper: 4, lower: 0 };
const PROD = process.env.NODE_ENV === "production";
const serviceWorker = PROD ? "layout-sw.js" : "../layout-sw.js";

const useSize = (
  checkSize: boolean = true
): [(e?: any) => any, React.RefObject<HTMLDivElement>] => {
  const divRef = useRef<HTMLDivElement>(null);
  if (!checkSize) return [() => {}, divRef];

  const [height, setHeight] = useState(1);
  const [sendMessage] = useLCC();

  const getSize = () => {
    setTimeout(() => {
      const windowHeight = getWindowHeight();
      if (
        windowHeight === divRef.current?.offsetHeight &&
        height === divRef.current?.offsetHeight
      )
        return;
      setHeight(divRef.current?.offsetHeight || 0);
    }, 50);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      sendMessage(
        { type: "size", payload: { height } },
        "height:" + height + ";"
      ).then(() => getSize());
    }, 150);
    return () => clearTimeout(timer);
  }, [height]);
  useEffect(() => {
    getSize();
    window.addEventListener("resize", getSize);
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, []);
  return [getSize, divRef];
};

function registerServiceWorker(): void {
  if ("serviceWorker" in navigator && PROD) {
    navigator.serviceWorker
      .register(serviceWorker, { scope: location.origin + location.pathname })
      .then(registration =>
        console.log(
          `Service Worker registration complete, scope: '${registration.scope}'`
        )
      )
      .catch(error =>
        console.log(`Service Worker registration failed with error: '${error}'`)
      );
  }
}

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

  const [changeSize, divRef] = useSize(getSize);
  useEffect(() => {
    registerServiceWorker();
  }, []);

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
      <div
        ref={divRef}
        style={{ paddingInlineEnd: "2px", paddingInlineStart: "2px" }}
      >
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
