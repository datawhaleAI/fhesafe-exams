# 🚀 FHESafe Exams Deployment Guide

## 🔐 Security First

**⚠️ CRITICAL: Never commit private keys to version control!**

This guide ensures your private keys and sensitive data remain secure.

## 📋 Prerequisites

1. **Node.js 18+** and npm
2. **Sepolia ETH** for gas fees (get from [Sepolia Faucet](https://sepoliafaucet.com/))
3. **Infura API Key** (optional, for RPC endpoint)
4. **WalletConnect Project ID** (for wallet integration)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

### 3. Configure Environment Variables

Edit your `.env` file with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Address (will be set after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Private Key for Contract Deployment (NEVER commit to git)
# Use a testnet account with sufficient ETH for gas fees
PRIVATE_KEY=your_private_key_here

# FHEVM Configuration
NEXT_PUBLIC_FHEVM_RPC_URL=https://api.testnet.fhevm.xyz

# Etherscan API Key (optional, for contract verification)
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### 4. Get Testnet ETH

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Connect your wallet
3. Request testnet ETH (you'll need ~0.1 ETH for deployment)

### 5. Deploy Contract

```bash
# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### 6. Update Frontend

After deployment, update your `.env` file with the deployed contract address:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

## 🔒 Security Best Practices

### ✅ DO:
- Use testnet accounts only
- Keep private keys in `.env` file (already in `.gitignore`)
- Use environment variables for all sensitive data
- Test with small amounts first
- Verify contracts on Etherscan

### ❌ DON'T:
- Never commit private keys to git
- Don't use mainnet accounts for testing
- Don't share private keys
- Don't hardcode sensitive data in source code

## 📁 File Structure

```
fhesafe-exams/
├── .env                    # Your environment variables (gitignored)
├── .env.example           # Template for environment variables
├── contracts/             # Solidity smart contracts
├── scripts/              # Deployment scripts
├── hardhat.config.ts     # Hardhat configuration
└── .gitignore           # Git ignore rules (includes .env)
```

## 🚨 Emergency Procedures

If you accidentally commit a private key:

1. **Immediately** change the compromised key
2. Remove the key from git history
3. Update all services using that key
4. Never use that key again

## 🧪 Testing

After deployment, test your contract:

```bash
# Run tests
npx hardhat test

# Verify contract on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS VERIFIER_ADDRESS
```

## 📞 Support

If you encounter issues:

1. Check your `.env` file configuration
2. Ensure you have sufficient Sepolia ETH
3. Verify your RPC endpoint is working
4. Check the deployment logs for errors

## 🔗 Useful Links

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Etherscan Sepolia](https://sepolia.etherscan.io/)
- [FHEVM Documentation](https://docs.fhevm.xyz/)
- [Hardhat Documentation](https://hardhat.org/docs)

---

**Remember: Security is everyone's responsibility! 🔐**
