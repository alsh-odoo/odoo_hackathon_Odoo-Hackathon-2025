import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllQuestions } from "@/states/questions/questions.services";
import {
  Search
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: questionsList = [] } = useGetAllQuestions();

  const formattedQuestions = questionsList?.data?.map((q) => ({
    id: q.id,
    user_id: q.user_id || 1,
    title: q.title,
    description: q.description || q.content, // fallback if 'description' not available
    status: q.status || 1,
    created_at: q.created_at,
    updated_at: q.updated_at,

    tags: (q.tags || []).map((tag, index) => ({
      id: tag.id || index + 1,
      question_id: q.id,
      name: tag.name || tag, // fallback if tag is a string
      created_at: tag.created_at || q.created_at,
      updated_at: tag.updated_at || q.updated_at,
    })),

    answers: (q.answers || []).map((ans) => ({
      id: ans.id,
      user_id: ans.user_id,
      question_id: q.id,
      answer: ans.answer,
      upvotes: ans.upvotes || 0,
      downvotes: ans.downvotes || 0,
      accepted_status: ans.accepted_status || 0,
      created_at: ans.created_at,
      updated_at: ans.updated_at,
      user: {
        id: ans.user?.id,
        name: ans.user?.name,
        email: ans.user?.email,
        email_verified_at: ans.user?.email_verified_at || null,
        role: ans.user?.role || 1,
        created_at: ans.user?.created_at,
        updated_at: ans.user?.updated_at,
      },
    })),

    user: {
      id: q.user?.id,
      name: q.user?.name,
      email: q.user?.email,
      email_verified_at: q.user?.email_verified_at || null,
      role: q.user?.role || 1,
      created_at: q.user?.created_at,
      updated_at: q.user?.updated_at,
    },
  }));

  console.log("Formatted Questions", formattedQuestions);

  const filteredQuestions = formattedQuestions?.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Questions
          </h1>
          <p className="text-gray-600">
            Find answers to your technical questions
          </p>
        </div>
        <Button
          asChild
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Link to="/ask">Ask Question</Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search questions, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="votes">Most Votes</SelectItem>
            <SelectItem value="answers">Most Answers</SelectItem>
            <SelectItem value="views">Most Views</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions?.map((question) => (
          <Card
            key={question?.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Voting and Stats */}
                <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[80px]">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">
                      {question?.answers?.reduce(
                        (sum, ans) => sum + ans.upvotes - ans.downvotes,
                        0
                      ) || 0}
                    </span>
                    <span>votes</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${
                      question?.answers?.some((ans) => ans.accepted_status)
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    <span className="font-semibold text-lg">
                      {question?.answers?.length || 0}
                    </span>
                    <span>answers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">
                      {question?.views || 0}
                    </span>
                    <span>views</span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <Link
                    to={`/question/${question?.id}`}
                    className="block group"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {question?.title}
                    </h3>
                    <div
                      className="text-gray-600 text-sm mb-3 "
                      dangerouslySetInnerHTML={{
                        __html: question?.description.slice(0,500),
                      }}
                    >
                      {/* {question?.description} */}
                    </div>
                  </Link>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question?.tags?.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag?.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Author and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {question.user?.name || "Unknown"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {question.created_at
                        ? new Date(question.created_at).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">Load More Questions</Button>
      </div>
    </div>
  );
};

export default Home;
