import { useQuery } from "react-query";
import { getEmployerProfile } from "@/lib/actions/employers.actions";
import useAuthentication from "../defaults/useAuthentication";

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        type: type,
      }),
    queryKey: ["profile"],
  });
};

export default useGetEmployer;
