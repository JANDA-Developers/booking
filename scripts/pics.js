const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join(
  __dirname,
  "../src/pages/documents/pics/testScreenShot"
);
const picsPath = path.join(__dirname, "../src/pages/documents/pics");
//passsing directoryPath and callback function
const folders = ["mb", "phablet", "tablet", "desktop", "pc"];

let pathArray = [];

const eee = async () => {
  folders.forEach(folder => {
    const folderName = directoryPath + "/" + folder;
    fs.readdir(folderName, function(err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach
      files.forEach(function(file) {
        const pic = {
          folder: folderName,
          fileName: file,
          path: folderName + "/" + file
        };
        pathArray.push(pic);
        // Do whatever you want to do with the file
      });
    });
  });
  console.log("end");
};
console.log(pathArray);

eee();
const dao = async () => {
  fs.writeFile(
    picsPath + "/testPicsPath.ts",
    "export const picsPaths = " + JSON.stringify(pathArray),
    function(err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
};

setTimeout(function() {
  dao();
}, 3000);
