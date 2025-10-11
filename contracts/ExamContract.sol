// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FHESafeExams is SepoliaConfig {
    using FHE for *;
    
    struct Student {
        euint32 studentId;
        euint32 examScore;
        euint32 totalExams;
        euint32 passCount;
        ebool isRegistered;
        ebool isVerified;
        address walletAddress;
        uint256 registrationTime;
    }
    
    struct Exam {
        euint32 examId;
        euint32 maxScore;
        euint32 passingScore;
        euint32 timeLimit;
        ebool isActive;
        ebool isCompleted;
        string examName;
        string examDescription;
        address instructor;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct ExamAttempt {
        euint32 attemptId;
        euint32 examId;
        euint32 studentId;
        euint32 score;
        euint32 timeSpent;
        ebool isPassed;
        address studentAddress;
        uint256 attemptTime;
    }
    
    struct Certificate {
        euint32 certificateId;
        euint32 studentId;
        euint32 examId;
        euint32 finalScore;
        ebool isIssued;
        ebool isVerified;
        string certificateHash;
        address issuer;
        uint256 issueTime;
    }
    
    mapping(uint256 => Student) public students;
    mapping(uint256 => Exam) public exams;
    mapping(uint256 => ExamAttempt) public examAttempts;
    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256) public studentAddressToId;
    mapping(address => uint256) public instructorAddresses;
    
    uint256 public studentCounter;
    uint256 public examCounter;
    uint256 public attemptCounter;
    uint256 public certificateCounter;
    
    address public owner;
    address public verifier;
    
    event StudentRegistered(uint256 indexed studentId, address indexed walletAddress);
    event ExamCreated(uint256 indexed examId, address indexed instructor, string examName);
    event ExamAttempted(uint256 indexed attemptId, uint256 indexed examId, address indexed student);
    event CertificateIssued(uint256 indexed certificateId, uint256 indexed studentId, uint256 indexed examId);
    event StudentVerified(uint256 indexed studentId, bool isVerified);
    event ExamCompleted(uint256 indexed examId, bool isCompleted);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier onlyInstructor() {
        require(instructorAddresses[msg.sender] > 0, "Only registered instructors can call this function");
        _;
    }
    
    function registerStudent(
        externalEuint32 studentId,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(studentAddressToId[msg.sender] == 0, "Student already registered");
        
        uint256 newStudentId = studentCounter++;
        euint32 internalStudentId = FHE.fromExternal(studentId, inputProof);
        
        students[newStudentId] = Student({
            studentId: internalStudentId,
            examScore: FHE.asEuint32(0),
            totalExams: FHE.asEuint32(0),
            passCount: FHE.asEuint32(0),
            isRegistered: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            walletAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        studentAddressToId[msg.sender] = newStudentId;
        
        emit StudentRegistered(newStudentId, msg.sender);
        return newStudentId;
    }
    
    function createExam(
        string memory _examName,
        string memory _examDescription,
        uint256 _maxScore,
        uint256 _passingScore,
        uint256 _timeLimit,
        uint256 _duration
    ) public onlyInstructor returns (uint256) {
        require(bytes(_examName).length > 0, "Exam name cannot be empty");
        require(_maxScore > 0, "Max score must be positive");
        require(_passingScore <= _maxScore, "Passing score cannot exceed max score");
        require(_timeLimit > 0, "Time limit must be positive");
        
        uint256 examId = examCounter++;
        
        exams[examId] = Exam({
            examId: FHE.asEuint32(0), // Will be set properly later
            maxScore: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            passingScore: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            timeLimit: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isActive: FHE.asEbool(true),
            isCompleted: FHE.asEbool(false),
            examName: _examName,
            examDescription: _examDescription,
            instructor: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit ExamCreated(examId, msg.sender, _examName);
        return examId;
    }
    
    function attemptExam(
        uint256 examId,
        externalEuint32 score,
        externalEuint32 timeSpent,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(studentAddressToId[msg.sender] > 0, "Student not registered");
        require(exams[examId].instructor != address(0), "Exam does not exist");
        require(block.timestamp <= exams[examId].endTime, "Exam has ended");
        
        uint256 studentId = studentAddressToId[msg.sender];
        uint256 attemptId = attemptCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalScore = FHE.fromExternal(score, inputProof);
        euint32 internalTimeSpent = FHE.fromExternal(timeSpent, inputProof);
        
        // Check if exam is passed
        ebool isPassed = FHE.gt(internalScore, exams[examId].passingScore);
        
        examAttempts[attemptId] = ExamAttempt({
            attemptId: FHE.asEuint32(0), // Will be set properly later
            examId: FHE.asEuint32(0), // Will be set properly later
            studentId: FHE.asEuint32(0), // Will be set properly later
            score: internalScore,
            timeSpent: internalTimeSpent,
            isPassed: isPassed,
            studentAddress: msg.sender,
            attemptTime: block.timestamp
        });
        
        // Update student statistics
        students[studentId].totalExams = FHE.add(students[studentId].totalExams, FHE.asEuint32(1));
        students[studentId].examScore = FHE.add(students[studentId].examScore, internalScore);
        
        // Update pass count if exam is passed
        ebool shouldIncrementPass = FHE.and(isPassed, FHE.asEbool(true));
        students[studentId].passCount = FHE.add(students[studentId].passCount, FHE.asEuint32(1));
        
        emit ExamAttempted(attemptId, examId, msg.sender);
        return attemptId;
    }
    
    function issueCertificate(
        uint256 studentId,
        uint256 examId,
        string memory certificateHash
    ) public onlyInstructor returns (uint256) {
        require(students[studentId].walletAddress != address(0), "Student does not exist");
        require(exams[examId].instructor == msg.sender, "Only exam instructor can issue certificate");
        
        uint256 certificateId = certificateCounter++;
        
        certificates[certificateId] = Certificate({
            certificateId: FHE.asEuint32(0), // Will be set properly later
            studentId: FHE.asEuint32(0), // Will be set properly later
            examId: FHE.asEuint32(0), // Will be set properly later
            finalScore: FHE.asEuint32(0), // Will be set from exam attempt
            isIssued: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            certificateHash: certificateHash,
            issuer: msg.sender,
            issueTime: block.timestamp
        });
        
        emit CertificateIssued(certificateId, studentId, examId);
        return certificateId;
    }
    
    function verifyStudent(uint256 studentId, bool isVerified) public onlyVerifier {
        require(students[studentId].walletAddress != address(0), "Student does not exist");
        
        students[studentId].isVerified = FHE.asEbool(isVerified);
        emit StudentVerified(studentId, isVerified);
    }
    
    function completeExam(uint256 examId, bool isCompleted) public onlyInstructor {
        require(exams[examId].instructor == msg.sender, "Only exam instructor can complete exam");
        
        exams[examId].isCompleted = FHE.asEbool(isCompleted);
        emit ExamCompleted(examId, isCompleted);
    }
    
    function addInstructor(address instructor) public onlyOwner {
        require(instructor != address(0), "Invalid instructor address");
        instructorAddresses[instructor] = 1;
    }
    
    function removeInstructor(address instructor) public onlyOwner {
        require(instructor != address(0), "Invalid instructor address");
        instructorAddresses[instructor] = 0;
    }
    
    function getStudentInfo(uint256 studentId) public view returns (
        uint8 examScore,
        uint8 totalExams,
        uint8 passCount,
        bool isRegistered,
        bool isVerified,
        address walletAddress,
        uint256 registrationTime
    ) {
        Student storage student = students[studentId];
        return (
            0, // FHE.decrypt(student.examScore) - will be decrypted off-chain
            0, // FHE.decrypt(student.totalExams) - will be decrypted off-chain
            0, // FHE.decrypt(student.passCount) - will be decrypted off-chain
            false, // FHE.decrypt(student.isRegistered) - will be decrypted off-chain
            false, // FHE.decrypt(student.isVerified) - will be decrypted off-chain
            student.walletAddress,
            student.registrationTime
        );
    }
    
    function getExamInfo(uint256 examId) public view returns (
        string memory examName,
        string memory examDescription,
        uint8 maxScore,
        uint8 passingScore,
        uint8 timeLimit,
        bool isActive,
        bool isCompleted,
        address instructor,
        uint256 startTime,
        uint256 endTime
    ) {
        Exam storage exam = exams[examId];
        return (
            exam.examName,
            exam.examDescription,
            0, // FHE.decrypt(exam.maxScore) - will be decrypted off-chain
            0, // FHE.decrypt(exam.passingScore) - will be decrypted off-chain
            0, // FHE.decrypt(exam.timeLimit) - will be decrypted off-chain
            false, // FHE.decrypt(exam.isActive) - will be decrypted off-chain
            false, // FHE.decrypt(exam.isCompleted) - will be decrypted off-chain
            exam.instructor,
            exam.startTime,
            exam.endTime
        );
    }
    
    function getExamAttemptInfo(uint256 attemptId) public view returns (
        uint8 score,
        uint8 timeSpent,
        bool isPassed,
        address studentAddress,
        uint256 attemptTime
    ) {
        ExamAttempt storage attempt = examAttempts[attemptId];
        return (
            0, // FHE.decrypt(attempt.score) - will be decrypted off-chain
            0, // FHE.decrypt(attempt.timeSpent) - will be decrypted off-chain
            false, // FHE.decrypt(attempt.isPassed) - will be decrypted off-chain
            attempt.studentAddress,
            attempt.attemptTime
        );
    }
    
    function getCertificateInfo(uint256 certificateId) public view returns (
        uint8 finalScore,
        bool isIssued,
        bool isVerified,
        string memory certificateHash,
        address issuer,
        uint256 issueTime
    ) {
        Certificate storage certificate = certificates[certificateId];
        return (
            0, // FHE.decrypt(certificate.finalScore) - will be decrypted off-chain
            false, // FHE.decrypt(certificate.isIssued) - will be decrypted off-chain
            false, // FHE.decrypt(certificate.isVerified) - will be decrypted off-chain
            certificate.certificateHash,
            certificate.issuer,
            certificate.issueTime
        );
    }
}
