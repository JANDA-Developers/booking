import React, { useState, useRef } from "react";
import { s4 } from "../../utils/utils";
import "./TagInput.scss";
import { JDicon } from "@janda-com/front";
import { JDatomExtentionSet, IDiv } from "../../types/interface";
import classNames from "classnames";
import { JDatomClasses } from "../../utils/autoClasses";
interface IProp extends JDatomExtentionSet, IDiv {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: React.FC<IProp> = ({
  tags,
  setTags,
  className,
  mr,
  mb,
  show,
  ...props
}) => {
  const classes = classNames("JDtagInput", className, {
    ...JDatomClasses({
      mb,
      mr
    })
  });
  //  위에서 받을거
  const ref = useRef<HTMLInputElement>(null);

  const handleDelete = (i: number) => {
    const ftags = tags.filter((t, inI) => inI !== i);
    setTags([...ftags]);
  };

  const handleAddition = (tag: string) => {
    setTags([...tags, tag]);
  };

  return (
    <div
      onClick={() => {
        ref.current?.focus();
      }}
      className={classes}
    >
      <div className="JDtagInput__tags">
        {tags.map((name, i) => (
          <span className="JDtagInput__tag" key={`tag ${name}`}>
            {name}
            <JDicon
              className="JDtagInput__close"
              icon="close"
              onClick={() => {
                handleDelete(i);
              }}
            />
          </span>
        ))}
      </div>
      <input
        ref={ref}
        className="JDtagInput__input"
        onKeyDown={e => {
          const value = e.currentTarget.value;
          if (e.key === "Enter") {
            if (value) {
              handleAddition(value);
              if (ref.current) ref.current.value = "";
            }
          } else if (e.key == "Backspace") {
            if (!value) {
              handleDelete(tags.length - 1);
            }
          }
        }}
      />
    </div>
  );
};

export default TagInput;
