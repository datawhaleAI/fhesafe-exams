import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { encryptUint32, encryptExamScore, encryptExamTime, initFHEVM } from '@/utils/fheEncryption';

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
        "name": "examId",
        "type": "uint256"
      },
      {
        "internalType": "externalEuint32",
        "name": "score",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "timeSpent",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "attemptExam",
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
  },
  {
    "inputs": [
      {
        "internalType": "externalEuint32",
        "name": "studentId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "registerStudent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || import.meta.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x04FA6321a2C2c255EEA836A1A4523e935E17959B';

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
      args: [examName, examDescription, BigInt(maxScore), BigInt(passingScore), BigInt(timeLimit), BigInt(duration)] as const,
    } as any);
  };

  const attemptExam = async (
    examId: number,
    score: number,
    timeSpent: number
  ) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    console.log('开始提交考试，examId:', examId, 'score:', score, 'timeSpent:', timeSpent);
    
    // 初始化FHEVM SDK
    await initFHEVM();
    
    // 获取用户地址
    const userAddress = address || '';
    
    // 加密分数和用时
    console.log('开始FHE加密过程...');
    console.log('- 原始分数:', score);
    console.log('- 原始用时:', timeSpent);
    console.log('- 合约地址:', CONTRACT_ADDRESS);
    console.log('- 用户地址:', userAddress);
    
    const encryptedScore = await encryptExamScore(score, CONTRACT_ADDRESS, userAddress);
    const encryptedTime = await encryptExamTime(timeSpent, CONTRACT_ADDRESS, userAddress);
    
    console.log('FHE加密完成，准备调用钱包签名...');
    console.log('加密分数结果:', encryptedScore);
    console.log('加密用时结果:', encryptedTime);
    console.log('加密分数值:', encryptedScore.encrypted);
    console.log('加密用时值:', encryptedTime.encrypted);
    console.log('加密证明:', encryptedScore.proof);
    
    // 调用合约的attemptExam函数，传入FHE加密数据
    const debugInfo = {
      timestamp: new Date().toISOString(),
      examId: examId,
      score: score,
      timeSpent: timeSpent,
      encryptedScore: encryptedScore.encrypted,
      encryptedTime: encryptedTime.encrypted,
      proof: encryptedScore.proof,
      contractAddress: CONTRACT_ADDRESS,
      userAddress: address
    };
    
    console.log('准备调用合约，参数:', debugInfo);
    
    // 保存调试信息到localStorage
    localStorage.setItem('fhe-debug-info', JSON.stringify(debugInfo, null, 2));
    
    // 验证参数格式
    console.log('参数格式验证:');
    console.log('- examId类型:', typeof examId, '值:', examId);
    console.log('- encryptedScore类型:', typeof encryptedScore.encrypted, '值:', encryptedScore.encrypted);
    console.log('- encryptedTime类型:', typeof encryptedTime.encrypted, '值:', encryptedTime.encrypted);
    console.log('- proof类型:', typeof encryptedScore.proof, '值:', encryptedScore.proof);
    
    // 确保参数格式正确 - 验证FHE加密数据
    console.log('验证FHE加密数据:');
    console.log('- 分数加密值:', encryptedScore.encrypted);
    console.log('- 用时加密值:', encryptedTime.encrypted);
    console.log('- 加密证明:', encryptedScore.proof);
    
    // 检查加密数据是否为零
    if (encryptedScore.encrypted === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      console.error('错误: 分数加密结果为全零！');
      throw new Error('FHE加密失败: 分数加密结果为全零');
    }
    
    if (encryptedTime.encrypted === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      console.error('错误: 用时加密结果为全零！');
      throw new Error('FHE加密失败: 用时加密结果为全零');
    }
    
    const args = [
      BigInt(examId), 
      encryptedScore.encrypted, // FHE加密的分数 (bytes32)
      encryptedTime.encrypted, // FHE加密的用时 (bytes32)
      encryptedScore.proof // FHE加密证明 (bytes)
    ];
    
    console.log('最终参数:', args);
    
    // 保存最终参数到localStorage
    localStorage.setItem('fhe-final-args', JSON.stringify(args.map(arg => arg.toString())));
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'attemptExam',
      args: args,
    } as any);
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

  const registerStudent = async (studentId: number) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    console.log('开始学生注册，studentId:', studentId);
    
    // 初始化FHEVM
    await initFHEVM();
    
    // 获取用户地址
    const userAddress = address || '';
    
    // 加密学生ID
    const encryptedStudentId = await encryptUint32(studentId, CONTRACT_ADDRESS, userAddress);
    
    console.log('FHE加密学生ID完成，准备调用钱包签名...');
    console.log('加密学生ID:', encryptedStudentId);
    
    // 调用合约的registerStudent函数
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'registerStudent',
      args: [
        encryptedStudentId.encrypted, // FHE加密的学生ID (bytes32)
        encryptedStudentId.proof // FHE加密证明 (bytes)
      ],
    } as any);
  };

  return {
    createExam,
    attemptExam,
    registerStudent,
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
    } as any);
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
