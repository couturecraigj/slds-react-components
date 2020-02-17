public class meta_fileSelector {
    class FileSelectorException extends Exception {}
    @AuraEnabled
    public static Integer uploadFileChunk(
        Integer chunkNumber,
        String chunkB64,
        Id fileId
    ) {
        File__c file = [
            SELECT
            Number_of_Chunks__c,
            File_Name__c,
            File_Size__c,
            File_Extension__c,
            File_Type__c
            FROM File__c
            WHERE Id = :fileId
        ];
        if (file.Number_of_Chunks__c == 1) {
            Blob docBlob = EncodingUtil.base64Decode(
                EncodingUtil.urlDecode(chunkB64, 'UTF-8')
            );
            ContentVersion cv = new ContentVersion();
            cv.ContentLocation = 'S';
            cv.VersionData = docBlob;
            cv.FirstPublishLocationId = fileId;
            cv.Title = file.File_Name__c;
            cv.PathOnClient = file.File_Name__c;
            insert cv;
            return 1;
        }
        File_Chunk__c fileChunk = new File_Chunk__c(
            Body__c=EncodingUtil.urlDecode(chunkB64, 'UTF-8'),
            File__c=fileId,
            Index__c=chunkNumber
        );
        insert fileChunk;
        return 1;
	}
    @AuraEnabled
    public static String startUpload(
        String fileName,
        String fileExtension,
        Integer fileSize,
        String fileType,
        Integer numberOfChunks
    ) {
        File__c file = new File__c(
            Number_of_Chunks__c=numberOfChunks,
            File_Name__c=fileName,
            File_Size__c=fileSize,
            File_Extension__c=fileExtension,
            File_Type__c=fileType
        );
        insert file;
        return file.Id;
    }
    public static Boolean mergeFileChunks(Id fileId) {
        File__c file = [
            SELECT
            File_Name__c,
            File_Size__c,
            File_Extension__c,
            File_Type__c
            FROM File__c
            WHERE Id = :fileId
        ];
        File_Chunk__c[] fileChunks = [
            SELECT Body__c, Index__c
            FROM File_Chunk__c
            WHERE File__c = :fileId
            ORDER BY Index__c ASC
        ];
        Integer index = 0;
        Blob docBlob = Blob.valueOf('');
        for (File_Chunk__c fileChunk : fileChunks) {
            if(fileChunk.Index__c == index) {
                if (fileChunk.Body__c == null) continue;
                System.debug(fileChunk.Body__c);
                if (Limits.getHeapSize() > 275000) {
                    delete fileChunks;
                    delete file;
                    return false;
                }
                
                docBlob = EncodingUtil.base64Decode(
                    fileChunk.Body__c + EncodingUtil.base64Encode(docBlob)
                );
                index++;
            }
        }
        ContentVersion cv = new ContentVersion();
        cv.ContentLocation = 'S';
        cv.VersionData = docBlob;
        cv.FirstPublishLocationId = fileId;
        cv.Title = file.File_Name__c;
        cv.PathOnClient = file.File_Name__c;
        insert cv;
        delete fileChunks;
        return true;
    }
    @AuraEnabled
    public static Boolean isFinished(Id fileId) {
        File__c[] files = [
            SELECT Number_of_Chunks__c
            FROM File__c
            WHERE Id = :fileId
        ];
        
        if (files.size() == 0) throw new FileSelectorException(
            'Cannot find a file for that `fileId`: `' + fileId + '`'
        );
        if (files[0].Number_of_Chunks__c == 1) return true;
        Integer numberOfFileChunks = (Integer)files[0].Number_of_Chunks__c;
        
        if (numberOfFileChunks == 0) return true;
        File_Chunk__c[] fileChunks = [
            SELECT Index__c
            FROM File_Chunk__c
            WHERE File__c = :fileId
            ORDER BY Index__c ASC
        ];
        if (numberOfFileChunks != fileChunks.size()) {
            
            return false;
        }
        Integer index = 0;
        for (File_Chunk__c fileChunk : fileChunks) {
            System.debug(fileChunk.Index__c);
            if (fileChunk.Index__c == index) {
                index++;
            }
        }
        
        if (index != numberOfFileChunks) return false;
        return mergeFileChunks(fileId);
    }
}