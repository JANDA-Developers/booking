import { hexEncode, hexDecode } from "./hex";

interface UTH {
  action: string;
  path: string;
  createAt: number;
  value: string;
}

const userTacking = (label: string = "", value: string = "") => {
  const pathName = window.location.href;
  const trakHistory: UTH = {
    action: label || "",
    path: pathName.replace(process.env.REACT_APP_API_CLIENT_URL || "", ""),
    createAt: new Date().getTime(),
    value
  };
  let histories: UTH[] = [];
  let UTH = localStorage.getItem("UTH");

  if (UTH) {
    if (UTH.length > 3000) {
      UTH = "";
      histories = [trakHistory];
    } else {
      const prevHostory = JSON.parse(hexDecode(UTH)) as UTH[];
      histories = [...prevHostory, trakHistory];
    }
  }

  console.log("histories");
  console.log(histories);
  localStorage.setItem("UTH", hexEncode(JSON.stringify(histories)));
};

export default userTacking;
