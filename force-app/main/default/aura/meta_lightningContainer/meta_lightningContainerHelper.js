({
  sendMessages: function(component, helper) {
    console.log("sendMessages");
    if (component.get("v.ready")) {
      const lightningContainer = component.find("lightningContainer");
      const messageQueue = component.get("v.messageQueue");
      const firstMessage = messageQueue.shift();
      component.set("v.messageQueue", messageQueue);
      console.log(firstMessage);
      lightningContainer.message({ message: firstMessage });
      if (!messageQueue.length) return;
    }
    component.set(
      "v.timer",
      setTimeout(
        $A.getCallback(function() {
          helper.sendMessages(component, helper);
        }),
        500
      )
    );
  }
});
