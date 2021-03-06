import React from "react"
import { autoHypen } from "../../utils/utils";


interface IResvInfo {
  bookerName: string,
  bookingNum: string,
  bookInfo: string,
}

interface IpayInfo {
  payMethod: string,
  payStatus: string,
  payDate: string,
  cardName: string,
  cardNumber: string,
  refundPrice: string,
  cancelMessage: string,
  cancelStatus: string,
  approvalNumber: string,
  cancelDate: string,
  price: string | number,
  TAX: string | number | null,
  VAT: string | number | null,
  tid: string | null,
}

interface IhostInfo {
  address: string
  houseName: string
  bNumber: string
  hostName: string
  houseContact: string
  hompage: string
}

interface ICardRecipt {
  resvInfo: Partial<IResvInfo>,
  payInfo: Partial<IpayInfo>,
  hostInfo: Partial<IhostInfo>
}

const CardRecipt = ({ resvInfo, payInfo, hostInfo }: ICardRecipt) => {
  const {
    bookerName,
    bookingNum,
    bookInfo,
  } = resvInfo
  const {
    payMethod,
    payStatus,
    payDate,
    cardName,
    cardNumber,
    // Installment,
    approvalNumber,
    price,
    TAX,
    VAT,
    cancelDate,
    tid,
    cancelMessage,
    cancelStatus,
    refundPrice
  } = payInfo;

  const {
    address,
    houseName,
    bNumber,
    hostName,
    houseContact,
    hompage,
  } = hostInfo;

  return (
    <div>
      {/* @ts-ignore */}
      <table cellPadding={0} cellSpacing={0} width="100%" style={{ fontFamily: 'Verdana, Geneva, sans-serif', textAlign: "center", zoom: -1 }}>
        <tbody>
          <tr>
            <td style={{ height: 20 }}>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4A5A71', lineHeight: '2em', maxWidth: '700px', width: '90%', textAlign: 'left' }}>
                신용카드 영수증
                    <div style={{ textAlign: 'right', fontSize: '18px', color: '#ff0000', float: 'right', lineHeight: '14px', paddingTop: '9px' }}>
                  <a style={{ display: 'inline-block', textDecoration: 'none', padding: '8px 20px', margin: '0 5px 5px', borderRadius: '5px', background: '#4A5A71', color: '#fff', fontWeight: 'bold', float: 'right', fontSize: '12px' }} href="javascript:window.print()">영수증 인쇄</a>
                  <select style={{ display: 'inline-block', textDecoration: 'none', padding: '6px 10px', margin: '0 5px 5px', borderRadius: '5px', border: '1px solid #929292', fontWeight: 'bold', float: 'right', fontSize: '12px' }}>
                    <option>승인</option>
                    {/* <option>취소</option> */}
                  </select>
                </div>
              </div>
              {/* @ts-ignore */}
              <div width="90%" bgcolor="#ffffff" style={{ maxWidth: '700px', borderTop: '5px solid #4A5A71' }} />
              {/* @ts-ignore */}
              <table align="center" border={0} cellPadding={0} cellSpacing={0} width="90%" bgcolor="#ffffff" style={{ maxWidth: '700px', paddingBottom: '46px', borderBottom: '1px solid #d8d8d8' }}>
                <tbody>
                  {resvInfo &&
                    <tr>
                      <td style={{ fontSize: '13px', color: '#2c2c2c' }}>
                        <div style={{ padding: '20px 10px 0 10px' }}>
                          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333333', lineHeight: '1.5em' }}>
                            예약 정보
                            </div>
                          {/* @ts-ignore */}
                          <table style={{ width: '100%', borderTop: '3px solid #333333', borderCollapse: 'collapse' }} border={0} cellPadding={0} cellSpacing={0}>
                            <colgroup>
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '30%' }} />
                              <col style={{ width: '20%' }} />
                              <col />
                            </colgroup>
                            <tbody>
                              <tr>
                                <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                  <strong>예약번호</strong></th>
                                <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                  {bookingNum}</td>
                                <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                  <strong>예약자명</strong></th>
                                <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                  {bookerName}</td>
                              </tr>
                              <tr>
                                <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                  <strong>예약정보</strong></th>
                                <td colSpan={3} style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                  {bookInfo}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  }
                  <tr>
                    <td style={{ fontSize: '13px', color: '#2c2c2c' }}>
                      <div style={{ padding: '20px 10px 0 10px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333333', lineHeight: '1.5em' }}>
                          결제 정보
                            </div>
                        {/* @ts-ignore */}
                        <table style={{ width: '100%', borderTop: '3px solid #333333', borderCollapse: 'collapse' }} border={0} cellPadding={0} cellSpacing={0}>
                          <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>결제수단</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {payMethod}</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>거래상태</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {payStatus}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>거래일시</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {payDate}</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>취소일시</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {cancelDate}
                              </td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>결제카드</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>{cardName}</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>카드번호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {cardNumber}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>할부개월</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                일시불</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>승인번호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {approvalNumber}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>승인금액</strong></th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                <strong style={{ color: '#ff6a00' }}>{price}</strong></td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>공급가액</strong></th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {TAX}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                결제번호
                              </th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif', fontSize: "10px" }}>
                                {tid}
                              </td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>부가세</strong></th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {VAT}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                취소일자
                              </th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif', fontSize: "10px" }}>
                                {cancelDate}
                              </td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>취소메세지</strong></th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {cancelMessage}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                취소상태
                              </th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif', fontSize: "10px" }}>
                                {cancelStatus}
                              </td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>취소금</strong></th>
                              <td style={{ textAlign: 'right', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {refundPrice}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '13px', color: '#2c2c2c' }}>
                      <div style={{ padding: '20px 10px 0 10px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333333', lineHeight: '1.5em' }}>
                          공급자 정보
                            </div>

                        {/* @ts-ignore */}
                        <table style={{ width: '100%', borderTop: '3px solid #333333', borderCollapse: 'collapse' }} border={0} cellPadding={0} cellSpacing={0}>
                          <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>상호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {houseName}</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>사업자번호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {bNumber}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>대표자명</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {hostName}</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>연락처</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {autoHypen(houseContact)}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>주소</strong></th>
                              <td colSpan={3} style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {address}</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>홈페이지</strong></th>
                              <td colSpan={3} style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                {hompage}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '13px', color: '#2c2c2c' }}>
                      <div style={{ padding: '20px 10px 0 10px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333333', lineHeight: '1.5em' }}>
                          결제대행사 정보
                            </div>

                        {/* @ts-ignore */}
                        <table style={{ width: '100%', borderTop: '3px solid #333333', borderCollapse: 'collapse' }} border={0} cellPadding={0} cellSpacing={0}>
                          <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>상호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                잔다</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>사업자번호</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                592-55-00270</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>대표자명</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                김화현</td>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>연락처</strong></th>
                              <td style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                070-4128-8244</td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>주소</strong></th>
                              <td colSpan={3} style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                부산광역시 남구 전포대로133, WEWORK BIFC 12층 </td>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '1% 2%', fontWeight: 'bold', border: '1px solid #cfcfcf', background: '#e8e8e8' }}>
                                <strong>홈페이지</strong></th>
                              <td colSpan={3} style={{ textAlign: 'left', padding: '1% 2%', border: '1px solid #cfcfcf', background: '#ffffff', fontFamily: '돋움, AppleGothic, sans-serif' }}>
                                www.stayjanda.com</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '13px', color: '#2c2c2c' }}>
                      <div style={{ padding: '15px 10px 0 10px' }}>
                        <div style={{ padding: '0 0 2% 0', fontSize: '14px', color: '#444444', width: '100%', lineHeight: '1.6em', boxSizing: 'border-box' }}>
                          <img src="http://janda-tmp.com/email/icon_info.png" alt="info" style={{ verticalAlign: 'text-top', width: '14px' }} /> 신용카드 청구서에는 "잔다"로 표기됩니다.
                            </div>
                        <div style={{ padding: '0 0 2% 0', fontSize: '14px', color: '#444444', width: '100%', lineHeight: '1.6em', boxSizing: 'border-box' }}>
                          <img src="http://janda-tmp.com/email/icon_info.png" alt="info" style={{ verticalAlign: 'text-top', width: '14px' }} />
                          부가세법시행령 제57조2항에 따라 결제대행업체를 총한 신용카드 매출전표는 사업자가 별도의 세금계산서를 교부하지 아니한 경우,
                          매입세금계산서로 사용하실 수 있습니다.
                            </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CardRecipt;