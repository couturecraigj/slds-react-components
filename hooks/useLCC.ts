import { useEffect, useRef } from "react";

const useLCC = (
  messageFunction?: (
    message: any
  ) => PromiseLike<{ type: string; payload: any } | void> | void
) => {
  const lccRef = useRef<any>(null);
  useEffect(() => {
    if (typeof window === "object")
      import("lightning-container")
        .then(module => (lccRef.current = module.default))
        .then(() => {
          if (messageFunction) {
            lccRef.current.addMessageHandler(messageFunction);
          }
        });
    if (messageFunction)
      return () => {
        if (typeof window === "object")
          lccRef.current.removeMessageHandler(messageFunction);
      };
    return () => {};
  }, []);
  const sendMessage = (message: any, returnMessageType?: any) =>
    new Promise(resolve => {
      if (typeof window !== "object") resolve();
      if (returnMessageType) {
        const messageHandler = (message: any) => {
          if (message.type === returnMessageType) {
            lccRef.current.removeMessageHandler(messageHandler);
            resolve(message);
          }
        };
        lccRef.current.addMessageHandler(messageHandler);
      }

      lccRef.current.sendMessage(message);
      if (typeof window === "object" && window.parent)
        window.parent.postMessage(message, window.location.origin);
      // setSentMessages(sentMessages.concat(message));
      if (!returnMessageType) {
        resolve();
      }
    });

  return [sendMessage];
};

export default useLCC;
