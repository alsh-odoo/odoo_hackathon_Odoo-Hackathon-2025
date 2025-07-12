
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useUserLogin } from '@/states/auth/auth.services';
import { useAuthStore } from '@/stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginSuccess = () => {
    setIsLoading(false);
    navigate('/');
  }
  const { mutate: userLogin } = useUserLogin(loginSuccess);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    userLogin(data)
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to your StackIt account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo accounts:</p>
            <p className="text-xs text-gray-500">
              Admin: admin@stackit.com / password123
            </p>
            <p className="text-xs text-gray-500">
              User: user@example.com / password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
