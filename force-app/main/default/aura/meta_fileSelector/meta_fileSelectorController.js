({
  handleFileChange: function(component, event, helper) {
    const chunkSize = component.get("v.chunkSize");
    const filesWrapper = Array.from(event.target.files).map(function(
      file,
      index
    ) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64String = event.target.result;
        // component.set('v.imageDataUrl', base64String);
      };
      reader.readAsDataURL(file);
      const numberOfChunks = Math.ceil(file.size / chunkSize);
      const chunks = [];
      let chunkCount = 0;
      let chunkStart = 0;
      let chunkEnd = chunkSize + 1;
      while (chunkCount < numberOfChunks) {
        const offset = chunkCount * chunkSize;
        const blob = file.slice(offset, offset + chunkSize);
        const chunk = {
          blob: blob,
          start: offset,
          index: chunkCount,
          end: offset + chunkSize,
          load: function(fileId) {
            file.fileId = fileId;
            return helper
              .getStringFromChunk(chunk, fileId)
              .then(function(stringFromChunk) {
                chunk.string = stringFromChunk;
                return helper.loadFileChunkStringToServer(
                  component,
                  file,
                  chunk
                );
              });
          }
        };
        chunks.push(chunk);
        chunkCount++;
      }
      console.log(file);
      const fileObject = {
        file: file,
        toLarge: file.size > component.get("v.fileSizeLimit"),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileExtension: file.name.split(".").pop(),
        numberOfChunks: chunkCount,
        chunks: chunks
      };

      fileObject.initialize = function() {
        return helper
          .initializeFileUpload(component, fileObject)
          .then(function(fileId) {
            fileObject.fileId = fileId;
            const blob = new Blob(
              fileObject.chunks.map(function(chunk) {
                return chunk.blob;
              })
            );
            const reader = new FileReader();
            reader.onload = function(event) {
              component.set("v.imageDataUrl", event.target.result);
            };
            reader.readAsDataURL(blob);
            return fileId;
          });
      };

      return fileObject;
    });
    filesWrapper
      .reduce(function(promise, fileObject) {
        return promise.then(function() {
          return fileObject
            .initialize()
            .then(function(fileId) {
              return fileObject.chunks
                .reduce(function(innerPromise, chunk) {
                  return Promise.all([innerPromise, chunk.load(fileId)]).then(
                    function(value) {
                      const previousValue = value[0];
                      const newValue = value[1];
                      return previousValue + newValue;
                    }
                  );
                }, Promise.resolve())
                .then(function(dataUrl) {
                  // console.log(dataUrl);
                });
            })
            .then(function() {
              return helper.confirmUploadFinish(component, fileObject);
            })
            .catch(function(error) {
              fileObject.error = error;
              return "";
            });
        });
      }, Promise.resolve())
      .then(function() {
        const fileIds = filesWrapper.map(function(fileObject) {
          if (fileObject.error) return fileObject.error;
          return fileObject;
        });
        console.log(fileIds);
        component.set("v.value", fileIds);
      })
      .catch(console.error);
  },
  init: function(component, event, helper) {
    if (!component.get("v.chunking")) {
      const twoGbs = 2147483648;
      component.set("v.chunkSize", twoGbs);
      component.set("v.fileSizeLimit", twoGbs);
    }
  }
});
