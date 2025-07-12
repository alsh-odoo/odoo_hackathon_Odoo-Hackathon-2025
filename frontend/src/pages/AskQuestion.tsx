
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { RichTextEditor } from '../components/editor/RichTextEditor';
import { useToast } from '@/components/ui/use-toast';
import { useCreateQuestion } from '@/states/questions/questions.services';
import { useAuthStore } from '@/stores/authStore';


const questionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(30, 'Question body must be at least 30 characters'),
  tags: z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed'),
});

type QuestionFormData = z.infer<typeof questionSchema>;

const AskQuestion = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  const handleCreateQuestionSuccess = () => {
    toast({
      title: 'Question posted successfully',
      description: 'Your question has been posted. You can view it in your profile.',
    });
    navigate('/');
  }
  const { mutate: createQuestion } = useCreateQuestion(handleCreateQuestionSuccess)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    }
  });

  const availableTags = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java',
    'HTML', 'CSS', 'Vue.js', 'Angular', 'Next.js', 'Express',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'Git'
  ];

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };
  console.log("values", user);

  const onSubmit = async (data: QuestionFormData) => {
    createQuestion({
      ...data,
      description:data.content,
      user_id: user?.user?.id,
    })
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Ask a Question</CardTitle>
          <p className="text-gray-600">
            Be specific and imagine you're asking a question to another person
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. How to center a div with CSS?"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Be specific and concise. Your title should summarize the problem.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label>Question Body</Label>
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  setContent(newContent);
                  setValue('content', newContent);
                }}
                placeholder="Provide all the details about your problem. Include any error messages, code snippets, and what you've tried so far..."
              />
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Include all the information someone would need to answer your question.
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(tagInput)}
                    disabled={!tagInput.trim() || tags.length >= 5}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 10)
                    .map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(tag)}
                        disabled={tags.length >= 5}
                        className="text-xs"
                      >
                        {tag}
                      </Button>
                    ))}
                </div>
              </div>
              {errors.tags && (
                <p className="text-sm text-red-600">{errors.tags.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Add up to 5 tags to help categorize your question.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Post Question
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskQuestion;
