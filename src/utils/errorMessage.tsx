import { ApolloError } from "apollo-client";
import { toast } from "react-toastify";

const showError = (error: any) => {
  if (!error) return;
  console.error(error);
  if (typeof error === "string") toast.warn(error);
  if (typeof error === "object") toast.warn(error.message);
};

export { showError };
