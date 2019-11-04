import React, {useEffect, useState} from "react";
import ErrProtecter from "../../../utils/errProtect";
import "./InfoReservation.scss";

const SetPrice = () => {
  useEffect(() => {
    // const editor = new Editor({
    //   el: document.querySelector("#editSection"),
    //   initialEditType: "wysiwyg",
    //   previewStyle: "vertical",
    //   height: window.innerHeight - 20,
    //   events: {
    //     change: onChange
    //   }
    // });
    // setSSSS({editor});
  }, []);
  return (
    <div id="JDreservation" className="JDreservation">
      <div id="editSection" />
    </div>
  );
};

export default ErrProtecter(SetPrice);
