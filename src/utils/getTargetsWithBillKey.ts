import { IContext } from "../pages/bookingHost/BookingHostRouter";

export interface IPayTaget {
  name: string;
  id: string;
  billKey: string | null;
}

export const getTargetsWithBillKey = (context: IContext): IPayTaget[] => {
  const { houses } = context;

  const exsistProductInfoes = houses
    .map(house => {
      return { houseName: house.name, product: house.product, id: house._id };
    })
    .filter(v => v.product);

  const billKeyWithHouse = exsistProductInfoes.map(v => ({
    houseName: v.houseName,
    billKey: v.product!.billKey,
    ...v
  }));

  return billKeyWithHouse.map(info => ({
    id: info.id,
    billKey: info.billKey,
    name: info.houseName
  }));
};
