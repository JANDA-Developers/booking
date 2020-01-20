import ReactDOMServer from "react-dom/server";
import $ from "jquery";
import { FAVI_URL } from "../types/const";

export const openForPrint = (markUp: JSX.Element) => {
  const w = window.open("", "JD-receipt");
  if (!w) throw Error("Can not open Window 'openForPrint'");
  w.document.title = "JD-receipt";
  w.document.body.innerHTML = ReactDOMServer.renderToStaticMarkup(markUp);
  $("head", w.document).append(`<link rel="icon" href=${FAVI_URL}>`);
};
