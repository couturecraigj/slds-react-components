({
  doInit: function(component, event, helper) {
    component.set("v.messageQueue", []);
    component.set("v.class", "h" + Date.now());
  },
  onmessage: function(component, event, helper) {
    try {
      const message = JSON.parse(JSON.stringify(event.getParams().payload));
      component.set("v.ready", true);
      if (message.type === "size") {
        component.set(
          "v.style",
          "<style>." +
            component.get("v.class") +
            "{height:" +
            message.payload.height +
            "px !important;}</style>"
        );
        lightningContainer.message({
          type: "height:" + message.payload.height + ";"
        });
      }
      const onmessage = component.getEvent("onmessage");
      onmessage.setParams({
        details: message
      });
      onmessage.fire();
      const lightningContainer = component.find("lightningContainer");
    } catch (e) {
      console.error(e);
    }
  },
  onerror: function(component, event, helper) {
    const message = JSON.parse(JSON.stringify(event.getParams()));
    const onerror = component.getEvent("onerror");
    onerror.setParams({
      details: message
    });
    onerror.fire();
  },
  message: function(component, event, helper) {
    var params = event.getParam("arguments");
    if (params) {
      var payload = params.payload;
      if (component.get("v.ready") && !component.get("v.messageQueue").length) {
        const lightningContainer = component.find("lightningContainer");
        lightningContainer.message(payload);
      } else if (!component.get("v.ready")) {
        const messageQueue = component.get("v.messageQueue");
        messageQueue.push(payload);
        component.set("v.messageQueue", messageQueue);
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
  }
});
