import { useQuery } from "@tanstack/react-query";

import { getEmployerProfile } from "@/lib/actions/employers.actions";

import useAuthentication from "../defaults/useAuthentication.hook";
import { EmployerTypes } from "@/types";

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery<{
    counts: { totalJobs: number };
    employer: EmployerTypes;
  }>({
    queryFn: () => {
      if (!token) {
        throw new Error("Unathorized!");
      }

      return getEmployerProfile({
        token: token,
        type: type,
      });
    },
    queryKey: ["profile"],
    enabled: !!token,
  });
};

export default useGetEmployer;
