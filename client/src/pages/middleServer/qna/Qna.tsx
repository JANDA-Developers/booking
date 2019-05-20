import React from "react";
import "./Qna.scss";
import Preloader from "../../../atoms/preloader/Preloader";
import $ from "jquery";

const Qna = () => (
  <div className="QNA">
    <div className="container container--lg">
      <div className="docs-section">
        <h3>QNA</h3>
        <div className="qna__iframWrap">
          <iframe
            className="QNA__iframe"
            width="100%"
            height="500px"
            title="JDqna"
            src="https://stayjanda.com/QnA"
          />
          <Preloader className="qna__preloader" size="large" />
        </div>
      </div>
    </div>
  </div>
);

$(window).ready(() => {
  $(".qna__preloader").css("display", "none");
});

export default Qna;
