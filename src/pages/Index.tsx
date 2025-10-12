import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  FileText, 
  Lock, 
  Brain, 
  Award, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Zap,
  User,
  Shield
} from "lucide-react";
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">FHESafe Exams</h1>
            </div>
            <div className="flex items-center gap-4">
              {isConnected ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Wallet Connected</p>
                    <p className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Powered by FHE Technology
            </Badge>
            
            <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
              Secure Academic Assessments with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Fully Homomorphic Encryption
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience the future of privacy-preserving education. Take exams with complete 
              confidentiality while maintaining academic integrity through blockchain technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isConnected ? (
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/register">Register as Student</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/register">Connect Wallet & Register</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Steps */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to start taking secure exams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Connect & Register</h3>
              <p className="text-muted-foreground">
                Connect your wallet and register as a student with FHE-encrypted identity.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Choose Exam</h3>
              <p className="text-muted-foreground">
                Select from available exams covering blockchain, FHE, and Web3 topics.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Take Exam</h3>
              <p className="text-muted-foreground">
                Answer questions with FHE encryption protecting your responses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connect your wallet and register to begin taking secure exams.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link to="/register" className="flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
