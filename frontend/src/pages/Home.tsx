
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, MessageSquare, ThumbsUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data - in real app this would come from API
  const questions = [
    {
      id: 1,
      title: 'How to implement authentication in React with JWT?',
      content: 'I am trying to implement JWT authentication in my React application but facing some issues with token storage and validation...',
      author: 'john_doe',
      authorAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff',
      votes: 15,
      answers: 3,
      views: 234,
      tags: ['React', 'JWT', 'Authentication'],
      createdAt: '2 hours ago',
      isAnswered: true
    },
    {
      id: 2,
      title: 'Best practices for state management in large React applications',
      content: 'What are the recommended patterns for managing state in large-scale React applications? Should I use Redux, Zustand, or Context API?',
      author: 'sarah_wilson',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=ec4899&color=fff',
      votes: 28,
      answers: 7,
      views: 567,
      tags: ['React', 'State Management', 'Redux', 'Zustand'],
      createdAt: '4 hours ago',
      isAnswered: true
    },
    {
      id: 3,
      title: 'TypeScript generic constraints with React components',
      content: 'I am struggling with TypeScript generic constraints when creating reusable React components...',
      author: 'mike_chen',
      authorAvatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff',
      votes: 12,
      answers: 2,
      views: 145,
      tags: ['TypeScript', 'React', 'Generics'],
      createdAt: '6 hours ago',
      isAnswered: false
    }
  ];

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Questions</h1>
          <p className="text-gray-600">Find answers to your technical questions</p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Voting and Stats */}
                <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[80px]">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">{question.votes}</span>
                    <span>votes</span>
                  </div>
                  <div className={`flex flex-col items-center ${question.isAnswered ? 'text-green-600' : ''}`}>
                    <span className="font-semibold text-lg">{question.answers}</span>
                    <span>answers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{question.views}</span>
                    <span>views</span>
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <Link to={`/question/${question.id}`} className="block group">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {question.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {question.content}
                    </p>
                  </Link>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={question.authorAvatar}
                        alt={question.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{question.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{question.createdAt}</span>
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
