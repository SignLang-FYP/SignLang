// app/learning/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LearningPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const mockLessons = [
          { id: 1, title: 'Introduction to Sign Language', content: 'Learn the fundamentals of sign language, its history, and why it matters. Discover how sign language is used by millions of people worldwide as their primary language.', completed: false, duration: '12 min' },
          { id: 2, title: 'Hand Shapes & Positions', content: 'Master the different hand shapes and positions that form the foundation of sign language. Understanding these basics is crucial for proper communication.', completed: false, duration: '15 min' },
          { id: 3, title: 'Common Signs & Phrases', content: 'Learn 20 of the most commonly used signs and phrases. Perfect for beginners to start communicating right away!', completed: true, duration: '18 min' },
          { id: 4, title: 'Facial Expressions', content: 'Explore how facial expressions and body language complement sign language. These non-manual signals are essential for proper communication.', completed: false, duration: '14 min' },
        ];
        setLessons(mockLessons);
        setCurrentLesson(mockLessons[0]);
      } catch (err) {
        console.error('Error fetching lessons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const markAsComplete = async (lessonId: number) => {
    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: true }),
      });

      if (response.ok) {
        setLessons(
          lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          )
        );
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>📚</div>
          <p style={{ color: 'white', fontSize: '1.1rem' }}>Loading lessons...</p>
        </div>
      </div>
    );
  }

  const completedCount = lessons.filter(l => l.completed).length;

  return (
    <div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
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

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          📚 Learning Path
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.8)' }}>
          <p style={{ fontSize: '1.1rem' }}>Progress: {completedCount} of {lessons.length} lessons completed</p>
          <div style={{
            height: '8px',
            width: '200px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(completedCount / lessons.length) * 100}%`,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Sidebar with lesson list */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          height: 'fit-content',
        }}>
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>📖 Lessons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                style={{
                  padding: '1rem',
                  backgroundColor: currentLesson?.id === lesson.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: currentLesson?.id === lesson.id ? 'white' : 'rgba(255,255,255,0.9)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: currentLesson?.id === lesson.id ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  background: currentLesson?.id === lesson.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  if (currentLesson?.id !== lesson.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLesson?.id !== lesson.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{lesson.title}</p>
                    <small style={{ opacity: 0.8 }}>⏱️ {lesson.duration}</small>
                  </div>
                  <span>{lesson.completed ? '✅' : '⏳'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div>
          {currentLesson && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  background: currentLesson.completed 
                    ? 'linear-gradient(135deg, #a8e6cf 0%, #56ab2f 100%)'
                    : 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                }}>
                  {currentLesson.completed ? '✅ Completed' : '⏳ In Progress'}
                </span>
              </div>

              <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
                {currentLesson.title}
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {currentLesson.content}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎥</div>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Video player would load here</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => markAsComplete(currentLesson.id)}
                disabled={currentLesson.completed}
                style={{
                  padding: '1rem 2rem',
                  background: currentLesson.completed 
                    ? 'linear-gradient(135deg, #a8e6cf 0%, #56ab2f 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: currentLesson.completed ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
                onMouseEnter={(e) => {
                  if (!currentLesson.completed) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!currentLesson.completed) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {currentLesson.completed ? '✅ Already Completed' : '🎉 Mark as Complete'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}