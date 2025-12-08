// app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "1000px" }}>
          <h1
            style={{
              fontSize: "4.5rem",
              marginBottom: "20px",
              fontWeight: "900",
            }}
          >
            Welcome to <span style={{ color: "#a8ffbc" }}>SignLang </span>
          </h1>

          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: "40px",
              opacity: 0.9,
            }}
          >
            Learn Pakistani Sign Language with ease - Correctly perform PSL gestures through an interactive, real-time learning and evaluation platform.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/register">
              <button
                style={{
                  padding: "16px 40px",
                  fontSize: "1.3rem",
                  background: "#a8ffbc",
                  color: "#333",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                Get Started Free
              </button>
            </Link>

            <Link href="/login">
              <button
                style={{
                  padding: "16px 40px",
                  fontSize: "1.3rem",
                  background: "transparent",
                  color: "white",
                  border: "2px solid white",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "30px", opacity: 0.8 }}>
        © 2025 LearnHub • Built with Next.js
      </footer>
    </div>
  );
}