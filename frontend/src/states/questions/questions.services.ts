import API from "@/config/api/api";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";

export const useGetAllQuestions = () => {
  return useFetchData({ url: API.quesions.get });
};

export const useCreateQuestion = (onSuccess) => {
  return usePostData({
    url: API.quesions.post,
    mutationOptions: {
      onSuccess: (data) => {
        onSuccess(data);
      },
    },
    refetchQueries: [API.quesions.get],
  });
};

export const useGetQuestionByID = (id: string) => {
  return useFetchData({ url: `${API.quesions.get}/${id}`,enabled:!!id });
};
