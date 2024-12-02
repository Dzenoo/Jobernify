import { useMutation } from "react-query";

import { queryClient } from "@/context/react-query-client";
import { followEmployer } from "@/lib/actions/seekers.actions";

import useAuthentication from "../defaults/useAuthentication.hook";

import { useToast } from "@/components/ui/use-toast";

const useFollowEmployer = (employerId: string) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: () => followEmployer(employerId, token as string),
    mutationKey: ["profile", "company", "companies"],
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", "company", "companies"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data.message });
    },
  });
};

export default useFollowEmployer;
