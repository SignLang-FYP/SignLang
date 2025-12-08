import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignLang Academy - Learn Pakistan Sign Language",
  description: "Master sign language with interactive lessons and evaluations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
       

<header
  style={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "1.5rem 2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  }}
>
  <nav
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Link
      href="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textDecoration: "none",
      }}
    >
      <span style={{ fontSize: "2rem" }}>🤟</span>
      <h1
        style={{
          color: "white",
          fontSize: "1.8rem",
          fontWeight: "700",
          letterSpacing: "-0.5px",
        }}
      >
        SignLang<span style={{ color: "#a8e6cf" }}> Academy</span>
      </h1>
    </Link>
  </nav>
</header>


        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
