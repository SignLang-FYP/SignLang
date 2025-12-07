// app/dashboard/page.tsx
"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", fontWeight: "800" }}>
        Dashboard
      </h1>

      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* CARD 1 */}
        <div style={cardStyle}>
          <Link href="/test" style={linkTextStyle}>
            Test
          </Link>
        </div>

        {/* CARD 2 */}
        <div style={cardStyle}>
          <Link href="/lessons" style={linkTextStyle}>
            Lessons
          </Link>
        </div>

        {/* CARD 3 */}
        <div style={cardStyle}>
          <Link href="/progress" style={linkTextStyle}>
            Progress
          </Link>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.25)",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "18px",
  textAlign: "center" as const,
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
};

const linkTextStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1.4rem",
  fontWeight: "700",
};
