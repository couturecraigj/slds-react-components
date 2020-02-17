({
  createRecordEvent: function(component) {
    var windowHash = window.location.hash;
    var createEvent = $A.get("e.force:createRecord");
    createEvent.setParams({
      entityApiName: component.get("v.record"),
      defaultFieldValues: component.get("v.recordData"),
      panelOnDestroyCallback: function(event) {
        helper.closeFocusedTab(component, event, helper);
      }
    });
    console.log(createEvent);
    createEvent.fire();
  },
  createRecordsforceOne: function(component, event, helper) {
    console.log(JSON.parse(JSON.stringify(component.get("v.recordData"))));
    var record = sforce.one.createRecord(
      component.get("v.record"),
      component.get("v.recordData").RecordTypeId,
      Object.entries(component.get("v.recordData")).reduce(function(
        previous,
        entry
      ) {
        let value = entry[1];
        if (value === "true") value = true;
        if (value === "false") value = false;
        previous[entry[0]] = value;
        return previous;
      },
      {})
    );
    helper.closeFocusedTab(component, event, helper);
  },
  closeFocusedTab: function(component, event, helper) {
    // sforce.one.navigateToURL('/', true);
  }
});
