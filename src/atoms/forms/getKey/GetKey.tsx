import React from "react";

interface Iprops {
  onChange: (key: string, keyCode?: number) => void;
  key: string;
}

const GetKey: React.FC<Iprops> = ({ onChange, key }) => {
  return (
    <div>
      <input
        value={key}
        onKeyDown={e => {
          onChange(e.key, e.keyCode);
        }}
      />
    </div>
  );
};

export default GetKey;
