import { FileText, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExamHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-6">
      <div className="absolute inset-0 bg-white/5 opacity-20"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-12 h-12 animate-pulse" />
            <Lock className="w-8 h-8 animate-bounce" />
          </div>
          
          <Link to="/" className="block">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent hover:from-purple-200 hover:to-white transition-all duration-300">
              FHESafe Exams
            </h1>
          </Link>
          
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
              <Link to="/platform" className="flex items-center gap-2">
                进入考试平台 <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/learn">了解FHE技术</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;