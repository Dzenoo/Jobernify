import { useSuspenseQuery } from "@tanstack/react-query";

import { getSeekerProfile } from "@/lib/actions/seekers.actions";
import { getEmployerProfile } from "@/lib/actions/employers.actions";

const useFetchProfile = (userType: string, token: string | null) => {
  if (!userType || !token) return { data: null };

  return useSuspenseQuery({
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
    queryKey: ["profile", userType],
  });
};

export default useFetchProfile;
