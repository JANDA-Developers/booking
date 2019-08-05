import React from "react";
import "./Qna.scss";
import Preloader from "../../../atoms/preloader/Preloader";
import $ from "jquery";
import Card from "../../../atoms/cards/Card";

const Qna = () => (
  <div className="QNA">
    <div className="container container--lg">
      <div className="docs-section">
        <h3>QNA</h3>
        <Card>
          <div className="qna__iframWrap">
            <iframe
              className="QNA__iframe"
              width="100%"
              height="500px"
              title="JDqna"
              src="https://stayjanda.com/QnA"
            />
            <Preloader loading={true} className="qna__preloader" size="large" />
            {/* <iframe
              width="100%"
              height="500px"
              title="JDqna"
              src="http://localhost:3000/#/outpage/reservation/05dfe136-1f1e-beed-b96d-ea3d68d8b847"
            /> */}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

$(window).ready(() => {
  $(".qna__preloader").css("display", "none");
});

export default Qna;
