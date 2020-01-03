import React from "react";
import { IContext } from "../../../BookingHostRouter";
import { IUseModal } from "../../../../../hooks/hook";
import JDmodal from "../../../../../atoms/modal/Modal";
import {
  JDtabs,
  TabList,
  Tab,
  TabPanel
} from "../../../../../atoms/tabs/Tabs_";
import HouseControll from "./HouseContoll";
import ProductControll from "./ProductControll";
import { useQuery, useMutation } from "@apollo/react-hooks";
import client from "../../../../../apollo/apolloClient";
import {
  GET_HOUSE_SPECIFICATION,
  UPDATE_USER_FOR_SU
} from "../../../../../apollo/queries";
import {
  getSpecification,
  getSpecificationVariables,
  updateUserForSU,
  updateUserForSUVariables,
  getSpecification_GetHouse_house,
  UpdateHouseInput,
  UpdateProductForSUInput
} from "../../../../../types/api";
import {
  queryDataFormater,
  onCompletedMessage
} from "../../../../../utils/utils";
import "./SuperAdminControllModal.scss";
import BillPayController from "./BillPayController";

export interface IControllSharedPorps {
  context: IContext;
  updateFn: IControllUpdateFn;
  data?: getSpecification_GetHouse_house;
}

export interface IControllUpdateParam {
  updateProductParams?: UpdateProductForSUInput;
  updateHouseParams?: UpdateHouseInput;
}

export type IControllUpdateFn = (param: IControllUpdateParam) => void;

export interface IControllerModalProps {
  houseId: string;
}

interface Iprops {
  context: IContext;
  modalHook: IUseModal<IControllerModalProps>;
}

const SuperAdminController: React.FC<Iprops> = ({ context, modalHook }) => {
  const { houseId } = modalHook.info;
  const { data, loading } = useQuery<
    getSpecification,
    getSpecificationVariables
  >(GET_HOUSE_SPECIFICATION, {
    client,
    skip: !houseId,
    variables: {
      houseId
    }
  });

  const [updateUserForSuMu, { loading: updateUserForSuLoading }] = useMutation<
    updateUserForSU,
    updateUserForSUVariables
  >(UPDATE_USER_FOR_SU, {
    client,
    onCompleted: ({ UpdateHouse, UpdateProductForSU }) => {
      onCompletedMessage(
        UpdateHouse,
        "Update User Info Complet!",
        "Fail to update user info!"
      );
      onCompletedMessage(
        UpdateProductForSU,
        "Update User Info Complet!",
        "Fail to update user info!"
      );
    }
  });

  const specificData =
    queryDataFormater(data, "GetHouse", "house", undefined) || undefined;

  const updateFn: IControllUpdateFn = params => {
    if (!specificData || !specificData.product?._id) return;
    const {
      _id: houseId,
      product: { _id: productId }
    } = specificData;

    const defulatParams = {
      updateHouseParams: {
        houseId,
        updateParams: {}
      },
      productParams: {
        productId,
        updateParams: {}
      }
    };

    updateUserForSuMu({
      variables: {
        ...defulatParams,
        ...params
      }
    });
  };

  return (
    <JDmodal className="SuperAdminControllModal" {...modalHook}>
      <JDtabs tabsAlign="spaceAround">
        <TabList>
          <Tab>House</Tab>
          <Tab>BillPay</Tab>
          <Tab>Product</Tab>
        </TabList>
        <TabPanel>
          <HouseControll
            updateFn={updateFn}
            context={context}
            data={specificData}
          />
        </TabPanel>
        <TabPanel>
          {/* <BillPayController
            updateFn={updateFn}
            context={context}
            data={specificData}
          /> */}
        </TabPanel>
        <TabPanel>
          <ProductControll
            updateFn={updateFn}
            context={context}
            data={specificData}
          />
        </TabPanel>
      </JDtabs>
    </JDmodal>
  );
};

export default SuperAdminController;
