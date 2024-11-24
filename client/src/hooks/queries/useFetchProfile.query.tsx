import { useQuery } from "react-query";
import { getSeekerProfile } from "@/lib/actions/seekers.actions";
import { getEmployerProfile } from "@/lib/actions/employers.actions";

const useFetchProfile = (userType: string, token: string | null) => {
  return useQuery({
    queryKey: ["profile", userType],
    queryFn: async () => {
      if (userType === "seeker") {
        return await getSeekerProfile(token as string);
      } else if (userType === "employer") {
        return await getEmployerProfile({
          type: "jobs",
          token: token as string,
        });
      }
    },
    enabled: !!userType && !!token,
  });
};

export default useFetchProfile;
