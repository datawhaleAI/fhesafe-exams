const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Initializing test data for FHESafe Exams...");

  // Get the contract address from environment
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("❌ Contract address not found in environment variables");
    process.exit(1);
  }

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Using account:", deployer.address);

  // Get contract instance
  const FHESafeExams = await ethers.getContractFactory("FHESafeExams");
  const examContract = FHESafeExams.attach(contractAddress);

  console.log("📋 Contract address:", contractAddress);

  try {
    // Add deployer as instructor
    console.log("👨‍🏫 Adding deployer as instructor...");
    const addInstructorTx = await examContract.addInstructor(deployer.address);
    await addInstructorTx.wait();
    console.log("✅ Instructor added successfully");

    // Create test exams (2 months duration = 60 days = 5,184,000 seconds)
    const twoMonthsInSeconds = 60 * 24 * 60 * 60; // 5,184,000 seconds

    const testExams = [
      {
        name: "Blockchain Fundamentals",
        description: "Comprehensive exam covering blockchain technology, smart contracts, and decentralized applications.",
        maxScore: 100,
        passingScore: 70,
        timeLimit: 3600 // 1 hour in seconds
      },
      {
        name: "FHE Mathematics",
        description: "Advanced mathematics and cryptography for Fully Homomorphic Encryption systems.",
        maxScore: 100,
        passingScore: 80,
        timeLimit: 5400 // 1.5 hours in seconds
      },
      {
        name: "Smart Contract Security",
        description: "Security best practices, vulnerability assessment, and secure coding for smart contracts.",
        maxScore: 100,
        passingScore: 75,
        timeLimit: 7200 // 2 hours in seconds
      },
      {
        name: "Web3 Development",
        description: "Frontend and backend development for Web3 applications using modern frameworks.",
        maxScore: 100,
        passingScore: 65,
        timeLimit: 4800 // 1.33 hours in seconds
      },
      {
        name: "Decentralized Systems",
        description: "Distributed systems, consensus mechanisms, and peer-to-peer networking.",
        maxScore: 100,
        passingScore: 85,
        timeLimit: 6000 // 1.67 hours in seconds
      }
    ];

    console.log("📚 Creating test exams...");
    for (let i = 0; i < testExams.length; i++) {
      const exam = testExams[i];
      console.log(`Creating exam ${i + 1}: ${exam.name}`);
      
      const createExamTx = await examContract.createExam(
        exam.name,
        exam.description,
        exam.maxScore,
        exam.passingScore,
        exam.timeLimit,
        twoMonthsInSeconds
      );
      await createExamTx.wait();
      
      console.log(`✅ Exam "${exam.name}" created successfully`);
    }

    console.log("\n🎉 Test data initialization completed!");
    console.log("📊 Summary:");
    console.log(`   - Instructor added: ${deployer.address}`);
    console.log(`   - Test exams created: ${testExams.length}`);
    console.log(`   - Exam duration: 2 months (${twoMonthsInSeconds} seconds)`);
    console.log(`   - Contract address: ${contractAddress}`);

    console.log("\n🔧 Next Steps:");
    console.log("1. Update your frontend to use the contract address");
    console.log("2. Test student registration and exam attempts");
    console.log("3. Verify FHE encryption is working correctly");

  } catch (error) {
    console.error("❌ Error initializing test data:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
