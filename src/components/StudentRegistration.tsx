import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import { useAccount } from 'wagmi';
import { useContract } from '@/hooks/useContract';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const StudentRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { isConnected, address } = useAccount();
  const { registerStudent, isPending, isConfirming, isConfirmed, error } = useContract();

  const handleRegister = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsRegistering(true);
    try {
      // Generate a simple student ID from wallet address
      // Take the last 4 characters of the address as student ID
      const addressSuffix = address?.slice(-4) || '0000';
      let studentId = parseInt(addressSuffix, 16); // Convert hex to number
      
      // Ensure student ID is not zero (FHE encryption issue with zero values)
      if (studentId === 0) {
        studentId = 1; // Use 1 as default for zero addresses
      }
      
      console.log('Generating student ID from wallet address:', studentId, 'from address:', address);
      
      await registerStudent(studentId);
      toast.success('Student registration successful! You can now take exams.');
    } catch (err) {
      console.error('Error registering student:', err);
      toast.error('Student registration failed, please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Wallet Not Connected</h2>
          <p className="text-muted-foreground mb-4">
            Please connect your wallet to register as a student.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl py-6 px-6">
          <h1 className="text-2xl font-bold text-primary">Student Registration</h1>
        </div>
      </header>

      <main className="py-8 px-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-2">Register as Student</h2>
              <p className="text-muted-foreground">
                Register with your wallet address to access exams. Your information will be encrypted using FHE.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Wallet Address</h3>
                    <p className="text-xs text-gray-600 mt-1 font-mono">
                      {address}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Your wallet address will be used as your student identity
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">FHE Protection</h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Your wallet address will be used to generate a student ID that is encrypted 
                      before being stored on the blockchain, ensuring your privacy is protected.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegister}
                disabled={isRegistering || isPending || isConfirming}
                className="w-full"
              >
                {isRegistering || isPending || isConfirming ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isConfirming ? 'Confirming Registration...' : 'Registering...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Register as Student
                  </div>
                )}
              </Button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">Error: {error.message}</p>
                </div>
              )}

              {isConfirmed && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-green-600 text-sm">Registration confirmed! You can now take exams.</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/dashboard">
                        <User className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Wallet Address: <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentRegistration;
