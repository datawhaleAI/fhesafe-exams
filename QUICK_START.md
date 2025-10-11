# 🚀 FHESafe Exams - Quick Start Guide

## 📋 Prerequisites

- Node.js 18+
- A Web3 wallet (MetaMask recommended)
- Sepolia testnet ETH

## ⚡ Quick Setup (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
npm run setup-env
```
This interactive script will help you configure your environment variables.

### 3. Get Testnet ETH
Visit [Sepolia Faucet](https://sepoliafaucet.com/) and get some testnet ETH.

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

1. **Copy environment template:**
   ```bash
   cp env.template .env
   ```

2. **Edit .env file** with your values:
   ```env
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   PRIVATE_KEY=your_private_key_here
   ```

## 🚀 Deploy Contract

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy:sepolia
```

## 🧪 Test the Application

```bash
# Start development server
npm run dev
```

## 📁 Project Structure

```
fhesafe-exams/
├── .env                    # Your environment variables (gitignored)
├── env.template           # Environment template
├── contracts/             # Smart contracts
├── scripts/              # Deployment & setup scripts
├── src/                  # Frontend source code
└── public/               # Static assets
```

## 🔒 Security Notes

- ✅ `.env` file is automatically ignored by git
- ✅ Use testnet accounts only
- ✅ Never commit private keys
- ✅ Keep your private keys secure

## 🆘 Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review the [README.md](./README.md) for project overview
- Ensure you have sufficient Sepolia ETH for gas fees

## 🎯 Next Steps

1. Deploy your contract
2. Update frontend with contract address
3. Test the exam functionality
4. Customize for your needs

---

**Happy coding! 🎉**
