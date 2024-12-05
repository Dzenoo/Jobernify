import { useQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";

import { getSeekerProfile } from "@/lib/actions/seekers.actions";

import useAuthentication from "../defaults/useAuthentication.hook";

import { SeekerTypes } from "@/types";

interface SeekerProfile {
  seeker: SeekerTypes;
}

const useGetSeeker = (options?: UseSuspenseQueryOptions<SeekerProfile>) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery<SeekerProfile>({
    queryFn: () => {
      if (!token) {
        throw new Error("Unauthorized!");
      }

      return getSeekerProfile(token);
    },
    queryKey: ["profile"],
    enabled: !!token,
    ...options,
  });
};

export default useGetSeeker;
