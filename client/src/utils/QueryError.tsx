import { ApolloError } from 'apollo-boost';
import toast from './Toast';

const QueryError = (error: ApolloError | null | undefined | string): void => {
  if (typeof error === 'string') {
    console.error(error);
    toast.warn(error);
    return;
  }
  if (error) {
    console.error(error);
    toast.warn(error.message);
  }
};

export default QueryError;
