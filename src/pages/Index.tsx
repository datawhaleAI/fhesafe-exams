import ExamHeader from "@/components/ExamHeader";
import WalletConnect from "@/components/WalletConnect";
import heroImage from "@/assets/exam-hero.jpg";

const Index = () => {
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

      {/* Wallet Connect Section */}
      <section id="connect" className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Connect Your Student Wallet
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Secure your identity and access encrypted exam environments through blockchain authentication
          </p>
          
          <div className="max-w-md mx-auto">
            <WalletConnect />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
