import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Zap
} from "lucide-react";
import heroImage from "@/assets/exam-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6">
        <div className="absolute inset-0 bg-white/5 opacity-20"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="w-12 h-12 animate-pulse" />
              <Lock className="w-8 h-8 animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              FHESafe Exams
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionary exam platform using Fully Homomorphic Encryption to ensure 
              answers remain confidential until submission deadline
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/platform">Enter Exam Platform</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/platform">Connect Wallet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FHESafe Exams?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use cutting-edge Fully Homomorphic Encryption technology to provide 
              truly secure online examination solutions for educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Complete Privacy Protection</h3>
              <p className="text-gray-600">
                Answers are fully encrypted before submission, even system administrators 
                cannot view them, ensuring exam fairness
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Anti-Cheating</h3>
              <p className="text-gray-600">
                Blockchain-based identity verification and encryption technology 
                effectively prevent proxy testing and cheating
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Certificates</h3>
              <p className="text-gray-600">
                Blockchain-based immutable certificates ensure the authenticity 
                of academic credentials and grades
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Fully Homomorphic Encryption Technology
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fully Homomorphic Encryption (FHE) allows computation on encrypted data 
                without decryption, which means:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Answers are fully encrypted before submission</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">System can process encrypted data</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Only authorized personnel can decrypt</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Ensures absolute fairness in the exam process</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Technical Advantages</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">Zero-Knowledge Proofs</div>
                      <div className="opacity-80">Privacy Protection</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">Blockchain Verification</div>
                      <div className="opacity-80">Immutable</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">Smart Contracts</div>
                      <div className="opacity-80">Automated Execution</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="font-semibold">Decentralized</div>
                      <div className="opacity-80">Highly Secure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Secure Exam Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us and experience next-generation encrypted examination technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              <Link to="/platform" className="flex items-center gap-2">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <Link to="/platform" className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
