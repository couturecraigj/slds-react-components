({
  setTitle: function(component, event, helper, flowLabel) {
    const workspace = component.find("workspace");
    if (typeof sforce !== "undefined") {
      if (sforce.console) {
        sforce.console.setTabTitle(flowLabel);
      }
    } else
      workspace.isConsoleNavigation().then(function(isConsole) {
        workspace.getFocusedTabInfo().then(function(response) {
          var focusedTabId = response.tabId;
          workspace.setTabLabel({
            tabId: focusedTabId,
            label: flowLabel
          });
        });
      });
  },
  closeModal: function(component, event, helper) {
    const workspace = component.find("workspace");
    if (
      typeof sforce !== "undefined" &&
      sforce.console &&
      sforce.console.isInConsole
    ) {
      console.log("sforce.console");
      if (sforce.console.isInConsole())
        return sforce.console.getEnclosingTabId(function(result) {
          var tabId = result.id;
          console.log("closing tabId " + tabId);
          history.go(-2);
          sforce.console.closeTab(tabId, function() {
            if (result.error) {
              alert("Error message is " + result.error);
            }
          });
        });
      return history.back();
    } else if (workspace && workspace.isConsoleNavigation) {
      console.log("workspace");
      try {
        setTimeout(
          $A.getCallback(function() {
            console.log(component.get("v.open"));
            if (component.get("v.open")) history.back();
          }),
          1000
        );
        return workspace
          .isConsoleNavigation()
          .then(function(isConsole) {
            component.set("v.open", false);
            console.log(isConsole);
            if (isConsole)
              return workspace.getFocusedTabInfo().then(function(response) {
                var focusedTabId = response.tabId;
                history.go(-2);
                workspace.closeTab({ tabId: focusedTabId });
              });
          })
          .catch(function() {
            return;
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        var redirect = $A.get("e.force:navigateToSObject");
        // Pass the record ID to the event
        redirect.setParams({
          recordId: "back"
        });

        // Open the record
        return redirect.fire();
      } catch (e) {
        console.error(e);
      }
    }
  }
});
