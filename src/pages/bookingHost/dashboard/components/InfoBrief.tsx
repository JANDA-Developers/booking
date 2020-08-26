import React, {useEffect} from "react";
import { JDcard, JDalign } from "@janda-com/front";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKING_COUNT } from "../../../../apollo/queries";
import { getBookingsCount, getBookingsCountVariables } from "../../../../types/api";
import moment from "moment";
import client from "../../../../apollo/apolloClient";

type TBrief = {
  title: string;
  number: number;
};

interface IProps {}

const InfoBrief: React.FC<IProps> = () => {
    
  const {data, loading} = useQuery<getBookingsCount,getBookingsCountVariables>(GET_BOOKING_COUNT, {
      client,
      variables: {
          param: {
              paging: {
                  count: 9999,
                  selectedPage: 1
              },
              filter: {
                  createdAt: {
                      checkIn: moment().format("YYYY-MM-DD"),
                      checkOut: moment().add(1,"day").format("YYYY-MM-DD")
                  }
              }
          }
      }
  })

  console.log(' data : ');
  console.log(data);
  if(data)
  console.log(data.GetBookings);

  // 체크인 한 사람 수 
  const brief_data: TBrief[] = [];

  return (
    <section className="brief">
      <JDcard className="brief__card">
        <JDalign className="brief__align">
          <div className="brief__title">
            <div>
              <p>Today</p>
              <p>JANDA</p>
              <p>SOLUTION</p>
            </div>
          </div>
          {brief_data.map(brief => {
            return (
              <div className="brief__info">
                <p>{brief.title}</p>
                <strong>{brief.number}</strong>
              </div>
            );
          })}
        </JDalign>
      </JDcard>
    </section>
  )};

export default React.memo(InfoBrief,()=> true);
