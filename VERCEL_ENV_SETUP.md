# Vercel Environment Variables Setup

## Required Environment Variables

To deploy the FHESafe Exams platform to Vercel, you need to configure the following environment variables in your Vercel dashboard:

### 1. Blockchain Configuration
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
```

### 2. Wallet Connect Configuration
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

### 3. Contract Address (Already Deployed)
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x04FA6321a2C2c255EEA836A1A4523e935E17959B
```

### 4. FHEVM Configuration
```
NEXT_PUBLIC_FHEVM_RPC_URL=https://api.testnet.fhevm.xyz
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the values above
5. Make sure to set them for Production, Preview, and Development environments

## Contract Information

- **Contract Address**: `0x04FA6321a2C2c255EEA836A1A4523e935E17959B`
- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **Total Exams**: 5 (initialized with test data)
- **Exam Duration**: 2 months (until December 10, 2025)

## Test Data

The contract has been initialized with 5 test exams:
1. Blockchain Fundamentals
2. FHE Mathematics  
3. Smart Contract Security
4. Web3 Development
5. Decentralized Systems

All exams are valid for 2 months from deployment date.
