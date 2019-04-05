import { ApolloError } from 'apollo-client';
import { toast } from './utils';

const onError = ({ message }: ApolloError) => {
  console.error(message);
  toast.warn('통신에러 발생 잠시후 다시 시도해주세요');
};

export default onError;
