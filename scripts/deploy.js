const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting FHESafe Exams contract deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", ethers.utils.formatEther(balance), "ETH");
  
  if (balance.lt(ethers.utils.parseEther("0.01"))) {
    console.error("❌ Insufficient balance for deployment. Please add Sepolia ETH to your account.");
    process.exit(1);
  }
  
  // Deploy the contract
  console.log("📦 Deploying FHESafeExams contract...");
  const FHESafeExams = await ethers.getContractFactory("FHESafeExams");
  
  // Use deployer address as verifier for now
  const verifier = deployer.address;
  const fheSafeExams = await FHESafeExams.deploy(verifier);
  
  await fheSafeExams.deployed();
  
  console.log("✅ FHESafeExams deployed to:", fheSafeExams.address);
  console.log("🔍 Verifier address:", verifier);
  
  // Add deployer as instructor
  console.log("👨‍🏫 Adding deployer as instructor...");
  const addInstructorTx = await fheSafeExams.addInstructor(deployer.address);
  await addInstructorTx.wait();
  console.log("✅ Deployer added as instructor");
  
  // Save deployment info
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: fheSafeExams.address,
    verifier: verifier,
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
