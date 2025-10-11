const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting FHESafe Exams contract deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Insufficient balance for deployment. Please add Sepolia ETH to your account.");
    process.exit(1);
  }
  
        // Deploy the contract
        console.log("📦 Deploying FHESafeExams...");
        const FHESafeExams = await ethers.getContractFactory("FHESafeExams");

        // Use deployer address as verifier for testing
        const examContract = await FHESafeExams.deploy(deployer.address);
        await examContract.waitForDeployment();
  
  const contractAddress = await examContract.getAddress();
  console.log("✅ ExamContract deployed to:", contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber()
  };
  
  console.log("📋 Deployment Summary:");
  console.log("   Contract Address:", deploymentInfo.contractAddress);
  console.log("   Network:", deploymentInfo.network);
  console.log("   Deployer:", deploymentInfo.deployer);
  console.log("   Block Number:", deploymentInfo.blockNumber);
  
  console.log("\n🔧 Next Steps:");
  console.log("1. Update your .env file with the contract address:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${deploymentInfo.contractAddress}`);
  console.log("2. Verify the contract on Etherscan (optional)");
  console.log("3. Test the contract functions");
  
  console.log("\n⚠️  Security Reminders:");
  console.log("- Never commit private keys to version control");
  console.log("- Use testnet accounts only");
  console.log("- Keep your private keys secure");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
