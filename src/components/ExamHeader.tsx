import { Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExamHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-encryption py-20 px-6">
      <div className="absolute inset-0 bg-white/5 opacity-20"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 animate-secure-glow" />
            <Lock className="w-8 h-8 animate-lock-bounce" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Test Integrity with FHE
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionary exam platform using Fully Homomorphic Encryption to ensure 
            answers remain confidential until submission deadline
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <a href="#connect">Connect Student Wallet</a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
            >
              <a href="/learn">Learn About FHE</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;