import { useSuspenseQuery } from "@tanstack/react-query";

import { getEmployerProfile } from "@/lib/actions/employers.actions";

import useAuthentication from "../defaults/useAuthentication.hook";

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useSuspenseQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        type: type,
      }),
    queryKey: ["profile"],
  });
};

export default useGetEmployer;
