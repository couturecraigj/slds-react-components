import React, { useRef, useEffect, useState } from "react";
import useLCC from "../hooks/useLCC";
import getWindowHeight from "../hooks/getWindowHeight";
import SizeContext from "./Context";
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
    if (event.message.type === "fonts") console.log(event.message);
    // if (event.message.type === "slds") setSlds(event.message.payload);
    if (event.message.type === "icons") console.log(event.message);
  });
  const [timerId, setTimer] = useState();

  const [initialized, setInitialized] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const postMessage = () => {
    if (!getSize) return;
    if (!divRef.current) return;
    const windowHeight = getWindowHeight();
    // const oldTimerId = timerId;
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

    sendMessage({
      type: "size",
      payload: size
    });
    if (window.parent)
      window.parent.postMessage(
        { type: "size", payload: size },
        window.location.origin
      );

    const newTimerId = setTimeout(postMessage, 500);
    setTimer(newTimerId);
  };
  useEffect(() => {
    clearTimeout(timerId);
    if (!initialized) {
      setInitialized(true);
      postMessage();
    } else {
      const oldTimerId = timerId;
      const onResize = () => {
        clearTimeout(oldTimerId);
        const newTimerId = setTimeout(postMessage, 500);
        setTimer(newTimerId);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [timerId, initialized]);
  return (
    <SizeContext.Provider
      value={{
        changeSize: postMessage,
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
        <style>{white ? `
    body, html {
      background: white;
    }
    div .slds-card {
      box-shadow: none;
    }
      ` : ''}</style>
        {children}
      </div>
    </SizeContext.Provider>
  );
};

export default Layout;
