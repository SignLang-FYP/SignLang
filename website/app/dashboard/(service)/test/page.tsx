"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [completedTests, setCompletedTests] = useState([]);
  const [testScore, setTestScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const tests = [
    // Urdu Tests
    {
      id: 1,
      title: "اردو ٹیسٹ ١ - بنیادی",
      category: "اردو",
      questions: [
        { id: 1, text: "پاکستان کے بانی کا نام بتائیں", correctSign: "قائداعظم" },
        { id: 2, text: "پاکستان کا قومی ترانہ کس نے لکھا", correctSign: "حفیظ جالندھری" },
        { id: 3, text: "پاکستان کا سب سے بڑا شہر", correctSign: "کراچی" },
      ]
    },
    {
      id: 2,
      title: "اردو ٹیسٹ ٢ - درمیانی",
      category: "اردو",
      questions: [
        { id: 1, text: "پاکستان کی سرکاری زبان", correctSign: "اردو" },
        { id: 2, text: "پاکستان کا دارالحکومت", correctSign: "اسلام آباد" },
        { id: 3, text: "پاکستان کا قومی جانور", correctSign: "مارخور" },
      ]
    },
    {
      id: 3,
      title: "اردو ٹیسٹ ٣ - مشکل",
      category: "اردو",
      questions: [
        { id: 1, text: "پاکستان کا قیام کب ہوا", correctSign: "١٤ اگست ١٩٤٧" },
        { id: 2, text: "پاکستان کا قومی پھول", correctSign: "چنبیلی" },
        { id: 3, text: "پاکستان کا قومی کھیل", correctSign: "ہاکی" },
      ]
    },
    // English Tests
    {
      id: 4,
      title: "English Test 1 - Basic",
      category: "English",
      questions: [
        { id: 1, text: "Show the sign for 'Hello'", correctSign: "Hello" },
        { id: 2, text: "Show the sign for 'Thank you'", correctSign: "Thank you" },
        { id: 3, text: "Show the sign for 'Please'", correctSign: "Please" },
      ]
    },
    {
      id: 5,
      title: "English Test 2 - Intermediate",
      category: "English",
      questions: [
        { id: 1, text: "Show the sign for 'Good morning'", correctSign: "Good morning" },
        { id: 2, text: "Show the sign for 'How are you?'", correctSign: "How are you" },
        { id: 3, text: "Show the sign for 'I am fine'", correctSign: "I am fine" },
      ]
    },
    {
      id: 6,
      title: "English Test 3 - Advanced",
      category: "English",
      questions: [
        { id: 1, text: "Show the sign for 'See you later'", correctSign: "See you later" },
        { id: 2, text: "Show the sign for 'Nice to meet you'", correctSign: "Nice to meet you" },
        { id: 3, text: "Show the sign for 'Have a good day'", correctSign: "Have a good day" },
      ]
    },
    // Math Tests
    {
      id: 7,
      title: "Math Test 1 - Numbers",
      category: "Math",
      questions: [
        { id: 1, text: "Show the sign for number '5'", correctSign: "5" },
        { id: 2, text: "Show the sign for number '10'", correctSign: "10" },
        { id: 3, text: "Show the sign for number '15'", correctSign: "15" },
      ]
    },
    {
      id: 8,
      title: "Math Test 2 - Operations",
      category: "Math",
      questions: [
        { id: 1, text: "Show the sign for 'Plus' (+)", correctSign: "Plus" },
        { id: 2, text: "Show the sign for 'Minus' (-)", correctSign: "Minus" },
        { id: 3, text: "Show the sign for 'Equals' (=)", correctSign: "Equals" },
      ]
    },
    {
      id: 9,
      title: "Math Test 3 - Advanced",
      category: "Math",
      questions: [
        { id: 1, text: "Show the sign for 'Multiply' (×)", correctSign: "Multiply" },
        { id: 2, text: "Show the sign for 'Divide' (÷)", correctSign: "Divide" },
        { id: 3, text: "Show the sign for 'Percentage' (%)", correctSign: "Percentage" },
      ]
    },
  ];

  const currentTest = selectedTest !== null ? tests[selectedTest] : null;
  const currentQuestion = currentTest ? currentTest.questions[currentQuestionIndex] : null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("کیمرہ تک رسائی نہیں ہو سکی۔ براہ کرم اجازت چیک کریں۔");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate AI verification (2 seconds)
    setTimeout(() => {
      // Randomly determine if sign is correct (in real app, this would be AI model)
      const isCorrect = Math.random() > 0.3; // 70% chance of being correct
      
      setVerificationResult(isCorrect);
      setIsVerifying(false);
      
      if (isCorrect) {
        setTestScore(testScore + 1);
      }
    }, 2000);
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setVerificationResult(null);
    } else {
      // Test completed
      setTestCompleted(true);
      setCompletedTests([...completedTests, selectedTest]);
      stopCamera();
    }
  };

  const handleSelectTest = (index) => {
    if (!completedTests.includes(index)) {
      setSelectedTest(index);
      setCurrentQuestionIndex(0);
      setTestScore(0);
      setTestCompleted(false);
      setVerificationResult(null);
    }
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setTestScore(0);
    setTestCompleted(false);
    setVerificationResult(null);
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
    setCurrentQuestionIndex(0);
    setTestScore(0);
    setTestCompleted(false);
    setVerificationResult(null);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Test Selection View
  if (selectedTest === null) {
    return (
      <div style={containerStyle}>
        <div style={testSelectionContainerStyle}>
          <h1 style={mainTitleStyle}>سائن لینگویج ٹیسٹ</h1>
          <p style={subtitleStyle}>اپنا ٹیسٹ منتخب کریں</p>
          
          <div style={testGridStyle}>
            {tests.map((test, index) => (
              <button
                key={test.id}
                onClick={() => handleSelectTest(index)}
                disabled={completedTests.includes(index)}
                style={{
                  ...testCardStyle,
                  ...(completedTests.includes(index) ? completedTestCardStyle : {}),
                }}
              >
                <div style={categoryBadgeStyle}>{test.category}</div>
                <div style={testNumberStyle}>{test.id}</div>
                <h3 style={testTitleStyle}>{test.title}</h3>
                <p style={testInfoStyle}>
                  {test.questions.length} سوالات
                </p>
                {completedTests.includes(index) && (
                  <div style={completedBadgeStyle}>✓ مکمل</div>
                )}
              </button>
            ))}
          </div>

          <Link href="/dashboard" style={backLinkStyle}>
            ← ڈیش بورڈ پر واپس
          </Link>
        </div>
      </div>
    );
  }

  // Test Completed View
  if (testCompleted) {
    const percentage = Math.round((testScore / currentTest.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div style={containerStyle}>
        <div style={resultContainerStyle}>
          <h1 style={resultTitleStyle}>
            {passed ? "مبارک ہو! 🎉" : "دوبارہ کوشش کریں"}
          </h1>
          <div style={scoreBoxStyle}>
            <div style={scoreLargeStyle}>{percentage}%</div>
            <div style={scoreDetailStyle}>
              {testScore} / {currentTest.questions.length} صحیح
            </div>
          </div>
          
          <p style={resultMessageStyle}>
            {passed 
              ? "آپ نے ٹیسٹ کامیابی سے پاس کر لیا!" 
              : "کم از کم 70% درکار ہے۔ دوبارہ کوشش کریں!"}
          </p>

          <div style={resultButtonsStyle}>
            <button onClick={handleRetakeTest} style={retakeButtonStyle}>
              دوبارہ کوشش کریں
            </button>
            <button onClick={handleBackToTests} style={backButtonStyle}>
              ٹیسٹس پر واپس
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test Taking View
  return (
    <div style={containerStyle}>
      <div style={testTakingContainerStyle}>
        {/* Header */}
        <div style={testHeaderStyle}>
          <div>
            <h2 style={testHeaderTitleStyle}>{currentTest.title}</h2>
            <p style={questionCountStyle}>
              سوال {currentQuestionIndex + 1} از {currentTest.questions.length}
            </p>
          </div>
          <button onClick={handleBackToTests} style={exitButtonStyle}>
            ✕ باہر نکلیں
          </button>
        </div>

        {/* Question */}
        <div style={questionBoxStyle}>
          <h1 style={questionTextStyle}>{currentQuestion.text}</h1>
        </div>

        {/* Camera and Instructions */}
        <div style={testContentStyle}>
          {/* Camera */}
          <div style={testCameraContainerStyle}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={videoStyle}
            />
            {!cameraActive && (
              <div style={cameraPlaceholderStyle}>
                <p style={{ marginBottom: "15px", fontSize: "1.1rem" }}>کیمرہ فعال نہیں</p>
                <button onClick={startCamera} style={cameraButtonStyle}>
                  کیمرہ شروع کریں
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div style={instructionsContainerStyle}>
            <h3 style={instructionsTitleStyle}>ہدایات:</h3>
            <ol style={instructionsListStyle}>
              <li>کیمرہ شروع کریں</li>
              <li>سوال کا جواب سائن لینگویج میں دکھائیں</li>
              <li>"تصدیق کریں" بٹن دبائیں</li>
              <li>نتیجہ دیکھیں</li>
            </ol>

            {verificationResult !== null && (
              <div style={{
                ...verificationBoxStyle,
                ...(verificationResult ? correctBoxStyle : incorrectBoxStyle),
              }}>
                <div style={verificationIconStyle}>
                  {verificationResult ? "✓" : "✗"}
                </div>
                <p style={verificationTextStyle}>
                  {verificationResult ? "صحیح! بہت اچھا" : "غلط، دوبارہ کوشش کریں"}
                </p>
              </div>
            )}

            <div style={actionButtonsStyle}>
              <button
                onClick={handleVerify}
                disabled={!cameraActive || isVerifying || verificationResult !== null}
                style={{
                  ...verifyButtonStyle,
                  ...((!cameraActive || isVerifying || verificationResult !== null) ? disabledButtonStyle : {}),
                }}
              >
                {isVerifying ? "تصدیق ہو رہی ہے..." : "تصدیق کریں"}
              </button>

              {verificationResult !== null && (
                <button onClick={handleNext} style={nextButtonStyle}>
                  {currentQuestionIndex < currentTest.questions.length - 1 ? "اگلا سوال →" : "ختم کریں"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "system-ui, sans-serif",
};

const testSelectionContainerStyle = {
  maxWidth: "900px",
  width: "100%",
  textAlign: "center" as const,
};

const mainTitleStyle = {
  fontSize: "3rem",
  fontWeight: "900",
  color: "white",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.3rem",
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: "40px",
};

const testGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
  marginBottom: "40px",
};

const testCardStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  border: "3px solid transparent",
  borderRadius: "20px",
  padding: "35px 25px",
  cursor: "pointer",
  transition: "all 0.3s",
  position: "relative" as const,
  color: "white",
};

const completedTestCardStyle = {
  background: "rgba(168, 255, 188, 0.25)",
  border: "3px solid #a8ffbc",
  cursor: "not-allowed",
  opacity: 0.7,
};

const testNumberStyle = {
  width: "60px",
  height: "60px",
  background: "rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.8rem",
  fontWeight: "800",
  margin: "0 auto 20px",
};

const testTitleStyle = {
  fontSize: "1.5rem",
  fontWeight: "700",
  marginBottom: "10px",
};

const testInfoStyle = {
  fontSize: "1rem",
  opacity: 0.9,
};

const completedBadgeStyle = {
  position: "absolute" as const,
  top: "15px",
  right: "15px",
  background: "#a8ffbc",
  color: "#667eea",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "0.85rem",
  fontWeight: "700",
};

const categoryBadgeStyle = {
  position: "absolute" as const,
  top: "15px",
  left: "15px",
  background: "rgba(255, 255, 255, 0.4)",
  color: "white",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "0.85rem",
  fontWeight: "700",
};

const backLinkStyle = {
  color: "#a8ffbc",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "1.1rem",
  display: "inline-block",
};

const testTakingContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
};

const testHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  color: "white",
};

const testHeaderTitleStyle = {
  fontSize: "1.8rem",
  fontWeight: "800",
  margin: 0,
};

const questionCountStyle = {
  fontSize: "1rem",
  opacity: 0.9,
  margin: "5px 0 0 0",
};

const exitButtonStyle = {
  background: "rgba(255, 100, 100, 0.3)",
  color: "white",
  border: "2px solid rgba(255, 100, 100, 0.6)",
  padding: "10px 20px",
  borderRadius: "10px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const questionBoxStyle = {
  background: "rgba(255, 255, 255, 0.25)",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "25px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
};

const questionTextStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "white",
  margin: 0,
  textAlign: "center" as const,
};

const testContentStyle = {
  display: "flex",
  gap: "25px",
};

const testCameraContainerStyle = {
  width: "550px",
  height: "550px",
  background: "rgba(0, 0, 0, 0.4)",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const cameraPlaceholderStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center" as const,
  color: "white",
};

const cameraButtonStyle = {
  background: "#a8ffbc",
  color: "#667eea",
  border: "none",
  padding: "12px 25px",
  borderRadius: "10px",
  fontSize: "1rem",
  fontWeight: "700",
  cursor: "pointer",
};

const instructionsContainerStyle = {
  flex: 1,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  padding: "30px",
  color: "white",
  display: "flex",
  flexDirection: "column" as const,
  gap: "20px",
};

const instructionsTitleStyle = {
  fontSize: "1.5rem",
  fontWeight: "700",
  margin: 0,
};

const instructionsListStyle = {
  fontSize: "1.1rem",
  lineHeight: "2",
  paddingRight: "25px",
  margin: 0,
};

const verificationBoxStyle = {
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center" as const,
  border: "3px solid",
};

const correctBoxStyle = {
  background: "rgba(168, 255, 188, 0.3)",
  borderColor: "#a8ffbc",
};

const incorrectBoxStyle = {
  background: "rgba(255, 100, 100, 0.3)",
  borderColor: "rgba(255, 100, 100, 0.8)",
};

const verificationIconStyle = {
  fontSize: "3rem",
  marginBottom: "10px",
};

const verificationTextStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  margin: 0,
};

const actionButtonsStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "15px",
  marginTop: "auto",
};

const verifyButtonStyle = {
  background: "#a8ffbc",
  color: "#667eea",
  border: "none",
  padding: "15px",
  borderRadius: "10px",
  fontSize: "1.2rem",
  fontWeight: "700",
  cursor: "pointer",
};

const disabledButtonStyle = {
  opacity: 0.5,
  cursor: "not-allowed",
};

const nextButtonStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  color: "white",
  border: "2px solid white",
  padding: "15px",
  borderRadius: "10px",
  fontSize: "1.2rem",
  fontWeight: "700",
  cursor: "pointer",
};

const resultContainerStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  padding: "50px",
  borderRadius: "20px",
  maxWidth: "600px",
  textAlign: "center" as const,
  color: "white",
};

const resultTitleStyle = {
  fontSize: "2.5rem",
  fontWeight: "900",
  marginBottom: "30px",
};

const scoreBoxStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  padding: "40px",
  borderRadius: "16px",
  marginBottom: "30px",
};

const scoreLargeStyle = {
  fontSize: "4rem",
  fontWeight: "900",
  marginBottom: "10px",
};

const scoreDetailStyle = {
  fontSize: "1.5rem",
  opacity: 0.9,
};

const resultMessageStyle = {
  fontSize: "1.3rem",
  marginBottom: "40px",
  lineHeight: "1.6",
};

const resultButtonsStyle = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
};

const retakeButtonStyle = {
  background: "#a8ffbc",
  color: "#667eea",
  border: "none",
  padding: "15px 30px",
  borderRadius: "10px",
  fontSize: "1.1rem",
  fontWeight: "700",
  cursor: "pointer",
};

const backButtonStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  color: "white",
  border: "2px solid white",
  padding: "15px 30px",
  borderRadius: "10px",
  fontSize: "1.1rem",
  fontWeight: "700",
  cursor: "pointer",
};