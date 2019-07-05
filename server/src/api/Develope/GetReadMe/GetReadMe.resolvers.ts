import {Resolvers} from "../../../types/resolvers";
import {
  GetAllReadMeResponse,
  GetFileTxtResponse,
  GetFileTxtQueryArgs
} from "../../../types/graph";
import path from "path";
import fs from "fs";

/** Retrieve file paths from a given folder and its subfolders. */
const getFilePaths = folderPath => {
  const entryPaths = fs
    .readdirSync(folderPath)
    .map(entry => path.join(folderPath, entry));
  const filePaths = entryPaths.filter(entryPath =>
    fs.statSync(entryPath).isFile()
  );
  const dirPaths = entryPaths.filter(
    entryPath => !filePaths.includes(entryPath)
  );
  const dirFiles = dirPaths.reduce(
    (prev, curr) => prev.concat(getFilePaths(curr)),
    []
  );

  const mdFilter = files => files.filter(el => /\.md$/.test(el));
  return [...mdFilter(filePaths), ...mdFilter(dirFiles)];
};

const readFile = async (path: string): Promise<any> => {
  const fileTxt = fs.readFileSync(path, "utf8");
  return fileTxt;
};

const resolvers: Resolvers = {
  Query: {
    GetAllReadMe: async (): Promise<GetAllReadMeResponse> => {
      try {
        const mdFiles = getFilePaths("../../client/src");
        return {
          ok: true,
          error: "",
          paths: mdFiles
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          paths: []
        };
      }
    },
    GetFileTxt: async (
      _,
      {path}: GetFileTxtQueryArgs
    ): Promise<GetFileTxtResponse> => {
      try {
        const fileTxt = await readFile(path);
        console.log(fileTxt);
        return {
          ok: true,
          error: "",
          fileTxt: fileTxt
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          fileTxt: ""
        };
      }
    }
  }
};

export default resolvers;
