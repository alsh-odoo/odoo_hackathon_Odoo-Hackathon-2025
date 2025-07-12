
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, BookmarkPlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '../components/editor/RichTextEditor';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const QuestionDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [answerContent, setAnswerContent] = useState('');
  const [userVotes, setUserVotes] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  // Mock data - in real app this would come from API
  const question = {
    id: 1,
    title: 'How to implement authentication in React with JWT?',
    content: `
      <p>I am trying to implement JWT authentication in my React application but facing some issues with token storage and validation.</p>
      <p>Here's what I've tried so far:</p>
      <pre><code>const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const { token } = await response.json();
  localStorage.setItem('token', token);
};</code></pre>
      <p>The issue is that the token gets cleared when I refresh the page. How can I properly manage JWT tokens in React?</p>
    `,
    author: 'john_doe',
    authorAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff',
    votes: 15,
    views: 234,
    tags: ['React', 'JWT', 'Authentication'],
    createdAt: '2 hours ago',
    isAnswered: true
  };

  const answers = [
    {
      id: 1,
      content: `
        <p>The issue you're experiencing is common when using localStorage for JWT storage. Here are several approaches to solve this:</p>
        <h3>1. Use httpOnly cookies (Recommended)</h3>
        <p>Store JWT in httpOnly cookies to prevent XSS attacks:</p>
        <pre><code>// Server-side (Express)
app.post('/login', (req, res) => {
  const token = generateJWT(user);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
  res.json({ success: true });
});</code></pre>
        <h3>2. Implement token refresh mechanism</h3>
        <p>Use refresh tokens to maintain authentication state...</p>
      `,
      author: 'sarah_wilson',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=ec4899&color=fff',
      votes: 23,
      createdAt: '1 hour ago',
      isAccepted: true
    },
    {
      id: 2,
      content: `
        <p>Another approach is to use a state management library like Redux or Zustand to persist the authentication state:</p>
        <pre><code>// Using Zustand with persist middleware
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    token: null,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null })
  }),
  { name: 'auth-storage' }
));</code></pre>
      `,
      author: 'mike_chen',
      authorAvatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff',
      votes: 8,
      createdAt: '30 minutes ago',
      isAccepted: false
    }
  ];

  const handleVote = (type: 'up' | 'down', itemId: string, itemType: 'question' | 'answer') => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "You need to be logged in to vote.",
        variant: "destructive",
      });
      return;
    }

    const currentVote = userVotes[itemId];
    let newVote: 'up' | 'down' | null = type;
    
    if (currentVote === type) {
      newVote = null; // Remove vote if clicking same button
    }

    setUserVotes({ ...userVotes, [itemId]: newVote });
    
    toast({
      title: "Vote recorded",
      description: `Your ${type}vote has been recorded.`,
    });
  };

  const handleAcceptAnswer = (answerId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "You need to be logged in to accept answers.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Answer accepted",
      description: "This answer has been marked as the accepted solution.",
    });
  };

  const handleSubmitAnswer = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "You need to be logged in to post answers.",
        variant: "destructive",
      });
      return;
    }

    if (!answerContent.trim()) {
      toast({
        title: "Answer required",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting answer:', answerContent);
    setAnswerContent('');
    
    toast({
      title: "Answer posted",
      description: "Your answer has been posted successfully.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Question */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-2 min-w-[60px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up', 'question-1', 'question')}
                className={userVotes['question-1'] === 'up' ? 'text-green-600' : ''}
              >
                <ThumbsUp className="w-6 h-6" />
              </Button>
              <span className="text-xl font-bold">{question.votes}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down', 'question-1', 'question')}
                className={userVotes['question-1'] === 'down' ? 'text-red-600' : ''}
              >
                <ThumbsDown className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="sm">
                <BookmarkPlus className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
              
              <div 
                className="prose max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: question.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <span className="text-sm text-gray-500">{question.views} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={question.authorAvatar}
                    alt={question.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm">
                    <div className="font-medium">{question.author}</div>
                    <div className="text-gray-500">{question.createdAt}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{answers.length} Answers</h2>
        
        <div className="space-y-6">
          {answers.map((answer) => (
            <Card key={answer.id} className={answer.isAccepted ? 'border-green-200 bg-green-50' : ''}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Voting */}
                  <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote('up', `answer-${answer.id}`, 'answer')}
                      className={userVotes[`answer-${answer.id}`] === 'up' ? 'text-green-600' : ''}
                    >
                      <ThumbsUp className="w-6 h-6" />
                    </Button>
                    <span className="text-xl font-bold">{answer.votes}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote('down', `answer-${answer.id}`, 'answer')}
                      className={userVotes[`answer-${answer.id}`] === 'down' ? 'text-red-600' : ''}
                    >
                      <ThumbsDown className="w-6 h-6" />
                    </Button>
                    {user?.name === question.author && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAcceptAnswer(answer.id)}
                        className={answer.isAccepted ? 'text-green-600' : ''}
                      >
                        <Check className="w-6 h-6" />
                      </Button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {answer.isAccepted && (
                      <div className="flex items-center mb-2">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-600">Accepted Answer</span>
                      </div>
                    )}
                    
                    <div 
                      className="prose max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: answer.content }}
                    />

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <div className="flex items-center space-x-2">
                        <img
                          src={answer.authorAvatar}
                          alt={answer.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm">
                          <div className="font-medium">{answer.author}</div>
                          <div className="text-gray-500">{answer.createdAt}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Your Answer</h3>
        <Card>
          <CardContent className="p-6">
            <RichTextEditor
              content={answerContent}
              onChange={setAnswerContent}
              placeholder="Write your answer here..."
            />
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSubmitAnswer}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Post Your Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionDetail;
