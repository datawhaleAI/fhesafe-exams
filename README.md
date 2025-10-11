# 🎓 FHESafe Exams
### *Core Exam Platform with Fully Homomorphic Encryption*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)                                                     
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)                                                                            
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)                                                        
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA.svg)](https://ethereum.org/)                                                                  

---

## 🌟 **Core Features**

FHESafe Exams provides a streamlined exam platform using **Fully Homomorphic Encryption (FHE)** technology to ensure complete privacy during online examinations.

### 🔥 **Key Features**
- **Encrypted Exam Taking**: Student answers are encrypted in real-time
- **Blockchain Storage**: Exam records stored immutably on blockchain
- **Wallet Authentication**: Secure Web3 identity verification
- **Privacy Protection**: Answers remain encrypted until submission deadline

---

## 🛠️ **Technology Stack**

### **Frontend**
- ⚛️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** for styling
- ⚡ **Vite** for fast development
- 🔗 **RainbowKit** + **Wagmi** for Web3 integration

### **Blockchain**
- 🔐 **FHEVM** for homomorphic encryption
- ⛓️ **Ethereum Sepolia** testnet
- 📜 **Solidity** smart contracts
- 🔑 **Web3 Wallet** authentication

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

### **Installation**

```bash
# Clone the repository
git clone https://github.com/datawhaleAI/fhesafe-exams.git
cd fhesafe-exams

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Configuration**

Create a `.env` file with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Address
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

---

## 📚 **User Flow**

### **For Students** 🎓
1. **Connect** Web3 wallet to establish identity
2. **Access** dashboard to view available exams
3. **Take** exam with real-time FHE encryption
4. **Submit** encrypted answers to blockchain
5. **View** results and certificates

### **For Instructors** 👨‍🏫
1. **Create** examinations with custom parameters
2. **Monitor** student submissions
3. **Grade** encrypted answers using FHE operations
4. **Issue** blockchain-verified certificates

---

## 🔒 **Security Features**

| Feature                   | Description                          | Benefit                           |
| ------------------------- | ------------------------------------ | --------------------------------- |
| **FHE Encryption**        | Real-time answer encryption         | Complete privacy preservation     |
| **Blockchain Storage**    | Immutable exam records               | Tamper-proof integrity            |
| **Wallet Authentication** | Web3 identity verification           | Decentralized access              |
| **Smart Contract Logic**  | Automated exam management            | Trustless operations              |

---

## 🌐 **Supported Networks & Wallets**

### **Blockchain Networks**
- ✅ **Ethereum Sepolia** (Primary testnet)
- 🔄 **Ethereum Mainnet** (Coming soon)

### **Wallet Support**
- 🦊 **MetaMask** (Primary)
- 🔗 **WalletConnect** (Universal)
- 🏦 **Coinbase Wallet**
- 🌈 **Rainbow Wallet**

---

## 🚀 **Deployment**

### **Vercel (Recommended)**

```bash
# Deploy to Vercel
vercel --prod

# Configure environment variables in Vercel dashboard
```

### **Manual Deployment**

```bash
# Build for production
npm run build

# Preview locally
npm run preview
```

---

## 📊 **Project Structure**

```
fhesafe-exams/
├── 📁 src/
│   ├── 📁 components/          # UI components
│   ├── 📁 pages/              # Application pages
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utility libraries
│   └── 📁 assets/             # Static assets
├── 📁 contracts/              # Solidity smart contracts
├── 📁 public/                 # Public assets
└── 📄 package.json           # Dependencies
```

---

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 **License**

This project is licensed under the **MIT License** - see the LICENSE file for details.

### **Important Disclaimers**

* ⚠️ This is a **demonstration project** for educational purposes
* 🔒 Always use **testnet** for development and testing
* 💰 Ensure you have sufficient **Sepolia ETH** for gas fees
* 🔐 Keep your **private keys secure** and never commit them to version control

---

## 🆘 **Support & Resources**

### **Getting Help**
* 📖 **Documentation**: FHESafe Exams Docs
* 🐛 **Issues**: GitHub Issues
* 💬 **Discussions**: GitHub Discussions

### **External Resources**
* 🔗 **FHEVM Documentation**: Zama FHEVM Docs
* 🌐 **Ethereum Sepolia**: Sepolia Faucet
* 🦊 **MetaMask**: MetaMask Download

---

## 🏆 **Acknowledgments**

Built with 🔐 by the **DataWhale AI** team, focusing on core exam functionality with privacy-preserving technology.

**Special thanks to:**
* Zama team for FHEVM technology
* Rainbow team for wallet integration
* The open-source community for inspiration

---

**🌟 Star this repository if you find it helpful! 🌟**