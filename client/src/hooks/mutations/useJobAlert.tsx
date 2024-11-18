import { generateJobAlert } from "@/lib/actions/seekers.actions";
import { useMutation } from "react-query";
import useAuthentication from "../defaults/useAuthentication";
import { queryClient } from "@/context/react-query-client";
import { useToast } from "@/components/ui/use-toast";

const useJobAlert = () => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) =>
      generateJobAlert(formData, token!),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["profile"]);
      toast({ title: "Success", description: response.message });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.data?.response?.message });
    },
  });
};

export default useJobAlert;
