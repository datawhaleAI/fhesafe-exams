import ExamInterface from "@/components/ExamInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ExamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border">
        <div className="container mx-auto max-w-6xl py-4 px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Exam Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Secure Exam Environment
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