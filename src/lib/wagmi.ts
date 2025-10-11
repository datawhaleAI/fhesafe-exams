import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Get project ID from environment variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 
                  import.meta.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 
                  '2ec9743d0d0cd7fb94dee1a7e6d33475';

export const config = getDefaultConfig({
  appName: 'FHESafe Exams',
  projectId: projectId,
  chains: [sepolia],
  ssr: false,
});
