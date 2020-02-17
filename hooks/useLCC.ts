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
  }, []);
  const sendMessage = (message: any, returnMessageType?: any) =>
    new Promise(resolve => {
      if (returnMessageType) {
        const messageHandler = (message: any) => {
          if (message.type === returnMessageType) {
            LCC.removeMessageHandler(messageHandler);
            resolve(message);
          }
        };
        LCC.addMessageHandler(messageHandler);
      } else {
        resolve();
      }
      LCC.sendMessage(message);
    });

  return [sendMessage];
};

export default useLCC;
