import API from "@/config/api/api";
import usePostData from "@/hooks/usePostData";

export const usePostAnswer = () => {
  return usePostData({ url: API.answers.postAnswer });
};

export const useIncrementCounterInAnswerUpvote=(id:number)=>{
  return usePostData({url:`${API.answers.upvotes}/${id}/upvote`})
}
