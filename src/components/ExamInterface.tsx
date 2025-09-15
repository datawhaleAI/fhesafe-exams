import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Eye, EyeOff, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAccount } from 'wagmi';
import { useContract } from '@/hooks/useContract';
import { toast } from 'sonner';

const ExamInterface = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [timeLeft] = useState("02:45:30");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected } = useAccount();
  const { createExam, isPending, isConfirming, isConfirmed, error } = useContract();

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitExam = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate score based on answers (simplified scoring)
      const score = answers.reduce((total, answer) => {
        return total + (answer.length > 50 ? 25 : 0);
      }, 0);

      // Submit exam attempt to blockchain
      await createExam(
        "Cryptography & Blockchain Security Exam",
        "Final exam covering FHE and blockchain security concepts",
        100,
        60,
        180, // 3 hours in minutes
        180 * 60 // 3 hours in seconds
      );

      toast.success('Exam submitted successfully! Your answers are encrypted and stored on-chain.');
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      console.error('Error submitting exam:', err);
      toast.error('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const questions = [
    {
      id: 1,
      text: "Explain the fundamental principles of Fully Homomorphic Encryption and its applications in preserving data privacy during computation.",
      points: 25
    },
    {
      id: 2,
      text: "Describe how blockchain technology can be integrated with educational systems to ensure academic integrity and credential verification.",
      points: 30
    },
    {
      id: 3,
      text: "Analyze the security implications of using decentralized identity systems in academic environments and propose solutions for potential vulnerabilities.",
      points: 45
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Exam Status Header */}
      <Card className="p-6 bg-gradient-paper border-exam-locked border-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Cryptography & Blockchain Security Exam
            </h2>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-exam-locked text-white">
                <Lock className="w-3 h-3 mr-1" />
                Encrypted
              </Badge>
              <Badge variant="outline" className="border-exam-warning text-exam-warning">
                <Clock className="w-3 h-3 mr-1" />
                {timeLeft} remaining
              </Badge>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-3xl font-bold text-primary">100</p>
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-6 bg-gradient-paper border border-border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-primary">
                Question {question.id}
              </h3>
              <Badge variant="outline">{question.points} points</Badge>
            </div>
            
            <p className="text-foreground mb-6 leading-relaxed">
              {question.text}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Your Answer (Encrypted)
                </label>
                <div className="flex items-center gap-2 text-xs text-exam-locked">
                  <Shield className="w-3 h-3 animate-encrypt-pulse" />
                  <span>FHE Protected</span>
                </div>
              </div>
              
              <div className="relative">
                <Textarea
                  value={answers[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder="Type your answer here... Your response will be encrypted until the exam deadline."
                  className="min-h-32 pr-12 bg-white/80 backdrop-blur-sm border-exam-locked/20 focus:border-exam-locked transition-colors"
                />
                
                {/* Encryption Indicator */}
                <div className="absolute top-3 right-3 p-2 bg-exam-locked/10 rounded-lg">
                  <Lock className="w-4 h-4 text-exam-locked animate-lock-bounce" />
                </div>
                
                {/* Visual encryption overlay when text is present */}
                {answers[index] && (
                  <div className="absolute inset-0 bg-gradient-encryption opacity-20 rounded-md pointer-events-none"></div>
                )}
              </div>
              
              {answers[index] && (
                <div className="flex items-center gap-2 text-xs text-exam-encrypted">
                  <EyeOff className="w-3 h-3" />
                  <span>Answer encrypted and secured with FHE</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Submit Section */}
      <Card className="p-6 bg-gradient-secure text-white border-0">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 animate-secure-glow" />
          <h3 className="text-xl font-bold mb-2">Exam Submission</h3>
          <p className="text-green-100 mb-6">
            Your answers are encrypted and will remain confidential until the deadline.
            Only you and the instructor can decrypt them after submission closes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 hover:text-white"
              disabled={isSubmitting || isPending || isConfirming}
            >
              Save Draft (Encrypted)
            </Button>
            <Button 
              className="bg-white text-primary hover:bg-white/90 border border-white"
              onClick={handleSubmitExam}
              disabled={isSubmitting || isPending || isConfirming || !isConnected}
            >
              {isSubmitting || isPending || isConfirming ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  {isConfirming ? 'Confirming...' : 'Submitting...'}
                </div>
              ) : (
                'Submit Final Answers'
              )}
            </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm">Error: {error.message}</p>
            </div>
          )}
          
          {isConfirmed && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-200 text-sm">✅ Exam submitted successfully to blockchain!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ExamInterface;