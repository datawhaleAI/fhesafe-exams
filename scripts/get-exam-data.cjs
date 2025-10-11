const { ethers } = require("hardhat");

async function main() {
  console.log("📚 Fetching exam data from deployed contract...");

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
    // Get exam counter to know how many exams exist
    const examCounter = await examContract.examCounter();
    console.log(`📊 Total exams created: ${examCounter.toString()}`);

    // Fetch exam data for each exam
    for (let i = 0; i < examCounter; i++) {
      console.log(`\n📖 Exam ${i}:`);
      
      const examInfo = await examContract.getExamInfo(i);
      console.log(`   Name: ${examInfo.examName}`);
      console.log(`   Description: ${examInfo.examDescription}`);
      console.log(`   Instructor: ${examInfo.instructor}`);
      console.log(`   Start Time: ${new Date(Number(examInfo.startTime) * 1000).toLocaleString()}`);
      console.log(`   End Time: ${new Date(Number(examInfo.endTime) * 1000).toLocaleString()}`);
      console.log(`   Max Score: ${examInfo.maxScore}`);
      console.log(`   Passing Score: ${examInfo.passingScore}`);
      console.log(`   Time Limit: ${examInfo.timeLimit}`);
      console.log(`   Is Active: ${examInfo.isActive}`);
      console.log(`   Is Completed: ${examInfo.isCompleted}`);
    }

    // Get student counter
    const studentCounter = await examContract.studentCounter();
    console.log(`\n👥 Total students registered: ${studentCounter.toString()}`);

    // Get attempt counter
    const attemptCounter = await examContract.attemptCounter();
    console.log(`📝 Total exam attempts: ${attemptCounter.toString()}`);

    // Get certificate counter
    const certificateCounter = await examContract.certificateCounter();
    console.log(`🏆 Total certificates issued: ${certificateCounter.toString()}`);

    console.log("\n✅ Exam data fetched successfully!");
    console.log("\n🔧 Frontend Integration:");
    console.log("1. Update your frontend to use the contract address");
    console.log("2. Use the getExamInfo function to fetch exam details");
    console.log("3. Implement student registration and exam attempts");
    console.log("4. Test the complete end-to-end flow");

  } catch (error) {
    console.error("❌ Error fetching exam data:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
