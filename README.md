# FHESafe Exams - Next-Generation Secure Examination Platform

A cutting-edge academic assessment system that combines the power of Fully Homomorphic Encryption (FHE) with blockchain technology to revolutionize how educational institutions conduct secure, transparent, and privacy-preserving examinations.

## 🔐 Key Features

- **Fully Homomorphic Encryption**: Student answers are encrypted and remain confidential until the submission deadline
- **Blockchain Integration**: All exam data is stored on-chain with immutable records
- **Wallet Authentication**: Secure student identity verification using Web3 wallets
- **Real-time Encryption**: Answers are encrypted in real-time as students type
- **Academic Integrity**: Tamper-proof exam records and certificate issuance
- **Privacy-First Design**: Student data remains private while ensuring transparency

## 🚀 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: Zama FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## 📋 Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/datawhaleAI/fhesafe-exams.git
   cd fhesafe-exams
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the following variables in `.env`:
   ```env
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Smart Contract Deployment

The project includes a Solidity smart contract (`contracts/FHESafeExams.sol`) that handles:

- Student registration and verification
- Exam creation and management
- Encrypted answer submission
- Certificate issuance
- Academic record tracking

### Deploy to Sepolia Testnet

1. **Install Hardhat** (if not already installed)
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

2. **Deploy the contract**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Update contract address** in your `.env` file

## 🎯 Usage

### For Students

1. **Connect Wallet**: Use MetaMask or compatible wallet to connect
2. **Register**: Complete student registration on-chain
3. **Take Exam**: Answer questions with real-time FHE encryption
4. **Submit**: Submit encrypted answers to the blockchain
5. **View Results**: Check your encrypted scores and certificates

### For Instructors

1. **Create Exams**: Set up new examinations with custom parameters
2. **Monitor Progress**: Track student submissions in real-time
3. **Issue Certificates**: Generate blockchain-verified certificates
4. **Verify Results**: Ensure academic integrity through on-chain records

## 🔒 Security Features

- **FHE Protection**: All sensitive data is encrypted using Fully Homomorphic Encryption
- **Blockchain Immutability**: Exam records cannot be tampered with
- **Wallet Authentication**: Secure identity verification
- **Privacy Preservation**: Student data remains confidential
- **Academic Integrity**: Transparent and verifiable examination process

## 📱 Supported Wallets

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And other WalletConnect-compatible wallets

## 🌐 Network Configuration

Currently configured for:
- **Ethereum Sepolia Testnet** (Chain ID: 11155111)
- **FHEVM Integration** for homomorphic encryption

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   Add all variables from your `.env` file to Vercel

4. **Deploy**
   - Click "Deploy" to start the deployment process

### Manual Deployment

```bash
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: [FHESafe Exams Docs](https://docs.fhesafe-exams.com)
- **Demo**: [Live Demo](https://fhesafe-exams.vercel.app)
- **Smart Contract**: [Contract Source](contracts/FHESafeExams.sol)

## ⚠️ Important Notes

- This is a demonstration project for educational purposes
- Always use testnet for development and testing
- Ensure you have sufficient Sepolia ETH for gas fees
- Keep your private keys secure and never commit them to version control

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ by the DataWhale AI team**
