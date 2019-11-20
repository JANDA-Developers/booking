import React, {Fragment, useState} from "react";
import {Query} from "react-apollo";
import {getHousesForSU, getHousesForSUVariables} from "../../../types/api";
import SuperMain from "./SuperMain";
import {GET_HOUSES_FOR_SU} from "../../../queries";
import {queryDataFormater, showError} from "../../../utils/utils";
import {useModal} from "../../../hooks/hook";
import Modal from "../../../atoms/modal/Modal";
import {IContext} from "../../MiddleServerRouter";

class GetAllHouse extends Query<getHousesForSU, getHousesForSUVariables> {}

interface Iprops {
  context: IContext;
}

const SuperMainWrap: React.FC<Iprops> = ({context}) => {
  const userModal = useModal(false);
  const [page, setPage] = useState(1);

  return (
    <GetAllHouse
      query={GET_HOUSES_FOR_SU}
      variables={{
        page,
        count: 20
      }}
    >
      {({data: housePages, loading, error}) => {
        const housePageData = queryDataFormater(
          housePages,
          "GetHousesForSU",
          "houses",
          undefined
        );
        const pageInfo = queryDataFormater(
          housePages,
          "GetHousesForSU",
          "pageInfo",
          undefined
        );

        return (
          <Fragment>
            <SuperMain
              page={page}
              setPage={setPage}
              userModal={userModal}
              pageData={pageInfo}
              houseData={housePageData || []}
              loading={loading}
              context={context}
            />
            {/* <MyPageModal {...userModal} userId={userModal.info.userId} /> */}
          </Fragment>
        );
      }}
    </GetAllHouse>
  );
};

export default SuperMainWrap;
