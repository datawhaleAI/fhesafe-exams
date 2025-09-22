import { useAccount } from 'wagmi';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Award, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  User,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Wallet Not Connected</h2>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to access the dashboard.
          </p>
          <Button asChild>
            <Link to="/">Connect Wallet</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">FHESafe Exams</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Student ID</p>
                <p className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome to Your Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your exams, track progress, and view certificates securely.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Exams</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Exams */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Exams */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Available Exams</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Cryptography & Blockchain Security</h4>
                    <Badge variant="secondary">100 Points</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Final exam covering FHE and blockchain security concepts
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>3 hours remaining</span>
                    </div>
                    <Button asChild size="sm">
                      <Link to="/exam">Start Exam</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Advanced FHE Applications</h4>
                    <Badge variant="secondary">75 Points</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Practical applications of fully homomorphic encryption
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>2 days remaining</span>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/exam">Start Exam</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed: Web3 Security Fundamentals</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Score: 92/100</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Certificate Issued: Blockchain Developer</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Started: Smart Contract Security</p>
                    <p className="text-xs text-muted-foreground">3 days ago • In Progress</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto p-4">
                <Link to="/exam" className="flex flex-col items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Take New Exam</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4">
                <Link to="/certificates" className="flex flex-col items-center gap-2">
                  <Award className="w-6 h-6" />
                  <span>View Certificates</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4">
                <Link to="/profile" className="flex flex-col items-center gap-2">
                  <User className="w-6 h-6" />
                  <span>Update Profile</span>
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
