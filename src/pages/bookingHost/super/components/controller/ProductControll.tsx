import React from "react";
import { IControllSharedPorps } from "./SuperAdminControllModal";
import Vtable, { ColumnCells } from "../../../../../atoms/vtable/Vtable";
import JDselect from "../../../../../atoms/forms/selectBox/SelectBox";
import { SELECT_PRODUCT_TYPE_OP } from "../../../../../types/const";
import {
  useSwitch,
  useSelect,
  useInput,
  useDayPicker
} from "../../../../../hooks/hook";
import JDswitch from "../../../../../atoms/forms/switch/Switch";
import Button from "../../../../../atoms/button/Button";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import optionFineder from "../../../../../utils/optionFinder";
import JDdayPicker from "../../../../../atoms/dayPicker/DayPicker";

interface Iprops extends IControllSharedPorps {}

const ProductContoll: React.FC<Iprops> = ({ context, data, updateFn }) => {
  if (!data) return <div />;
  const { product, _id: houseId } = data;
  if (product === null) return <div>Un Exist Product</div>;
  const { status, name, price, expireDate, _id: productId } = product;
  const { isContinue } = status;

  const descriptionHook = useInput(name);
  const priceHook = useInput(price);
  const expireDateHook = useDayPicker(expireDate, expireDate);
  const HouseStatusHook = useSwitch(isContinue);
  const productHook = useSelect(
    optionFineder(SELECT_PRODUCT_TYPE_OP, product.productType._id)
  );

  const renders = [
    {
      label: "Alias",
      Component: () => <InputText textarea {...descriptionHook} />
    },
    {
      label: "Type",
      Component: () => (
        <JDselect {...productHook} options={SELECT_PRODUCT_TYPE_OP} />
      )
    },
    {
      label: "Status",
      Component: () => <JDswitch {...HouseStatusHook} />
    },
    {
      label: "Price",
      Component: () => <InputText {...priceHook} />
    },
    {
      label: "ExpireDate",
      Component: () => (
        <JDdayPicker isRange={false} mode="input" {...expireDateHook} />
      )
    }
  ];

  const handleUpdateBtn = () => {
    updateFn({
      updateProductParams: {
        productId,
        updateParams: {
          description: descriptionHook.value,
          expireDate: expireDateHook.from,
          price: priceHook.value
        }
      }
    });
  };

  return (
    <div>
      <Vtable>
        <ColumnCells datas={renders} />
      </Vtable>
      <div className="JDmodal__endSection">
        <Button
          flat
          thema="primary"
          label="update product"
          onClick={handleUpdateBtn}
        />
      </div>
    </div>
  );
};

export default ProductContoll;
