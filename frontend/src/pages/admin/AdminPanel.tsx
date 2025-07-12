
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  MessageSquare,
  AlertTriangle,
  Ban,
  CheckCircle,
  XCircle,
  Download,
  Send,
  Search
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [announcement, setAnnouncement] = useState('');

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalQuestions: 3456,
    totalAnswers: 8901,
    pendingReports: 23
  };

  const recentQuestions = [
    {
      id: 1,
      title: 'How to implement authentication in React?',
      author: 'john_doe',
      status: 'active',
      reports: 0,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Best practices for state management',
      author: 'sarah_wilson',
      status: 'flagged',
      reports: 2,
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      title: 'TypeScript generic constraints help needed',
      author: 'mike_chen',
      status: 'active',
      reports: 0,
      createdAt: '2024-01-14'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      questionsCount: 15,
      answersCount: 23,
      reputation: 1250,
      joinedAt: '2023-06-15'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      status: 'banned',
      questionsCount: 8,
      answersCount: 45,
      reputation: 890,
      joinedAt: '2023-08-22'
    }
  ];

  const reports = [
    {
      id: 1,
      type: 'question',
      itemId: 2,
      reason: 'Spam',
      reportedBy: 'user123',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      type: 'answer',
      itemId: 5,
      reason: 'Inappropriate content',
      reportedBy: 'moderator1',
      status: 'pending',
      createdAt: '2024-01-14'
    }
  ];

  const handleRejectContent = (id: number, type: 'question' | 'answer') => {
    console.log(`Rejecting ${type} ${id}`);
    toast({
      title: "Content rejected",
      description: `The ${type} has been rejected and removed.`,
    });
  };

  const handleBanUser = (userId: number) => {
    console.log(`Banning user ${userId}`);
    toast({
      title: "User banned",
      description: "The user has been banned from the platform.",
    });
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) {
      toast({
        title: "Error",
        description: "Please enter an announcement message.",
        variant: "destructive",
      });
      return;
    }

    console.log('Sending announcement:', announcement);
    setAnnouncement('');
    toast({
      title: "Announcement sent",
      description: "Your announcement has been sent to all users.",
    });
  };

  const handleDownloadReport = (type: string) => {
    console.log(`Downloading ${type} report`);
    toast({
      title: "Download started",
      description: `${type} report is being prepared for download.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage your StackIt community</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalQuestions.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalAnswers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Answers</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.pendingReports}</div>
              <div className="text-sm text-gray-600">Pending Reports</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{question.title}</TableCell>
                      <TableCell>{question.author}</TableCell>
                      <TableCell>
                        <Badge variant={question.status === 'active' ? 'default' : 'destructive'}>
                          {question.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{question.reports}</TableCell>
                      <TableCell>{question.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectContent(question.id, 'question')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Answers</TableHead>
                    <TableHead>Reputation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.questionsCount}</TableCell>
                      <TableCell>{user.answersCount}</TableCell>
                      <TableCell>{user.reputation}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBanUser(user.id)}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Content Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium capitalize">{report.type}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.status}</Badge>
                      </TableCell>
                      <TableCell>{report.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Send Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your announcement message..."
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={4}
              />
              <Button onClick={handleSendAnnouncement}>
                <Send className="w-4 h-4 mr-2" />
                Send to All Users
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleDownloadReport('User Activity')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  User Activity Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleDownloadReport('Content')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Content Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleDownloadReport('Moderation')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Moderation Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Questions today:</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span>New users today:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Active users:</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending moderation:</span>
                  <span className="font-semibold text-orange-600">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
