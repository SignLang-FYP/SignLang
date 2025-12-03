'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          router.push('/login');
          return;
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>⌛</div>
          <p style={{ color: 'white', fontSize: '1.1rem' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            👋 Welcome, {user?.name}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
            Keep learning and improving your sign language skills
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.8)';
            e.currentTarget.style.borderColor = '#ff6b6b';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🚪 Logout
        </button>
      </div>

      {user && (
        <div className="card" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📧 Email</p>
              <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600' }}>{user.email}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📅 Joined</p>
              <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600' }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🎯 Status</p>
              <p style={{ color: '#a8e6cf', fontSize: '1.1rem', fontWeight: '600' }}>Active Learner</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          🚀 Choose Your Path
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          <Link href="/learning" style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Learn
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Start with interactive lessons and videos to master sign language
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: 'white', fontWeight: '600' }}>
                Get Started →
              </div>
            </div>
          </Link>

          <Link href="/evaluation" style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '2rem',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 87, 108, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Evaluate
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Test your knowledge with our comprehensive quizzes and assessments
                </p>
              </div>
              <div style={{ marginTop: '1rem', color: 'white', fontWeight: '600' }}>
                Take Quiz →
              </div>
            </div>
          </Link>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            padding: '2rem',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Progress
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>
                Track your learning journey and celebrate your achievements
              </p>
            </div>
            <div style={{ marginTop: '1rem', color: 'white', fontWeight: '600' }}>
              View Stats →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}