import React from "react";
import { IControllSharedPorps } from "./SuperAdminControllModal";
import Vtable, { ColumnCells } from "../../../../../atoms/vtable/Vtable";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import JDselect from "../../../../../atoms/forms/selectBox/SelectBox";
import { HOUSE_TYPE_OP, HOUSE_STATUS_OP } from "../../../../../types/const";
import { useInput, useSelect } from "../../../../../hooks/hook";
import optionFineder from "../../../../../utils/optionFinder";
import Button from "../../../../../atoms/button/Button";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

interface Iprops extends IControllSharedPorps {}

const HouseControll: React.FC<Iprops> = ({ context, data, updateFn }) => {
  if (!data) return <div />;
  const { name, status, houseType, _id: houseId } = data;
  const houseNameHook = useInput(name);
  const houseTypeHook = useSelect(optionFineder(HOUSE_TYPE_OP, houseType));
  const houseStatusHook = useSelect(optionFineder(HOUSE_STATUS_OP, status));

  const renders = [
    {
      label: "House Name",
      Component: () => <InputText {...houseNameHook} />
    },
    {
      label: "House Type",
      Component: () => <JDselect {...houseTypeHook} options={HOUSE_TYPE_OP} />
    },
    {
      label: "House Status",
      Component: () => (
        <JDselect {...houseStatusHook} options={HOUSE_STATUS_OP} />
      )
    }
  ];

  const handleUpdateBtn = () => {
    updateFn({
      updateHouseParams: {
        houseId,
        updateParams: {
          houseType,
          status,
          name
        }
      }
    });
  };

  return (
    <div>
      <Vtable>
        <ColumnCells datas={renders} />
      </Vtable>
      <ModalEndSection>
        <Button
          flat
          thema="primary"
          label="update product"
          onClick={handleUpdateBtn}
        />
      </ModalEndSection>
    </div>
  );
};

export default HouseControll;
