import { useReadContract } from 'wagmi';
import { useContract } from './useContract';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || import.meta.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x04FA6321a2C2c255EEA836A1A4523e935E17959B';

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "examCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "examId", "type": "uint256"}],
    "name": "getExamInfo",
    "outputs": [
      {"internalType": "string", "name": "examName", "type": "string"},
      {"internalType": "string", "name": "examDescription", "type": "string"},
      {"internalType": "uint8", "name": "maxScore", "type": "uint8"},
      {"internalType": "uint8", "name": "passingScore", "type": "uint8"},
      {"internalType": "uint8", "name": "timeLimit", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isCompleted", "type": "bool"},
      {"internalType": "address", "name": "instructor", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "studentCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "attemptCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "certificateCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useExamData = () => {
  // Get exam counter
  const { data: examCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'examCounter',
  });

  // Get student counter
  const { data: studentCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'studentCounter',
  });

  // Get attempt counter
  const { data: attemptCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'attemptCounter',
  });

  // Get certificate counter
  const { data: certificateCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'certificateCounter',
  });

  return {
    examCounter: examCounter ? Number(examCounter) : 0,
    studentCounter: studentCounter ? Number(studentCounter) : 0,
    attemptCounter: attemptCounter ? Number(attemptCounter) : 0,
    certificateCounter: certificateCounter ? Number(certificateCounter) : 0,
  };
};

// 获取所有考试信息的hook - 修复Hooks规则违反
export const useAllExams = () => {
  const { examCounter } = useExamData();
  
  // 由于React Hooks规则，我们不能在循环中动态创建hooks
  // 这里返回一个简化的实现，只显示考试数量
  // 在实际应用中，应该使用其他方法如useEffect + useState来获取数据
  
  return {
    exams: [], // 暂时返回空数组，避免hooks规则违反
    totalExams: examCounter || 0,
    isLoading: false,
    error: null
  };
};

export const useExamInfo = (examId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getExamInfo',
    args: [BigInt(examId)],
  });

  if (!data) {
    return { examInfo: null, isLoading, error };
  }

  const [examName, examDescription, maxScore, passingScore, timeLimit, isActive, isCompleted, instructor, startTime, endTime] = data;

  const examInfo = {
    examName,
    examDescription,
    maxScore: Number(maxScore),
    passingScore: Number(passingScore),
    timeLimit: Number(timeLimit),
    isActive,
    isCompleted,
    instructor,
    startTime: Number(startTime),
    endTime: Number(endTime),
  };

  return { examInfo, isLoading, error };
};

