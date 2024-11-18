import { queryClient } from "@/context/react-query-client";
import { useMutation } from "react-query";
import useAuthentication from "../defaults/useAuthentication";
import { useToast } from "@/components/ui/use-toast";
import { editEmployerProfile } from "@/lib/actions/employers.actions";

const useEditEmployer = () => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) =>
      editEmployerProfile(formData, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });
};

export default useEditEmployer;
