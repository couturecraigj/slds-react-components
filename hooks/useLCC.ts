import { useEffect, useRef } from "react";

const useLCC = (
  messageFunction?: (
    message: any
  ) => PromiseLike<{ type: string; payload: any } | void> | void
) => {
  const lccRef = useRef<any>(null);
  if (typeof window !== "object") return [() => Promise.resolve()];
  useEffect(() => {
    import("lightning-container")
      .then(module => (lccRef.current = module.default))
      .then(() => {
        if (messageFunction) {
          lccRef.current.addMessageHandler(messageFunction);
        }
      });
    if (messageFunction)
      return () => {
        if (!lccRef.current) return;
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
          if (message.type === returnMessageType && lccRef.current) {
            lccRef.current.removeMessageHandler(messageHandler);
            resolve(message);
          }
        };
        if (lccRef.current) lccRef.current.addMessageHandler(messageHandler);
        else resolve();
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
