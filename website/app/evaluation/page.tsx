// app/evaluation/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EvaluationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();

  const questions = [
    {
      question: 'How do you sign "Hello" in sign language?',
      options: ['Wave your hand', 'Raise both hands', 'Move hand from forehead', 'Touch your chest'],
      correct: 0,
    },
    {
      question: 'What is the primary component of sign language?',
      options: ['Voice', 'Hand shapes and movements', 'Facial expressions', 'Written text'],
      correct: 1,
    },
    {
      question: 'Which country uses American Sign Language (ASL)?',
      options: ['Canada only', 'United States and Canada', 'All English-speaking countries', 'Worldwide'],
      correct: 1,
    },
    {
      question: 'What does the palm orientation mean in sign language?',
      options: ['Direction the palm faces during signing', 'Skin color', 'Age of the signer', 'Location of signs'],
      correct: 0,
    },
    {
      question: 'How many hand shapes are used in ASL?',
      options: ['10', '26', 'Over 1000', 'Unlimited'],
      correct: 2,
    },
  ];

  const handleAnswerClick = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return '🏆 Perfect! You\'re a sign language master!';
    if (percentage >= 80) return '🎊 Excellent work! Outstanding performance!';
    if (percentage >= 60) return '👍 Good job! Keep practicing to improve!';
    return '💪 Keep learning! You\'ll get better with practice!';
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
    if (percentage >= 80) return 'linear-gradient(135deg, #a8e6cf 0%, #56ab2f 100%)';
    if (percentage >= 60) return 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)';
    return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
  };

  return (
    <div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard" style={{
          color: 'white',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.05rem',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.transform = 'translateX(-5px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
        ✅ Sign Language Evaluation
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.05rem' }}>
        Test your knowledge with this comprehensive quiz
      </p>

      {showScore ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          animation: 'slideIn 0.5s ease-out',
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              animation: 'spin 1s ease-in-out',
            }}>
              🎉
            </div>
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Quiz Complete!
            </h2>
            <div style={{
              background: getScoreColor(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              display: 'block',
            }}>
              {score} / {questions.length}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              {Math.round((score / questions.length) * 100)}%
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <p style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600' }}>
              {getScoreMessage()}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              onClick={restartQuiz}
              style={{
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              🔄 Retake Quiz
            </button>
            <Link href="/dashboard" style={{
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.4)';
            }}
            >
              📊 Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'slideIn 0.5s ease-out',
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
                Score: {score}/{questions.length}
              </p>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>

          <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', lineHeight: '1.4' }}>
            {questions[currentQuestion].question}
          </h2>

          <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                  padding: '1.2rem',
                  backgroundColor: answers[currentQuestion] === index ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)',
                  color: answers[currentQuestion] === index ? 'white' : 'rgba(255,255,255,0.9)',
                  border: answers[currentQuestion] === index ? 'none' : '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (answers[currentQuestion] !== index) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers[currentQuestion] !== index) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}