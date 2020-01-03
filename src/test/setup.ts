import fs, { Dirent } from "fs";  // fs 모듈과 Dirent 타입을 불러온다
import path from "path"; // browser 환경에서 test가 동작하므로 nodejs의 path모듈이 존재하지 않기때문에 불러온다. 
import { startBundleSever } from "./browserTest/settings/bundleServer"; // bundler에서 제공하는 서버를 시작하는 함수를 불러온다
import { port, settingsPath, testEnvPath } from "./env"; // 사용할 port, setting 파일이 들어있는 path, 테스트 환경이 들어있는 Path를 가져온다
// tslint:disable-next-line:no-var-requires
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
// jest-environment-puppeteer : jest와 puppeteer를 사용해서 테스트를 실행한다.
// setupPuppeteer란 변수를 선언함과 동시에 jest-environment-puppeteer 모듈의 setup 함수를 setupPuppeteer에 할당해준다.
// import를 사용하지 않은 것은 jest-environment-puppeteer 모듈이 CommonJS를 따르기 때문.
import puppeteer from "puppeteer"; // puppeteer 모듈을 불러온다.

function readdir(directory: string): Promise<Dirent[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      directory,
      {
        withFileTypes: true,
      },
      (error, dirents) => {
        if (error) {
          reject();
          return;
        }

        resolve(dirents);
      },
    );
  });
}

async function getFilesEndsWithRecursively(
  directory: string,
  endsOfPaths: string[],
): Promise<string[]> {
  // readdir 함수는 Dirent[] 를 리턴한다.
  const items = await readdir(directory);
  const testCodePaths: string[] = [];
  await Promise.all(
    items.map(async (item) => {
      const itemPath = path.join(directory, item.name);
      if (!itemPath) {
        return;
      }
      // .browsertest.ts 혹은 .browsertest.tsx로 끝나는 파일이면 testCodePaths에 푸시한다.
      if (item.isFile() && endsOfPaths.some((x) => itemPath.endsWith(x))) {
        testCodePaths.push(itemPath);
      }
      // 폴더일 경우 재귀적으로 폴더 안까지 확인한다.
      if (item.isDirectory()) {
        const codePaths = await getFilesEndsWithRecursively(
          itemPath,
          endsOfPaths,
        );
        testCodePaths.push(...codePaths);
      }
    }),
  );

  return testCodePaths;
}

async function setRequires() {
  const browserTestDirectoryPath = path.join(__dirname, "browserTest");

  // 브라우저에서 테스트해야하는 코드는 .browsertest.ts 혹은 .browsertest.tsx로 약속한다.
  // 테스트 파일이 들어있는 폴더 내에서 해당 확장자인 파일들을 읽는다.
  const browserTestCodePaths = await getFilesEndsWithRecursively(
    browserTestDirectoryPath,
    [".browsertest.ts", ".browsertest.tsx"],
  );
  const requiresFilePath = path.join(settingsPath, "requires.ts");

  // 각 파일의 requires.ts에 대한 상대경로를 구하고,
  // console.log(require("~~~~")); 형태의 문자열로 만들어
  // requires.ts 파일에 writeFile 함수를 이용해 써넣는다.
  const requiresFileContent = browserTestCodePaths
    .map((browserTestCodePath) =>
      path.relative(settingsPath, browserTestCodePath),
    )
    .map(
      (browserTestCodePath) =>
        `console.log(require("${browserTestCodePath.replace(/\\/g, "/")}"));`,
    )
    .join("\n");

  await new Promise((resolve, reject) => {
    fs.writeFile(requiresFilePath, requiresFileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

async function setTestEnv() {
  // puppeteer를 실행한다.
  const browser = await puppeteer.launch();
  // 브라우저의 새 페이지를 연다.
  const page = await browser.newPage();
  // 실행해둔 bundle server의 주소로 접속한다.
  await page.goto(`http://localhost:${port}`);
  // css selector id=root가 렌더 될 때 까지 기다린다.
  await page.waitForSelector("#root");

  // BrowserTest.ts에서 브라우저 컨텍스트 전역변수로 보낸 itTestCaseNames 들을 String[]의 형태로 가져온다.
  const itTestCaseNames = (await page.evaluate(() => {
    return (window as any).itTestCaseNames;
  })) as string[];

  // testEnv 파일에 문자열 testEnvContent를 쓴다
  const testEnvContent = `export const itTestCaseNames = ${JSON.stringify(
    itTestCaseNames,
    null,
    2,
  )};`;
  await new Promise((resolve, reject) => {
    fs.writeFile(testEnvPath, testEnvContent, { encoding: "utf-8" }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

  await browser.close();
}

module.exports = async (globalConfig: any) => {
  // puppeteer를 셋팅한다.
  // https://github.com/smooth-code/jest-puppeteer/blob/master/packages/jest-environment-puppeteer/src/global.js
  await setupPuppeteer(globalConfig);

  // 파일 내부 함수 참조.
  await setRequires();

  // 특정포트로 서버를 실행한다.
  // 웹페이지에서 테스트하려면 접속할 수 있는 주소가 필요하다.
  await startBundleSever(port);

  // 파일 내부 함수 참조.
  await setTestEnv();
};