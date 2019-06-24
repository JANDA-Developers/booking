import React, { useEffect, useState } from "react";
import Editor from "tui-editor";
import ErrProtecter from "../../../utils/errProtect";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import "./InfoReservation.scss";

const SetPrice = () => {
    const [ssss, setSSSS] = useState();
    const onChange = event => {
        console.log(ssss && ssss.getValue());
    };
    useEffect(() => {
        const editor = new Editor({
            el: document.querySelector("#editSection"),
            initialEditType: "wysiwyg",
            previewStyle: "vertical",
            height: window.innerHeight - 20,
            events: {
                change: onChange
            }
        });
        setSSSS({ editor });
    }, []);
    return (
        <div id="JDreservation" className="JDreservation">
            <div id="editSection" />
        </div>
    );
};

export default ErrProtecter(SetPrice);
