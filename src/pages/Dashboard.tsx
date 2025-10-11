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
import { useExamData, useAllExams } from '@/hooks/useExamData';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { examCounter, studentCounter, attemptCounter, certificateCounter } = useExamData();
  const { exams, totalExams, isLoading: examsLoading } = useAllExams();

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
            <Link to="/register">Connect Wallet & Register</Link>
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
                  <p className="text-2xl font-bold">{examCounter}</p>
                  <p className="text-sm text-muted-foreground">Total Exams</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{attemptCounter}</p>
                  <p className="text-sm text-muted-foreground">Attempts</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{certificateCounter}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{studentCounter}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
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
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">Total Exams Available: {totalExams}</p>
                  <p className="text-sm text-muted-foreground">
                    Connect to Sepolia network to view and take exams
                  </p>
                </div>
                
                {/* 显示预定义的考试列表，基于考试数量 */}
                {totalExams > 0 && (
                  <>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Blockchain Fundamentals</h4>
                        <Badge variant="secondary">100 Points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive exam covering blockchain technology, smart contracts, and decentralized applications.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>2 months remaining</span>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/exam?examId=0">Start Exam</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">FHE Mathematics</h4>
                        <Badge variant="secondary">100 Points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Advanced mathematics and cryptography for Fully Homomorphic Encryption systems.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>2 months remaining</span>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/exam?examId=1">Start Exam</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Smart Contract Security</h4>
                        <Badge variant="secondary">100 Points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Security best practices, vulnerability assessment, and secure coding for smart contracts.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>2 months remaining</span>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/exam?examId=2">Start Exam</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Web3 Development</h4>
                        <Badge variant="secondary">100 Points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Frontend and backend development for Web3 applications using modern frameworks.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>2 months remaining</span>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/exam?examId=3">Start Exam</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Decentralized Systems</h4>
                        <Badge variant="secondary">100 Points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Distributed systems, consensus mechanisms, and peer-to-peer networking.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>2 months remaining</span>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/exam?examId=4">Start Exam</Link>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">System Status</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Total Exams Available</p>
                    <p className="text-xs text-muted-foreground">{examCounter} exams created</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Total Attempts</p>
                    <p className="text-xs text-muted-foreground">{attemptCounter} exam attempts</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Certificates Issued</p>
                    <p className="text-xs text-muted-foreground">{certificateCounter} certificates</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <User className="w-5 h-5 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Registered Students</p>
                    <p className="text-xs text-muted-foreground">{studentCounter} students</p>
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
                <Link to="/exam" className="flex flex-col items-center gap-2">
                  <Award className="w-6 h-6" />
                  <span>View Results</span>
                </Link>
              </Button>
              
                     <Button asChild variant="outline" className="h-auto p-4">
                       <Link to="/register" className="flex flex-col items-center gap-2">
                         <User className="w-6 h-6" />
                         <span>Register</span>
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
