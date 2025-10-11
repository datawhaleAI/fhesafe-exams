#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupEnvironment() {
  console.log('🔧 FHESafe Exams Environment Setup');
  console.log('=====================================\n');
  
  console.log('This script will help you set up your environment variables.');
  console.log('Press Enter to use default values or type your own values.\n');
  
  // Check if .env already exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    const overwrite = await question('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Setup cancelled.');
      rl.close();
      return;
    }
  }
  
  // Get user input
  const chainId = await question('Chain ID (default: 11155111 for Sepolia): ') || '11155111';
  const rpcUrl = await question('RPC URL (default: Sepolia Infura): ') || 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY';
  const walletConnectId = await question('WalletConnect Project ID: ') || 'YOUR_WALLET_CONNECT_PROJECT_ID';
  const privateKey = await question('Private Key (for deployment): ') || 'your_private_key_here';
  const etherscanKey = await question('Etherscan API Key (optional): ') || 'your_etherscan_api_key_here';
  
  // Create .env content
  const envContent = `# Environment Variables for FHESafe Exams
# Generated on ${new Date().toISOString()}

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=${chainId}
NEXT_PUBLIC_RPC_URL=${rpcUrl}

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=${walletConnectId}

# Contract Address (will be set after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Private Key for Contract Deployment (NEVER commit to git)
# Use a testnet account with sufficient ETH for gas fees
# Get testnet ETH from: https://sepoliafaucet.com/
PRIVATE_KEY=${privateKey}

# FHEVM Configuration
NEXT_PUBLIC_FHEVM_RPC_URL=https://api.testnet.fhevm.xyz

# Etherscan API Key (optional, for contract verification)
ETHERSCAN_API_KEY=${etherscanKey}

# Gas Reporting (optional)
REPORT_GAS=false
`;

  // Write .env file
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log('📁 Location:', envPath);
    
    console.log('\n🔧 Next Steps:');
    console.log('1. Get Sepolia ETH from: https://sepoliafaucet.com/');
    console.log('2. Install dependencies: npm install');
    console.log('3. Compile contracts: npm run compile');
    console.log('4. Deploy to Sepolia: npm run deploy:sepolia');
    
    console.log('\n⚠️  Security Reminders:');
    console.log('- Never commit your .env file to git');
    console.log('- Use testnet accounts only');
    console.log('- Keep your private keys secure');
    
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
  
  rl.close();
}

// Run the setup
setupEnvironment().catch(console.error);
