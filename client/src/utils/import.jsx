const pgImportCall = ({
  productName, amount, buyer_name, buyer_tel, callBackFn,
}) => {
  window.IMP.init('imp64811998');

  const param = {
    // param
    pg: 'inicis',
    pay_method: 'card',
    merchant_uid: 'ORD20180131-0000014',
    name: productName,
    amount,
    buyer_name,
    buyer_tel,
  };

  console.log(param);

  window.IMP.request_pay(param, (rsp) => {
    // callback
    callBackFn(rsp);
  });
};

export default pgImportCall;
