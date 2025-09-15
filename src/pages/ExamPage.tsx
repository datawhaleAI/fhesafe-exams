import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamInterface from "@/components/ExamInterface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ExamPage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Wallet Not Connected</h2>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to access the exam.
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
      {/* Navigation Header */}
      <header className="border-b border-border">
        <div className="container mx-auto max-w-6xl py-4 px-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="text-sm text-muted-foreground">
              Secure Exam Environment
            </div>
          </div>
        </div>
      </header>

      {/* Exam Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Cryptography & Blockchain Security Exam
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your answers are protected with Fully Homomorphic Encryption until the submission deadline
            </p>
          </div>
          
          <ExamInterface />
        </div>
      </section>
    </div>
  );
};

export default ExamPage;