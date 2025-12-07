"use client";

import Link from "next/link";

export default function TestPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={boxStyle}>
        <h1 style={titleStyle}>Test</h1>
        <p style={textStyle}>
          Here you will take sign language recognition tests.
        </p>

        <Link href="/dashboard" style={backLinkStyle}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}

const boxStyle = {
  background: "rgba(255,255,255,0.2)",
  padding: "35px",
  borderRadius: "16px",
  textAlign: "center" as const,
  maxWidth: "420px",
  width: "100%",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "800",
  marginBottom: "15px",
};

const textStyle = {
  fontSize: "1.1rem",
  marginBottom: "25px",
};

const backLinkStyle = {
  color: "#a8ffbc",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "1.1rem",
};
