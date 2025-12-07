"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const lessons = [
    { 
      id: 1, 
      title: "بنیادی سلام",
      question: "پاکستان کے بانی کا نام کیا تھا؟",
      answer: "پاکستان کے بانی کا نام قائداعظم ہے۔",
      image: "/images/lessons/lesson1.png"
    },
    { 
      id: 2, 
      title: "نمبرز ١-١٠",
      question: "پاکستان کا قومی ترانہ کس نے لکھا؟",
      answer: "حفیظ جالندھری نے لکھا۔",
      image: "/images/lessons/lesson2.png"
    },
    { 
      id: 3, 
      title: "خاندان کے افراد",
      question: "پاکستان کا سب سے بڑا شہر کونسا ہے؟",
      answer: "کراچی پاکستان کا سب سے بڑا شہر ہے۔",
      image: "/images/lessons/lesson3.png"
    },
    { 
      id: 4, 
      title: "رنگ",
      question: "پاکستان کی سرکاری زبان کونسی ہے؟",
      answer: "اردو پاکستان کی سرکاری زبان ہے۔",
      image: "/images/lessons/lesson4.png"
    },
  ];

  const currentLesson = lessons[selectedLesson];

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
      alert("Could not access camera. Please check permissions.");
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

  const handleNext = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else if (selectedLesson < lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1);
      setShowAnswer(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div style={containerStyle}>
      {/* Left Sidebar - Lessons List */}
      <div style={sidebarStyle}>
        <h2 style={sidebarTitleStyle}>Lessons</h2>
        <div style={lessonListStyle}>
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(index)}
              style={{
                ...lessonButtonStyle,
                ...(selectedLesson === index ? selectedLessonStyle : {}),
              }}
            >
              <span style={lessonNumberStyle}>{lesson.id}</span>
              {lesson.title}
            </button>
          ))}
        </div>
        <Link href="/dashboard" style={backLinkStyle}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Main Content Area */}
      <div style={mainContentStyle}>
        {/* Question and Next Button */}
        <div style={headerStyle}>
          <h1 style={questionStyle}>
            {showAnswer ? currentLesson.answer : currentLesson.question}
          </h1>
          <button 
            onClick={handleNext} 
            style={nextButtonStyle} 
            disabled={showAnswer && selectedLesson === lessons.length - 1}
          >
            {showAnswer ? (selectedLesson === lessons.length - 1 ? "ختم" : "اگلا →") : "اگلا →"}
          </button>
        </div>

        {/* Camera and Image Container */}
        <div style={contentRowStyle}>
          {/* Camera Window */}
          <div style={cameraContainerStyle}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={videoStyle}
            />
            {!cameraActive && (
              <div style={cameraPlaceholderStyle}>
                <p style={{ marginBottom: "15px", fontSize: "1.1rem" }}>Camera Not Active</p>
                <button onClick={startCamera} style={cameraButtonStyle}>
                  Start Camera
                </button>
              </div>
            )}
            {cameraActive && (
              <button onClick={stopCamera} style={stopCameraButtonStyle}>
                Stop Camera
              </button>
            )}
          </div>

          {/* Image Holder */}
          <div style={imageContainerStyle}>
            <img src={currentLesson.image} alt="Sign demonstration" style={imageStyle} />
          </div>
        </div>

        {/* Answer Text */}
        {showAnswer && (
          <div style={answerContainerStyle}>
            <p style={answerLabelStyle}>جواب:</p>
          </div>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  fontFamily: "system-ui, sans-serif",
};

const sidebarStyle = {
  width: "280px",
  background: "rgba(0, 0, 0, 0.3)",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column" as const,
  color: "white",
};

const sidebarTitleStyle = {
  fontSize: "1.8rem",
  fontWeight: "800",
  marginBottom: "25px",
  color: "white",
};

const lessonListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  flex: 1,
  overflowY: "auto" as const,
};

const lessonButtonStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  border: "2px solid transparent",
  padding: "15px 18px",
  borderRadius: "10px",
  color: "white",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "left" as const,
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const selectedLessonStyle = {
  background: "rgba(168, 255, 188, 0.25)",
  border: "2px solid #a8ffbc",
};

const lessonNumberStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  fontWeight: "700",
};

const backLinkStyle = {
  color: "#a8ffbc",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "1rem",
  marginTop: "20px",
  display: "inline-block",
};

const mainContentStyle = {
  flex: 1,
  padding: "40px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "25px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
};

const questionStyle = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "white",
  margin: 0,
  flex: 1,
};

const nextButtonStyle = {
  background: "#a8ffbc",
  color: "#667eea",
  border: "none",
  padding: "12px 30px",
  borderRadius: "10px",
  fontSize: "1.1rem",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.2s",
};

const contentRowStyle = {
  display: "flex",
  gap: "25px",
  flex: 1,
};

const cameraContainerStyle = {
  flex: "1",
  background: "rgba(0, 0, 0, 0.4)",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "500px",
  height: "500px"
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

const stopCameraButtonStyle = {
  position: "absolute" as const,
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(255, 100, 100, 0.9)",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "0.95rem",
  fontWeight: "600",
  cursor: "pointer",
};

const imageContainerStyle = {
  width: "200px",
  height: "250px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  display: "block",
};

const answerContainerStyle = {
  background: "rgba(168, 255, 188, 0.25)",
  padding: "20px",
  borderRadius: "12px",
  border: "2px solid #a8ffbc",
};

const answerLabelStyle = {
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "white",
  margin: 0,
  textAlign: "center" as const,
};