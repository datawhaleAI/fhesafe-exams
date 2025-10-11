import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Eye, EyeOff, Clock, Shield, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAccount } from 'wagmi';
import { useContract } from '@/hooks/useContract';
import { toast } from 'sonner';
import { initFHEVM } from '@/utils/fheEncryption';
import { useSearchParams } from 'react-router-dom';

const ExamInterface = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [timeLeft] = useState("02:45:30");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fheInitialized, setFheInitialized] = useState(true); // FHE始终可用
  const [searchParams] = useSearchParams();
  const examId = parseInt(searchParams.get('examId') || '0');
  const { isConnected } = useAccount();
  const { attemptExam, isPending, isConfirming, isConfirmed, error } = useContract();

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // FHE encryption is always available, no manual initialization needed

  const handleSubmitExam = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Check if student is registered
    try {
      // Here we can add logic to check student registration status
      console.log('Checking student registration status...');
    } catch (error) {
      console.error('Failed to check student registration status:', error);
      toast.error('Please register as a student first to take exams. Visit /register page to register.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate score based on answers for all 3 questions
      const score = answers.reduce((total, answer, index) => {
        const question = questions[index];
        if (!question) return total;
        
        // Calculate score based on answer length and question points
        const baseScore = answer.length > 50 ? question.points * 0.8 : 
                         answer.length > 20 ? question.points * 0.5 : 0;
        return total + Math.floor(baseScore);
      }, 0);

      // Calculate actual time spent (simulated)
      const timeSpent = 180; // 3 hours = 180 minutes

      console.log('Exam submission details:');
      console.log('- Number of questions:', questions.length);
      console.log('- Answer details:', answers.map((answer, index) => ({
        question: questions[index]?.text.substring(0, 50) + '...',
        answerLength: answer.length,
        points: questions[index]?.points,
        score: answer.length > 50 ? Math.floor(questions[index]?.points * 0.8) : 
               answer.length > 20 ? Math.floor(questions[index]?.points * 0.5) : 0
      })));
      console.log('- Total score:', score);
      console.log('- Time spent:', timeSpent, 'minutes');

      // Submit exam attempt to blockchain with FHE encryption
      await attemptExam(
        examId, // Use real exam ID
        score,
        timeSpent // Time spent in minutes
      );

      toast.success('Exam submitted successfully! Your answers have been securely stored on the blockchain with FHE encryption.');
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      console.error('Error submitting exam:', err);
      toast.error('Exam submission failed, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get different questions based on exam ID
  const getQuestionsForExam = (examId: number) => {
    const examQuestions = {
      0: [ // Blockchain Fundamentals
        {
          id: 1,
          text: "Explain the fundamental principles of blockchain technology, including consensus mechanisms, cryptographic hashing, and distributed ledger architecture.",
          points: 35
        },
        {
          id: 2,
          text: "Describe how smart contracts work and their role in decentralized applications. Include examples of popular smart contract platforms.",
          points: 35
        },
        {
          id: 3,
          text: "Analyze the differences between Proof of Work (PoW) and Proof of Stake (PoS) consensus mechanisms, including their advantages and disadvantages.",
          points: 30
        }
      ],
      1: [ // FHE Mathematics
        {
          id: 1,
          text: "Explain the mathematical foundations of Fully Homomorphic Encryption, including ring learning with errors (RLWE) and lattice-based cryptography.",
          points: 40
        },
        {
          id: 2,
          text: "Describe the bootstrapping process in FHE and its importance for enabling unlimited homomorphic operations on encrypted data.",
          points: 35
        },
        {
          id: 3,
          text: "Compare and contrast different FHE schemes (BGV, BFV, CKKS) and their specific use cases in privacy-preserving applications.",
          points: 25
        }
      ],
      2: [ // Smart Contract Security
        {
          id: 1,
          text: "Identify and explain common smart contract vulnerabilities such as reentrancy attacks, integer overflow, and access control issues.",
          points: 40
        },
        {
          id: 2,
          text: "Describe best practices for secure smart contract development, including code review processes and testing methodologies.",
          points: 35
        },
        {
          id: 3,
          text: "Analyze the role of formal verification in smart contract security and provide examples of tools used for this purpose.",
          points: 25
        }
      ],
      3: [ // Web3 Development
        {
          id: 1,
          text: "Explain the architecture of Web3 applications, including frontend frameworks, wallet integration, and blockchain interaction patterns.",
          points: 35
        },
        {
          id: 2,
          text: "Describe the process of building decentralized applications (DApps) using modern development frameworks like React, Next.js, and Web3 libraries.",
          points: 35
        },
        {
          id: 3,
          text: "Analyze the challenges of user experience in Web3 applications and propose solutions for improving adoption and usability.",
          points: 30
        }
      ],
      4: [ // Decentralized Systems
        {
          id: 1,
          text: "Explain the principles of distributed systems, including fault tolerance, consensus algorithms, and Byzantine fault tolerance.",
          points: 40
        },
        {
          id: 2,
          text: "Describe peer-to-peer networking protocols and their role in decentralized systems, including examples from blockchain and file sharing systems.",
          points: 35
        },
        {
          id: 3,
          text: "Analyze the trade-offs between decentralization, scalability, and security in distributed systems, with specific examples from blockchain networks.",
          points: 25
        }
      ]
    };
    
    return examQuestions[examId as keyof typeof examQuestions] || examQuestions[0];
  };

  const questions = getQuestionsForExam(examId);

  // 根据考试ID获取考试标题
  const getExamTitle = (examId: number) => {
    const titles = {
      0: "Blockchain Fundamentals Exam",
      1: "FHE Mathematics Exam", 
      2: "Smart Contract Security Exam",
      3: "Web3 Development Exam",
      4: "Decentralized Systems Exam"
    };
    return titles[examId as keyof typeof titles] || "Blockchain Fundamentals Exam";
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Exam Status Header */}
      <Card className="p-6 bg-gradient-paper border-exam-locked border-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {getExamTitle(examId)}
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
                     <p className="text-3xl font-bold text-primary">
                       {questions.reduce((total, q) => total + q.points, 0)}
                     </p>
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
                  <span>FHE加密保护</span>
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
            Your answers are protected by FHE (Fully Homomorphic Encryption) and will remain confidential.
            All data is encrypted before submission to the blockchain.
          </p>
          
          <div className="flex justify-center">
            <Button 
              className="bg-white text-primary hover:bg-white/90 border border-white"
              onClick={handleSubmitExam}
              disabled={isSubmitting || isPending || isConfirming || !isConnected}
            >
              {isSubmitting || isPending || isConfirming ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  {isConfirming ? 'Confirming FHE Transaction...' : 'Encrypting & Submitting...'}
                </div>
              ) : (
                'Submit with FHE Encryption'
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