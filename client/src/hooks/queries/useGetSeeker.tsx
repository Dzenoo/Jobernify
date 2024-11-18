import { getSeekerProfile } from "@/lib/actions/seekers.actions";
import { useQuery, UseQueryOptions } from "react-query";
import useAuthentication from "../defaults/useAuthentication";
import { SeekerTypes } from "@/types";

interface SeekerProfile {
  seeker: SeekerTypes;
}

const useGetSeeker = (options?: UseQueryOptions<SeekerProfile>) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery<SeekerProfile>({
    queryFn: () => getSeekerProfile(token as string),
    queryKey: ["profile"],
    ...options,
  });
};

export default useGetSeeker;
