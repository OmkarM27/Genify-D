import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Share2, 
  MessageSquare, 
  ArrowUpRight, 
  Clock, 
  Sparkles 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} clicked`, 'info');
  };

  // Stats data
  const stats = [
    { 
      label: 'Total Content', 
      value: '32', 
      change: '+24%', 
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      positive: true 
    },
    { 
      label: 'Social Posts', 
      value: '18', 
      change: '+12%', 
      icon: <Share2 className="h-5 w-5 text-teal-500" />,
      positive: true
    },
    { 
      label: 'AI Chats', 
      value: '145', 
      change: '+32%', 
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      positive: true 
    },
    { 
      label: 'Performance', 
      value: '94%', 
      change: '-2%', 
      icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
      positive: false
    },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      title: 'Blog post generated',
      time: '2 hours ago',
      type: 'ai-writer',
    },
    {
      id: 2,
      title: 'Instagram caption created',
      time: '5 hours ago',
      type: 'social-tools',
    },
    {
      id: 3,
      title: 'Project "Q3 Marketing" updated',
      time: 'Yesterday',
      type: 'projects',
    },
    {
      id: 4,
      title: 'Chat with assistant',
      time: 'Yesterday',
      type: 'assistant',
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: 'Create a blog post',
      icon: <FileText className="h-5 w-5" />,
      path: '/ai-writer',
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    },
    {
      title: 'Generate social content',
      icon: <Share2 className="h-5 w-5" />,
      path: '/social-tools',
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
    },
    {
      title: 'Chat with assistant',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/assistant',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your content today
          </p>
        </div>
        <Button 
          variant="primary"
          leftIcon={<Sparkles size={16} />}
          onClick={() => handleAction('Create Content')}
        >
          Create Content
        </Button>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-xs font-medium ${
                    stat.positive ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    vs last week
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleAction(action.title)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                        {action.icon}
                      </div>
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start pb-4 last:pb-0 last:border-0 border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="mr-4">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      {activity.type === 'ai-writer' && <FileText size={16} />}
                      {activity.type === 'social-tools' && <Share2 size={16} />}
                      {activity.type === 'projects' && <TrendingUp size={16} />}
                      {activity.type === 'assistant' && <MessageSquare size={16} />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAction(`View ${activity.title}`)}
                  >
                    View
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;