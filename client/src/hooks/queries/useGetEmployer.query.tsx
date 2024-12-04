import { useQuery } from "@tanstack/react-query";

import { getEmployerProfile } from "@/lib/actions/employers.actions";

import useAuthentication from "../defaults/useAuthentication.hook";

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        type: type,
      }),
    queryKey: ["profile"],
    enabled: !!token,
  });
};

export default useGetEmployer;
