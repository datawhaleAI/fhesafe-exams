import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText, Lock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Platform = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl py-6 px-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">FHESafe Exams Platform</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {!isConnected ? (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to FHESafe Exam Platform
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Please connect your wallet to access the secure exam environment. 
                  We use Fully Homomorphic Encryption technology to protect your privacy.
                </p>
              </div>

              <Card className="p-8 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Connect Wallet</h3>
                  <p className="text-gray-600 mb-6">
                    Connect your digital wallet to start secure exams
                  </p>
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4">
                    <ConnectButton 
                      label="Connect Wallet to Start Exam"
                      showBalance={false}
                      chainStatus="none"
                      accountStatus="avatar"
                    />
                  </div>
                </div>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Fully Encrypted</h4>
                  <p className="text-sm text-gray-600">
                    Answers are fully encrypted before submission
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Identity Verification</h4>
                  <p className="text-sm text-gray-600">
                    Blockchain-based anti-cheating verification
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Trusted Certificates</h4>
                  <p className="text-sm text-gray-600">
                    Blockchain immutable certificates
                  </p>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Don't have a wallet? We recommend using the following wallets:
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <span>MetaMask</span>
                  <span>•</span>
                  <span>WalletConnect</span>
                  <span>•</span>
                  <span>Coinbase Wallet</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Wallet Connected
                </h2>
                <p className="text-gray-600">
                  Redirecting to your personal dashboard...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Platform;
