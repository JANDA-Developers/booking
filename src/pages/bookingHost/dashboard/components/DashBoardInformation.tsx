import React from 'react'
import { JDcard, JDalign, JDtypho, JDslider } from "@janda-com/front";
import { IDiv } from '@janda-com/front/build/types/interface';
import JDIcon from '../../../../atoms/icons/Icons';
import { useQuery } from '@apollo/react-hooks';

type TBriefInfo = {
  userNum:number,
  newReserNum:number,
  agencyNum:number,
  smsNum:number
}

type TNoticeInfo = {
    id:number
    notice_title: string
    header_image:string
    author:string
    notice_body:string
    video?:string
    notice_date:string
    timestamp:string
    likes?: string
    related_name:string
    isNotice: boolean
}

type TNewsInfo = {
  id:number
  news_sort:string
  news_body:string
  news_date:string
}


interface IProps extends IDiv {
  briefInfo: TBriefInfo
  noticeInfo: TNoticeInfo[]
  newsInfo:TNewsInfo[]
}

const DashBoardInformation:React.FC<IProps> = (
  {briefInfo, noticeInfo, newsInfo}
) => {

  let window_width = window.innerWidth;

  /* ::: JS Section - 접속자수, 신규예약, 에이전시등 정보 ::: */
    
  const brief_data = [
    { 
      title: '체크인 한 사람 수 ',
      number:briefInfo.userNum
    },
    { 
      title: '오늘 방문하는 사람들',
      number:briefInfo.newReserNum
    },
    { 
      title: '취소된 카운팅 수',
      number:briefInfo.agencyNum
    },
    { 
      title: '총합 매출',
      number:briefInfo.smsNum
    },
  ];


  /* ::: JS Section - 공지사항 ::: */ 

  let noticeBodyLen = 80; // Body 글자 수

  const noticeBody = (content:string, length:number) => {
      if(content.length > length) {
        return content.substr(0, length) + '...';
      }
  }


  /* ::: JS Section - 알림 ::: */ 

  let newsBodyLen = 30; // Body 글자 수
  if(window_width < 500 ) { newsBodyLen = 20 }

  const newsBody = (content:string, length:number) => {
      if(content.length > length) {
        return content.substr(0, length) + '...';
      }
  }
  

    return (
        <div className="information">
          <section className="notice">
            <div className="notice__sTitle">
              <h3>
                <JDIcon size="largest" icon="quoteLeft" className="quote quote--left"></JDIcon>
                <span>공지사항</span>
                <JDIcon size="largest" icon="quoteRight" className="quote quote--right"></JDIcon>
              </h3>
            </div>
            <JDalign>
                <JDcard>
                  <JDalign className="notice__align">
                      {
                        noticeInfo.map((notice)=>{
                          return <article key={notice.id}>
                              <p className="notice__date">{notice.notice_date}</p>
                              <h2 className="notice__title">{notice.notice_title}</h2>
                              <p className="notice__content">
                               {
                                 noticeBody(notice.notice_body, noticeBodyLen) 
                               }		
                              </p>
                          </article>
                        })
                      }
                  </JDalign>
                </JDcard>
            </JDalign>
          </section>
  
          <section className="news">
            <JDalign className="news__align">
        
                <JDcard className="news__list">
                  <div className="news__sTitle">
                    <h3>
                      <JDIcon size="largest" icon="quoteLeft" className="quote quote--left"></JDIcon>
                      <span>알림</span>
                      <JDIcon size="largest" icon="quoteRight" className="quote quote--right"></JDIcon>
                    </h3>
                    <span className="news__more"> 
                        <JDIcon size="largest" icon="add"/>
                    </span>
                  </div> 
                  <div className="news__articles">
                      <ul>
                        {
                          newsInfo.map((news)=>{
                            return  <li key={news.id}>
                                <strong className="article__sort">
                                    {news.news_sort}
                                </strong>
                                <span className="article__content">
                                    { newsBody(news.news_body, newsBodyLen) }
                                </span>
                                <span className="article__date">
                                    {news.news_date}
                                </span>
                            </li>
                          })
                        }
                     
                      </ul>
                  </div>
                </JDcard>
           
                <div className="news__link">
                    <ul>
                      <li className="linkList">
                        <strong>JANDA TIP 바로 가기</strong>
                        <span>
                          <JDIcon size="largest" icon="arrowRight" className="quote quote--right"></JDIcon>
                        </span>
                      </li>
                      <li className="linkList">
                        <strong>JANDA 고객센터 바로가기</strong>
                        <span>
                          <JDIcon size="largest" icon="arrowRight" className="quote quote--right"></JDIcon>
                        </span>
                      </li>
                      <li className="linkList">
                        <strong>별나라호텔 빌더 바로가기</strong>
                        <span>
                          <JDIcon size="largest" icon="arrowRight" className="quote quote--right"></JDIcon>
                        </span>
                      </li>
                    </ul>
                </div>
             
            </JDalign>
          </section>
        
        </div>
    )
}

export default DashBoardInformation

