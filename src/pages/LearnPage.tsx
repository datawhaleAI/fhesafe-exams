import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Key } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureSection from "@/components/FeatureSection";

const LearnPage = () => {
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

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-encryption text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 animate-secure-glow" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What is Fully Homomorphic Encryption?
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            FHE allows computations on encrypted data without decrypting it, 
            ensuring complete privacy throughout the entire process.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            How FHE Protects Your Exam Answers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Instant Encryption</h3>
              <p className="text-muted-foreground">
                Your answers are encrypted the moment you type them, using advanced cryptographic algorithms.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Secure Processing</h3>
              <p className="text-muted-foreground">
                The system can verify and process your encrypted answers without ever seeing the actual content.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Key className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Controlled Decryption</h3>
              <p className="text-muted-foreground">
                Only authorized parties can decrypt answers after the submission deadline has passed.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <FeatureSection />

      {/* Technical Details */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Technical Implementation
          </h2>
          
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Zero-Knowledge Architecture
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our implementation uses lattice-based cryptography with CKKS and BGV schemes, 
                enabling arithmetic operations on encrypted data while maintaining semantic security.
                The system operates under a zero-knowledge model where even system administrators 
                cannot access exam content.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                Blockchain Integration
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Student wallets provide decentralized identity verification while smart contracts 
                manage exam timelines and automated decryption schedules. This ensures tamper-proof 
                exam administration without central authority control.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-secure text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Secure Exams?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Connect your wallet and try our demo exam to see FHE in action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <Link to="/">Try Demo Exam</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/exam">Start Real Exam</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnPage;