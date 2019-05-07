import { toast } from './utils';

interface result {
  error: string | null;
  ok: boolean | null;
  [data: string]: any;
}

const onCompletedMessage = (result: result, resultOK: string, resultFale: string) => {
  if (result.ok) {
    toast.success(resultOK);
  } else {
    console.error(`BackEnd::${result.error}`);
    toast.warn(resultFale);
  }
};

export default onCompletedMessage;
