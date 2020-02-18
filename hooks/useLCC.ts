import { useEffect } from "react";
import LCC from "lightning-container";

const useLCC = (messageFunction?: (message: any) => any) => {
  useEffect(() => {
    if (messageFunction) {
      LCC.addMessageHandler(messageFunction);
      return () => {
        LCC.removeMessageHandler(messageFunction);
      };
    }
    return () => {};
  }, []);
  const sendMessage = (message: any, returnMessageType?: any) =>
    new Promise(resolve => {
      console.log(message);
      if (returnMessageType) {
        const messageHandler = (message: any) => {
          if (message.type === returnMessageType) {
            LCC.removeMessageHandler(messageHandler);
            resolve(message);
          }
        };
        LCC.addMessageHandler(messageHandler);
      }
      LCC.sendMessage(message);
      if (window.parent)
        window.parent.postMessage(message, window.location.origin);
      if (!returnMessageType) {
        resolve();
      }
    });

  return [sendMessage];
};

export default useLCC;
