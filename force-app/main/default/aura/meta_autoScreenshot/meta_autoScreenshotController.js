({
  handleMessage: function(component, event, helper) {
    let fire = false;
    try {
      console.log(JSON.parse(JSON.stringify(event.getParam("payload"))));
      var message = component.getEvent("onmessage");
      if (event.getParam("payload").type === "screenshot") {
        fire = true;
        message.setParams({
          details: event.getParam("payload").details,
          type: "screenshot"
        });
      } else if (event.getParam("payload").type === "begin-capture") {
        fire = true;
        message.setParams({
          type: "begin-capture"
        });
      } else if (event.getParam("payload").type === "end-capture") {
        fire = true;
        message.setParams({
          type: "end-capture"
        });
      } else {
        fire = true;
        message.setParams({
          details: event.getParam("payload"),
          type: "error"
        });
      }
      if (fire) message.fire();
    } catch (e) {
      console.error(e);
    }
  },
  init: function(component) {
    console.log(window.innerWidth);
    component.set("v.width", window.innerWidth);
    component.set("v.ready", true);
  }
});
