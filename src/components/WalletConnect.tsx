import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Wallet, Lock, CheckCircle } from "lucide-react";
import { useAccount } from 'wagmi';

const WalletConnect = () => {
  const { isConnected, address } = useAccount();

  if (isConnected && address) {
    return (
      <Card className="p-6 bg-gradient-secure text-white border-0 animate-secure-glow">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-300" />
          <h3 className="text-lg font-semibold">Wallet Connected</h3>
        </div>
        <p className="text-green-100 mb-4">
          Student ID: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
        <div className="flex items-center gap-2 text-sm text-green-200">
          <Lock className="w-4 h-4" />
          <span>Identity verified with blockchain</span>
        </div>
        <div className="mt-4">
          <ConnectButton />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-exam-locked border-2">
      <div className="text-center">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Connect Student Wallet</h3>
        <p className="text-muted-foreground mb-6">
          Secure authentication required for exam access
        </p>
        
        <div className="w-full">
          <ConnectButton />
        </div>
      </div>
    </Card>
  );
};

export default WalletConnect;