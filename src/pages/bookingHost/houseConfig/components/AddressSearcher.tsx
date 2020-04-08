import React, { useEffect } from "react";
import { useFetch, LANG } from "../../../../hooks/hook";
import { ISearchViewData, JDsearchInput } from "@janda-com/front";
import { s4 } from "../../../../utils/utils";

export type jsuo = {
  detBdNmList: string;
  engAddr: string;
  rn: string;
  emdNm: string;
  zipNo: string;
  roadAddrPart2: string;
  emdNo: string;
  sggNm: string;
  jibunAddr: string;
  siNm: string;
  roadAddrPart1: string;
  bdNm: string;
  admCd: string;
  roadFullAddr: string;
  udrtYn: string;
  lnbrMnnm: string;
  roadAddr: string;
  lnbrSlno: string;
  buldMnnm: string;
  bdKdcd: string;
  liNm: string;
  rnMgtSn: string;
  mtYn: string;
  bdMgtSn: string;
  buldSlno: string;
};

interface IProps {
  address: string;
  handleOnFind: (address: string) => void;
  onTypeChange: (value?: string) => void;
}

const AddressSearcher: React.FC<IProps> = ({
  address,
  handleOnFind,
  onTypeChange
}) => {
  const addressGeturl = `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPag<e=1&resultType=json&countPerPage=100&keyword=${address}&confmKey=${process.env.REACT_APP_API_ADDRESS_API_KEY}`;
  const [addressData, addressLoading, getAddressError, addressGet] = useFetch(
    addressGeturl
  );

  const dataMapper = (data?: jsuo[]): ISearchViewData[] => {
    if (!data) return [];
    if (typeof data !== "object") return [];
    if (!data.map) return [];

    const sliced = data.splice(0, 20);
    return sliced.map((d, i) => {
      const { zipNo, rnMgtSn, emdNo, roadAddr, jibunAddr, roadFullAddr } = d;
      return {
        id: s4(),
        title: roadAddr,
        describe: jibunAddr,
        tag: zipNo
      };
    });
  };

  const handleSelectData = (data: ISearchViewData) => {
    handleOnFind(data.title);
  };

  // 도로명주소 가져오기
  useEffect(() => {
    addressGet(addressGeturl);
  }, [addressGeturl]);

  return (
    <div className="JDz-index-2">
      <JDsearchInput
        inputProp={{
          label: LANG("house_address")
        }}
        onSelectData={handleSelectData}
        onSearchChange={onTypeChange}
        searchValue={address}
        dataList={dataMapper(addressData.results?.juso)}
      />
    </div>
  );
};

export default AddressSearcher;
