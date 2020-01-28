import puppeteer, { ElementHandle } from "puppeteer";
import muResult from "../utils/mutationResultSafty";
import chalk from "chalk";
import { ExecutionResult } from "graphql";
import { WindowSize, WindowSizeHeight, WindowSizeShort } from "../types/enum";
import { TLogin } from "../pages/bookingHost/Login/__test__/Login.test";

export const getLocalStorage = async () => {
  console.info(chalk.grey(`getLocalStorage`));
  const result = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // @ts-ignore
      json[key] = localStorage.getItem(key);
    }
    console.log("json");
    console.log(json);
    return json;
  });
  console.log("result");
  console.log(result);
  return result;
};

export const currentWinSize = (): WindowSizeShort => {
  const { width } = page.viewport();
  let mode = "wlg";
  if (width >= WindowSize.MOBILE) mode = "sm";
  if (width >= WindowSize.PHABLET) mode = "md";
  if (width >= WindowSize.TABLET) mode = "wmd";
  if (width >= WindowSize.DESKTOP) mode = "lg";
  if (width >= WindowSize.DESKTOPHD) mode = "wlg";
  return mode as WindowSizeShort;
};

export const S = 1000;
export const urlBase = "http://localhost:3000";

export const takeShot = async (name: string) => {
  console.info(chalk.grey(`takeShot ${name}`));
  const fileName = name;

  const mode = currentWinSize();

  await page.screenshot({
    path: `src/pages/documents/pics/testScreenShot/${mode}/${fileName}`,
    type: "jpeg",
    fullPage: true
  });

  return;
};

export const TgetElement = async (selecter: string) => {
  console.info(chalk.grey(`TgetElement ${selecter}`));
  const el = await page.$(selecter);
  if (!el) throw Error(selecter + "is not exist");
  return el;
};

export async function TgetAttr<T>(
  puppetEl: puppeteer.ElementHandle<Element>,
  attr: string
): Promise<T> {
  console.info(chalk.grey(`Tselect ${TgetAttr}`));
  return (await (await puppetEl.getProperty("attr")).jsonValue()) as any;
}

export const Tselect = async (selecter: string, propSelectIndex?: number) => {
  console.info(chalk.grey(`Tselect ${selecter} ${propSelectIndex}`));
  const selectIndex = propSelectIndex || 1;
  await page.click(selecter);
  await TWaitS(`${selecter} .react-select__option`);
  await page.click(
    `${selecter} .react-select__option:nth-child(${selectIndex})`
  );
};

export const TWait = async (second: number) => {
  await page.waitFor(second * S);
};

export const TEInnerText = async (el: ElementHandle<Element>) =>
  await (await el.getProperty("textContent")).jsonValue();

export const TWaitTill = async (second: number, isDone: () => Promise<any>) => {
  const maxTries = 3;
  for (let count = 0; ; count++) {
    await page.waitFor(second * S);
    try {
      return await isDone();
    } catch (e) {
      if (count < maxTries) {
        continue;
      } else {
        throw e;
      }
    }
  }
};

export const TUpload = async (uploaderSelecter: string, fileUrl: string) => {
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(uploaderSelecter) // some button that triggers file selection
  ]);
  await fileChooser.accept([fileUrl]);
  await expectOkFromGraphql();
};

export const TType = async (selecter: string, text: string) => {
  console.info(chalk.grey(`TType ${selecter} ${text}`));
  await page.waitForSelector(selecter);
  await page.$eval(selecter, el => {
    // @ts-ignore
    if (el.value) el.value = "";
  });
  await page.click(selecter);
  await page.type(selecter, text);
};

export const TClick = async (selecter: string) => {
  console.info(chalk.grey(`TClick ${selecter}`));
  await page.click(selecter);
};

export const TWaitClick = async (selecter: string) => {
  console.info(chalk.grey(`TWaitClick ${selecter}`));
  await TWaitS(selecter);
  await page.click(selecter);
};

// ---------------------------------------------------

export const expectOkFromGraphql = async () => {
  console.info(chalk.grey(`expectOkFromGraphql`));
  const response = await page.waitForResponse(isResponseFromServer, {
    timeout: 10 * S
  });

  if (!response.ok() && response.json()) {
    const result = (await response.json()) as any;
    console.info(chalk.red(JSON.stringify(result)));
  }

  await expect(response.ok() === true);
  return response;
};

//
export const toastCheck = async (queryName?: string) => {
  if (queryName) {
    await page.waitForSelector(`.${queryName}-ok`, {
      timeout: 60 * S
    });
  } else {
    await page.waitForSelector(`.Toastify__toast--success`, {
      timeout: 60 * S
    });
  }
};

// This is So broken (seem can not read File...)
// There is no way!!! to get body-specific  result
// Some Query will Stuck at here escape this util fnc Don't trust it
// Find another way to check
export const responseResultCheck = async (query: string, key?: string) => {
  console.info("responseResultCheck");
  const response = await expectOkFromGraphql();
  const resultValidate: ExecutionResult<any> = (await response.json()) as any;
  expect(muResult(resultValidate, query) === true);
  if (key) return muResult(resultValidate, query, key);
};

//  I MUST!!! FIND WAY AT HERE !!!!!!!!
export const isResponseFromServer = (response: puppeteer.Response) => {
  return response
    .request()
    .url()
    .includes("graphql");
};

