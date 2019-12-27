import React from "react";
import { IContext } from "../../BookingHostRouter";
import { IUseModal } from "../../../../hooks/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import { JDtabs, TabList, Tab, TabPanel } from "../../../../atoms/tabs/Tabs_";
import HouseControll from "./HouseContoll";
import HomePageControll from "./HomePageControll";
import ProductControll from "./ProductControll";
import { useQuery, useMutation } from "@apollo/react-hooks";
import client from "../../../../apollo/apolloClient";
import {
  GET_HOUSE_SPECIFICATION,
  UPDATE_USER_FOR_SU
} from "../../../../apollo/queries";
import {
  getSpecification,
  getSpecificationVariables,
  updateUserForSU,
  updateUserForSUVariables,
  UpdateProductParams,
  LocationInput,
  TermsOfRefundInput,
  getSpecification_GetHouse_house
} from "../../../../types/api";
import { queryDataFormater, onCompletedMessage } from "../../../../utils/utils";
import { HouseType } from "../../../../types/enum";

export interface IControllSharedPorps {
  context: IContext;
  updateFn: IControllUpdateFn;
  data?: getSpecification_GetHouse_house;
}

export interface IControllUpdateParam {
  productParams?: UpdateProductParams | null;
  name?: string | null;
  houseType?: HouseType | null;
  location?: LocationInput | null;
  completeDefaultSetting?: boolean | null;
  refundPolicy?: TermsOfRefundInput[] | null;
}

export type IControllUpdateFn = (param: IControllUpdateParam) => any;

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
    if (!specificData) return;
    if (!specificData.product) return;
    updateUserForSuMu({
      variables: {
        houseId,
        productId: specificData.product._id,
        ...params
      }
    });
  };

  return (
    <JDmodal {...modalHook}>
      <JDtabs>
        <TabList>
          <Tab>House</Tab>
          <Tab>Hompage</Tab>
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
          <HomePageControll
            updateFn={updateFn}
            context={context}
            data={specificData}
          />
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
