export const unzipAndUploadFile = (file) => {
  var reader = new FileReader();

  reader.onload = (event) => {
    var zip = new JSZip();

    zip
      .loadAsync(event.target.result)
      .then((zipData) => {
        // Extract each file from the zip
        var promises = [];
        zipData.forEach((relativePath, zipEntry) => {
          promises.push(
            zipEntry.async("blob").then(function (fileData) {
              // Create a new file object with the extracted file data
              var extractedFile = new File([fileData], zipEntry.name, {
                type: fileData.type,
              });
              // Upload the extracted file using the existing uploadFile function
              if (zipEntry.name.endsWith(".mscx")) uploadFiles(extractedFile);
            })
          );
        });

        // Wait for all extraction and upload operations to complete
        Promise.all(promises)
          .then(() => {
            console.log("All files extracted and uploaded successfully!");
          })
          .catch((error) => {
            console.error("Error during file extraction or upload:", error);
          });
      })
      .catch((error) => {
        console.error("Error while loading zip:", error);
      });
  };

  reader.readAsArrayBuffer(file);
};
