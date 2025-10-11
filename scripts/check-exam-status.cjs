const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Checking exam status...");
  
  const contractAddress = "0x2C92539FEb49aA375Ba47e73f0bb0CC6D4a74854";
  const [deployer] = await ethers.getSigners();
  
  console.log("📝 Using account:", deployer.address);
  console.log("📋 Contract address:", contractAddress);
  
  // Get the contract
  const ExamContract = await ethers.getContractFactory("FHESafeExams");
  const examContract = ExamContract.attach(contractAddress);
  
  // Check exam counter
  try {
    const examCounter = await examContract.examCounter();
    console.log("📊 Total exams:", examCounter.toString());
    
    // Check each exam
    for (let i = 0; i < examCounter; i++) {
      try {
        const examInfo = await examContract.getExamInfo(i);
        const currentTime = Math.floor(Date.now() / 1000);
        const endTime = examInfo.endTime.toNumber();
        const isActive = examInfo.isActive;
        const isCompleted = examInfo.isCompleted;
        
        console.log(`\n📚 Exam ${i}:`);
        console.log(`  Name: ${examInfo.examName}`);
        console.log(`  Description: ${examInfo.examDescription}`);
        console.log(`  Max Score: ${examInfo.maxScore}`);
        console.log(`  Passing Score: ${examInfo.passingScore}`);
        console.log(`  Time Limit: ${examInfo.timeLimit} minutes`);
        console.log(`  Is Active: ${isActive}`);
        console.log(`  Is Completed: ${isCompleted}`);
        console.log(`  Start Time: ${new Date(examInfo.startTime.toNumber() * 1000).toLocaleString()}`);
        console.log(`  End Time: ${new Date(endTime * 1000).toLocaleString()}`);
        console.log(`  Current Time: ${new Date(currentTime * 1000).toLocaleString()}`);
        console.log(`  Time Remaining: ${endTime - currentTime} seconds`);
        console.log(`  Status: ${endTime > currentTime ? '✅ Active' : '❌ Expired'}`);
        
        if (endTime <= currentTime) {
          console.log(`  ⚠️  Exam ${i} has expired!`);
        }
      } catch (error) {
        console.log(`❌ Error fetching exam ${i}:`, error.message);
      }
    }
  } catch (error) {
    console.log("❌ Error fetching exam data:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
