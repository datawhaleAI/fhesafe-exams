import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ExamHeader from "@/components/ExamHeader";
import FeatureSection from "@/components/FeatureSection";
import heroImage from "@/assets/exam-hero.jpg";

const Index = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <ExamHeader />
      
      {/* Hero Image Section */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={heroImage} 
              alt="Secure exam platform with encryption technology" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-encryption opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  Privacy-First Examination
                </h2>
                <p className="text-lg opacity-90">
                  Powered by cutting-edge cryptography
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />
    </div>
  );
};

export default Index;
