import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "instructor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "examName",
        "type": "string"
      }
    ],
    "name": "ExamCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "attemptId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "ExamAttempted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_examName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_examDescription",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_maxScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_passingScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timeLimit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      }
    ],
    "name": "createExam",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      }
    ],
    "name": "getStudentInfo",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "examScore",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalExams",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "passCount",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "registrationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "examId",
        "type": "uint256"
      }
    ],
    "name": "getExamInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "examName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "examDescription",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "maxScore",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "passingScore",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "timeLimit",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "instructor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2b6';

export const useContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const createExam = async (
    examName: string,
    examDescription: string,
    maxScore: number,
    passingScore: number,
    timeLimit: number,
    duration: number
  ) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'createExam',
      args: [examName, examDescription, maxScore, passingScore, timeLimit, duration],
    });
  };

  const getStudentInfo = (studentId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getStudentInfo',
      args: [BigInt(studentId)],
    });
  };

  const getExamInfo = (examId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getExamInfo',
      args: [BigInt(examId)],
    });
  };

  return {
    createExam,
    getStudentInfo,
    getExamInfo,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

export const useStudentRegistration = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const registerStudent = async (studentId: number) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    // Note: In a real implementation, this would use FHE encryption
    // For now, we'll simulate the registration
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'registerStudent',
      args: [BigInt(studentId)],
    });
  };

  return {
    registerStudent,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
