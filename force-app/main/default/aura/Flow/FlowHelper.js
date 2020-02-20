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
  closeTab: function(component, event, helper) {
    const workspace = component.find("workspace");
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        if (component.get("v.isClassic")) {
          return resolve(false);
        }
        if (
          typeof sforce !== "undefined" &&
          sforce.console &&
          sforce.console.isInConsole &&
          sforce.console.isInConsole()
        ) {
          console.log("sforce.console");
          return sforce.console.getEnclosingTabId(function(result) {
            var tabId = result.id;
            sforce.console.closeTab(tabId, function() {
              if (result.error) {
                alert("Error message is " + result.error);
                resolve(false);
              }
              resolve(sforce.console.isInConsole());
            });
          });
        }

        if (workspace && workspace.isConsoleNavigation) {
          console.log("workspace");
          return workspace
            .isConsoleNavigation()
            .catch(function() {
              return false;
            })
            .then(function(isConsole) {
              component.set("v.open", false);
              if (isConsole) {
                workspace.getFocusedTabInfo().then(function(response) {
                  var focusedTabId = response.tabId;
                  // history.go(-2);
                  workspace.closeTab({ tabId: focusedTabId });
                });
              }
              resolve(isConsole);
            });
        }
        resolve(false);
      })
    );
  },
  closeModal: function(component, event, helper) {
    const workspace = component.find("workspace");
    helper.closeTab(component, event, helper).then(function(isConsole) {
      if (!isConsole) helper.goBack(component);
    });
  },
  goBack: function(component) {
    console.log("goBack");
    const navService = component.find("navService");
    const fromObject = component.get("v.fromObject");
    const fromId = component.get("v.fromId");
    const isClassic = component.get("v.isClassic");
    var pageReference = {};
    if (fromObject) {
      pageReference.type = "standard__objectPage";
      pageReference.attributes = {
        objectApiName: fromObject,
        actionName: "list"
      };
      if (fromId) {
        pageReference.type = "standard__recordPage";
        pageReference.attributes = {
          objectApiName: fromObject,
          recordId: fromId,
          actionName: "view"
        };
      }
    }
    if (!isClassic) {
      if (navService && pageReference.type)
        return navService.navigate(pageReference);
    }

    window.location.href = "/" + (fromId || "");
  }
});
