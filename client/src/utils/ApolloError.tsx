import { ApolloError } from 'apollo-client';
import { toast } from './utils';

const onError = ({ message }: ApolloError) => {
  console.error(message);
  toast.warn('통신에러 발생 잠시후 다시 시도해주세요');
};
const showError = (error: any) => {
  console.error(error);
  if(typeof error === "string") toast.warn(error);
  if(typeof error === "object") toast.warn(error.message);
};

export default onError;
export { showError };
