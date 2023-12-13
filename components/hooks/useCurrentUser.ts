import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
  email: string;
};

const getCurrentUser = (): Promise<User[]> =>
  api.get("auth/profile").then((response) => response.data);

const useCurrentUser = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
    retry: false, // Will retry failed requests 10 times before displaying an error
  });

  return {
    data,
    isFetching,
    error,
  };
};
export default useCurrentUser;
