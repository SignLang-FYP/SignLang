// app/login/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    // 1. Find user by email
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", form.email)
      .single();

    if (error || !data) {
      setMessage("User not found!");
      setLoading(false);
      return;
    }

    // 2. Check password match
    if (data.password !== form.password) {
      setMessage("Incorrect password!");
      setLoading(false);
      return;
    }

        
    if (data.password == form.password && data.email == form.email) {
        setMessage("Login successful!");
        router.push("/dashboard");

    }
    
    setLoading(false);

   
  };

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
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
            marginBottom: "20px",
            fontWeight: "800",
          }}
        >
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "15px",
            background: "#a8ffbc",
            border: "none",
            borderRadius: "40px",
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#333",
            cursor: "pointer",
          }}
        >
          {loading ? "Checking..." : "Login"}
        </button>

        {message && (
          <p style={{ textAlign: "center", marginTop: "15px" }}>{message}</p>
        )}

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link href="/register" style={{ color: "#a8ffbc", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "1rem",
};
