// app/register/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.from("users").insert([
      {
        name: form.name,
        email: form.email,
        class: form.class,
        password: form.password, // ⚠️ Later we will hash this
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Account created successfully!");
    }
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
          Create an Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />

        {/* Class */}
        <input
          type="text"
          placeholder="Class (e.g., BSCS, 10th, etc.)"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
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
          onClick={handleRegister}
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
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>
        )}

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#a8ffbc", fontWeight: "bold" }}>
            Login
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
