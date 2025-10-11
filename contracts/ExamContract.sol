// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ExamContract is SepoliaConfig {
    using FHE for *;
    
    struct Student {
        euint32 studentId;
        euint32 examScore;
        ebool isRegistered;
        address walletAddress;
        uint256 registrationTime;
    }
    
    struct Exam {
        euint32 examId;
        euint32 maxScore;
        euint32 passingScore;
        ebool isActive;
        string examName;
        address instructor;
        uint256 startTime;
        uint256 endTime;
    }
    
    mapping(uint256 => Student) public students;
    mapping(uint256 => Exam) public exams;
    mapping(address => uint256) public studentAddressToId;
    
    uint256 public studentCounter;
    uint256 public examCounter;
    
    address public owner;
    
    event StudentRegistered(uint256 indexed studentId, address indexed walletAddress);
    event ExamCreated(uint256 indexed examId, address indexed instructor, string examName);
    event ExamCompleted(uint256 indexed examId, uint256 indexed studentId, euint32 score);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
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
            isRegistered: FHE.asEbool(true),
            walletAddress: msg.sender,
            registrationTime: block.timestamp
        });
        
        studentAddressToId[msg.sender] = newStudentId;
        
        emit StudentRegistered(newStudentId, msg.sender);
        return newStudentId;
    }
    
    function createExam(
        string memory _examName,
        uint256 _maxScore,
        uint256 _passingScore,
        uint256 _duration
    ) public onlyOwner returns (uint256) {
        require(bytes(_examName).length > 0, "Exam name cannot be empty");
        require(_maxScore > 0, "Max score must be positive");
        require(_passingScore <= _maxScore, "Passing score cannot exceed max score");
        
        uint256 examId = examCounter++;
        
        exams[examId] = Exam({
            examId: FHE.asEuint32(0),
            maxScore: FHE.asEuint32(0),
            passingScore: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            examName: _examName,
            instructor: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit ExamCreated(examId, msg.sender, _examName);
        return examId;
    }
    
    function submitExam(
        uint256 examId,
        externalEuint32 score,
        bytes calldata inputProof
    ) public {
        require(studentAddressToId[msg.sender] > 0, "Student not registered");
        require(exams[examId].instructor != address(0), "Exam does not exist");
        require(block.timestamp <= exams[examId].endTime, "Exam has ended");
        
        uint256 studentId = studentAddressToId[msg.sender];
        euint32 internalScore = FHE.fromExternal(score, inputProof);
        
        // Update student score
        students[studentId].examScore = FHE.add(students[studentId].examScore, internalScore);
        
        emit ExamCompleted(examId, studentId, internalScore);
    }
    
    function getStudentInfo(uint256 studentId) public view returns (
        address walletAddress,
        uint256 registrationTime
    ) {
        Student storage student = students[studentId];
        return (
            student.walletAddress,
            student.registrationTime
        );
    }
    
    function getExamInfo(uint256 examId) public view returns (
        string memory examName,
        address instructor,
        uint256 startTime,
        uint256 endTime
    ) {
        Exam storage exam = exams[examId];
        return (
            exam.examName,
            exam.instructor,
            exam.startTime,
            exam.endTime
        );
    }
}
