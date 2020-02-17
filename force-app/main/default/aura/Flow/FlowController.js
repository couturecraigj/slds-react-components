({
  init: function(component, event, helper) {
    try {
      var flow = component.find("flowData");
      let params =
        component.get("v.parameterString") &&
        JSON.parse(component.get("v.parameterString"));
      const pageRef = JSON.parse(
        JSON.stringify(component.get("v.pageReference"))
      );
      if (pageRef && pageRef.state) {
        params = JSON.parse(
          decodeURIComponent(pageRef.state.c__parameterString)
        );
      }
      console.log(params);
      const flowName = params.flow;
      const flowLabel = params.flowLabel || flowName;
      helper.setTitle(component, event, helper, flowLabel);
      params.flow = undefined;
      params.flowLabel = undefined;
      const plusRegex = new RegExp("\\+", "ig");
      console.log(plusRegex);
      component.set(
        "v.flowLabel",
        decodeURIComponent(flowLabel).replace(plusRegex, " ")
      );
      if (params.redirectVariable) {
        const redirectVariable = params.redirectVariable;
        params.redirectVariable = undefined;
        component.set("v.redirectVariable", redirectVariable);
      }

      const flowVariables = Object.entries(params)
        .map(function(entry) {
          if (entry[1] === undefined) return;
          if (entry[1].split(".").length !== 2) return;
          const type = entry[1].split(".")[0];
          const value = entry[1].split(".")[1];
          return {
            name: entry[0],
            type: type,
            value: value
          };
        })
        .filter(function(v) {
          return v;
        });
      console.log(flowVariables);
      flow.startFlow(flowName, flowVariables);
    } catch (e) {
      console.error(e);
    }
  },
  statusChange: function(component, event) {
    if (event.getParam("status") === "FINISHED") {
      console.log(JSON.parse(JSON.stringify(event.getParams())));
      const redirectVariable = component.get("v.redirectVariable");
      if (!redirectVariable) return;
      var redirect = $A.get("e.force:navigateToSObject");
      const recordId = event
        .getParam("outputVariables")
        .find(function(variable) {
          return variable.name === component.get("v.redirectVariable");
        }).value;
      // Pass the record ID to the event
      redirect.setParams({
        recordId: recordId
      });

      // Open the record
      redirect.fire();
    }
  },
  closeModal: function(component, event, helper) {
    helper.closeModal(component, event, helper);
  }
});
