({
  initializeFileUpload: function(component, fileObject) {
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        if (fileObject.toLarge)
          throw new Error("File is TOOOO Large to upload");
        const action = component.get("c.startUpload");
        action.setParams({
          fileName: fileObject.fileName,
          fileExtension: fileObject.fileExtension,
          fileSize: fileObject.fileSize,
          fileType: fileObject.fileType,
          numberOfChunks: fileObject.numberOfChunks
        });
        action.setCallback(this, function(response) {
          resolve(response.getReturnValue());
        });
        $A.enqueueAction(action);
      })
    );
  },
  getStringFromChunk: function(chunk, fileId) {
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(event) {
          try {
            const base64Array = event.target.result.split(",");
            base64Array.shift();
            const base64String = base64Array.join(",");
            resolve(encodeURIComponent(base64String));
          } catch (e) {
            console.error(e);
            reject(e);
          }
        };
        reader.onerror = function(event) {
          reader.abort();
          console.log(event);
          reject(event);
        };
        reader.readAsDataURL(chunk.blob);
      })
    );
  },
  loadFileChunkStringToServer: function(component, file, chunk) {
    const action = component.get("c.uploadFileChunk");
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        action.setParams({
          chunkNumber: chunk.index,
          chunkB64: chunk.string,
          fileId: file.fileId
        });
        action.setCallback(this, function(response) {
          if (response.getReturnValue() == 1) resolve();
          else reject(response.getState());
        });
        $A.enqueueAction(action);
      })
    );
  },
  confirmUploadFinish: function(component, file) {
    const action = component.get("c.isFinished");
    return new Promise(
      $A.getCallback(function(resolve, reject) {
        action.setParams({
          fileId: file.fileId
        });
        action.setCallback(this, function(response) {
          if (response.getReturnValue()) return resolve(true);
          return reject(new Error("There was an error"));
        });
        $A.enqueueAction(action);
      })
    );
  }
});
