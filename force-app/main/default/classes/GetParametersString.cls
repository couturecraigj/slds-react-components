public class GetParametersString {
    public String parametersString {get; set;}
    public String firstThreeRecordId {get; set;}
    public String recordId {get; set;}
    public String objectAPIName {get; set;}
    public Map<String, schema.SObjectType> globalDescribe = 
        Schema.getGlobalDescribe();
        
    public GetParametersString() {
        System.debug(UserInfo.getUiTheme());
        System.debug(UserInfo.getUiThemeDisplayed());
        parametersString = JSON.serialize(ApexPages.currentPage().getParameters()).replaceAll('[\']', '`');
        
        if(ApexPages.currentPage().getParameters().get('id') != null) {
        	recordId = ApexPages.currentPage().getParameters().get('id');  
            
            string keyCode = recordId.substring(0, 3);
            for(Schema.SObjectType objectInstance : globalDescribe.values()){
                if(objectInstance.getDescribe().getKeyPrefix() == keyCode){
                    objectAPIName = objectInstance.getDescribe().getName();
                }
            }
            
        }
        
        if(ApexPages.currentPage().getParameters().get('Record') != null) {
            Sobject sobj = Database.query(
                'SELECT Id FROM '+
                ApexPages.currentPage().getParameters().get('Record') +
                ' LIMIT 1'
            );
            System.debug(sobj);
            firstThreeRecordId = ((String)sobj.Id).substring(0, 3);
            System.debug(firstThreeRecordId); // 006
        }
    }
}