export const getDefaultViewport = (windowSize: WindowSize) => {
  switch (windowSize) {
    case WindowSize.DESKTOPHD:
      const width = WindowSize.DESKTOPHD;
      return {
        width,
        height: (width * 9) / 16
      };
    default:
      return undefined;
  }
};

interface TestLogin {
  email?: string;
  tokenLogin?: boolean;
  token?: boolean;
  shouldLogin?: boolean;
}

export const testReady = async (
  skip: boolean,
  goto?: string,
  login: TestLogin | false = {},
  mode: WindowSize = WindowSize.DESKTOP
) => {
  // 기본 타임아웃 시간을 30초로 변경
  jest.setTimeout(30 * S);
  console.info(chalk.grey(`testReady login:${login} goto:${goto}`));
  await context.overridePermissions(urlBase, ["geolocation"]);

  let height: number = 0;
  if (mode === WindowSize.DESKTOPHD) height = WindowSizeHeight.DESKTOPHD;
  if (mode === WindowSize.DESKTOP) height = WindowSizeHeight.DESKTOP;
  if (mode === WindowSize.TABLET) height = WindowSizeHeight.TABLET;
  if (mode === WindowSize.PHABLET) height = WindowSizeHeight.PHABLET;
  if (mode === WindowSize.MOBILE) height = WindowSizeHeight.MOBILE;

  await page.setViewport({
    height,
    width: mode
  });
  await page.goto(urlBase);

  if (skip) return;

  if (login && login.token) {
    await page.evaluate(() => {
      localStorage.setItem(
        "jwt",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTQwN2RjMzM0MjExM2YwY2Y0NTZkNyIsImlhdCI6MTU3OTY5Njg4N30.E4ORUYEk8DWZcUirY0Y1FBCGK9kZ6yh1XPuumrbS6Yk"
      );
    });
    await page.goto(urlBase);
    await TWait(2);
  }

  if (login && !login.token) {
    if (false) {
      // TODO
      // await page.evaluate(() => {
      //   localStorage.setItem("token", "example-token");
      // });
      // await page.reload();
    } else {
      console.log("login");
      console.log(login);
      await TLogin(login.email || "crawl123@naver.com");
      await page.waitForNavigation({
        waitUntil: "domcontentloaded"
      });
      await TWaitS("#dashboard");
    }
  }

  if (goto) {
    let tempGoto = goto;
    if (!goto.includes("http")) {
      tempGoto = urlBase + "/#/" + goto;
    }
    await page.goto(tempGoto);
    await page.waitFor(1000);
  }
};

interface TCheckStringOption {
  shouldFail: boolean;
}

export const TGetStringFrom = async (selecter: string): Promise<string> => {
  console.info(chalk.grey(`TGetStringFrom ${selecter}`));
  await page.waitForSelector(selecter);
  const element = await page.$$(selecter);
  if (!element) throw new Error("ele is not found");

  const text = await Promise.all(
    element.map(async el => (await el.getProperty("textContent")).jsonValue())
  );
  const texts = text.join();
  return texts;
};

export const TGetId = async (
  selecter: string,
  returnAsSelecter: boolean
): Promise<string> => {
  console.info(chalk.grey(`TGetId ${selecter}`));
  await page.waitForSelector(selecter);
  const target = await page.$(selecter);
  if (!target) throw new Error(`Dose not exist ${selecter}`);
  const id = await (await target.getProperty("id")).jsonValue();
  if (!id) throw new Error(`Property Id is not Exsist on ${selecter}`);
  if (returnAsSelecter) return `#${id}`;
  else return id as string;
};

// CHeck string in select if select is multiful
// and one of them has string it will return true !
export const TCheckString = async (
  selecter: string,
  checkString: string,
  options?: TCheckStringOption
) => {
  console.info(chalk.grey(`TCheckString ${selecter} ${checkString}`));
  const defaultOption: TCheckStringOption = {
    shouldFail: false
  };
  const { shouldFail } = options || defaultOption;
  const texts = await TGetStringFrom(selecter);
  if (shouldFail) {
    expect(texts).toEqual(expect.not.stringMatching(new RegExp(checkString)));
  } else {
    expect(texts).toEqual(expect.stringMatching(new RegExp(checkString)));
  }
};

export const TWaitS = async (selecter: string) => {
  console.info(chalk.grey(`TWaitS ${selecter}`));
  await page.waitForSelector(selecter);
};

export const TCheckValue = async (selecter: string, expectValue: string) => {
  console.info(chalk.grey(`TCheckValue ${selecter} ${expectValue}`));
  await page.waitForSelector(selecter);
  const value = await page.$eval(selecter, el => {
    if (!("value" in el)) throw Error(`value is not exsist in ${selecter}`);
    // @ts-ignore
    return el.value;
  });
  expect(value).toEqual(expectValue);
};

export const TWaitVsible = async (
  selecter: string,
  visible: boolean = false
) => {
  console.info(chalk.grey(`TWaitVsible ${selecter} ${visible}`));
  await page.waitForSelector(selecter, { hidden: visible });
};

export const TExist = async (selecter: string, expectExsist: boolean) => {
  console.info(chalk.grey(`TExist ${selecter}`));
  const target = await page.$(selecter);
  if (expectExsist) {
    expect(target).not.toEqual(null);
  } else {
    expect(target).toEqual(null);
  }
};

test.skip("skip", () => {});
