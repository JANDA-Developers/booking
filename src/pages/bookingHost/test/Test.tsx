
import React from "react";
import './boardInfo.scss';
import DashBoardInformation from "../dashboard/components/DashBoardInformation";

export const Test = () => {
    return <DashBoardInformation
      briefInfo = {
        {
            userNum:100,
            newReserNum:2000,
            agencyNum:100,
            smsNum:3000
        }
      }
      noticeInfo = {
          [
            {
                id:1,
                notice_title : 'JANDA 특집 이용서',
                header_image : `header_image`,
                author : `author`,
                notice_body : '단순한 예약 프로그램이 아닙니다. 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
                video :`video`,
                notice_date : '2020.10.20',
                timestamp : `timestamp`,
                likes : `likes`,
                related_name : `related_name`,
                isNotice : true
            },
            {
                id:2,
                notice_title : 'JANDA 특집 이용서 2',
                header_image : `header_image`,
                author : `author`,
                notice_body : '단순한 예약 프로그램이 아닙니다. 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
                video :`video`,
                notice_date : '2020.10.20',
                timestamp : `timestamp`,
                likes : `likes`,
                related_name : `related_name`,
                isNotice : true
            },
            {
                id:3,
                notice_title : 'JANDA 특집 이용서 3',
                header_image : `header_image`,
                author : `author`,
                notice_body : '단순한 예약 프로그램이 아닙니다. 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
                video :`video`,
                notice_date : '2020.10.20',
                timestamp : `timestamp`,
                likes : `likes`,
                related_name : `related_name`,
                isNotice : true
            },
            {
                id:4,
                notice_title : 'JANDA 특집 이용서 4',
                header_image : `header_image`,
                author : `author`,
                notice_body : '단순한 예약 프로그램이 아닙니다. 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
                video :`video`,
                notice_date : '2020.10.20',
                timestamp : `timestamp`,
                likes : `likes`,
                related_name : `related_name`,
                isNotice : true
            }
        ]
      }
      newsInfo = {
        [
          {
              id:1,
              news_sort : '시스템알림',
              news_body : '[매니저] 님이 [2019-11-11][곰돌이방]에 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
              news_date : '2020.10.20',
          },
          {
              id:2,
              news_sort : '시스템알림',
              news_body : '[매니저] 님이 [2019-11-11][곰돌이방]에 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
              news_date : '2020.10.20',
          },
          {
              id:3,
              news_sort : '예약알림',
              news_body : '[매니저] 님이 [2019-11-11][곰돌이방]에 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
              news_date : '2020.10.20',
          },
          {
              id:4,
              news_sort : '예약알림',
              news_body : '[매니저] 님이 [2019-11-11][곰돌이방]에 안심하고 이용 가능한 AWS 클라우드 기반으로 고객 데이터를 수집 및 가공하고, 지금껏 경험해보지 못한 사용자 맞춤 프리미엄 기능들을 제공합니다.',
              news_date : '2020.10.20',
         }
      ]
    }
     />
}