import { ApolloError } from 'apollo-client';
import { toast } from './utils';

// 👿 둘다 있을 필요없지 하나로 하자.
const onError = ({ message }: ApolloError) => {
  console.error(message);
  toast.warn('요청 실패');
};
const showError = (error: any) => {
  if (!error) return;
  console.error(error);
  if (typeof error === 'string') toast.warn(error);
  if (typeof error === 'object') toast.warn(error.message);
};

export default onError;
export { showError };
4;
