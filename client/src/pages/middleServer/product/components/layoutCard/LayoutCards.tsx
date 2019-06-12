import React from "react";
import "./LayoutCards.scss";
import Card, {CardProps} from "../../../../../atoms/cards/Card";
import Button from "../../../../../atoms/button/Button";
import {Fragment} from "react";

interface IProps extends CardProps {
  selectedLayout?: any;
  setLayout?: any;
}

interface layout {
  id: string;
  name: string;
  link: string;
  img: string;
}

const layouts: layout[] = [
  {
    id: "A",
    name: "A타입 레이아웃",
    link: "http://janda-install.kr/",
    img:
      "https://res.cloudinary.com/stayjanda-com/image/upload/v1560234616/layout_type_A.jpg"
  },
  {
    id: "B",
    name: "B타입 레이아웃",
    link: "http://code-slave-2018.com/",
    img:
      "https://res.cloudinary.com/stayjanda-com/image/upload/v1560234623/type_B_layout.jpg"
  }
];

const LayoutCards: React.FC<IProps> = ({
  selectedLayout,
  setLayout,
  ...props
}) => {
  const handleClickCard = (id: string, url: string) => {
    setLayout && setLayout(id);
    window.open(url, "_blank");
  };

  return (
    <Fragment>
      {layouts.map(layout => {
        const layoutImg = {
          backgroundImage: `url("${layout.img}")`
        };
        return (
          <Card
            selected={selectedLayout && selectedLayout === layout.id}
            className="layoutCard"
            {...props}
          >
            <div style={layoutImg} className="layoutCard__imgBox" />
            <div className="layoutCard__bottomWrap">
              <span>{layout.name}</span>
              <Button
                onClick={() => {
                  handleClickCard(layout.id, layout.link);
                }}
                thema="grey"
                mode="flat"
                label="살펴보기"
              />
            </div>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default LayoutCards;
