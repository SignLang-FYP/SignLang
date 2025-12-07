"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ProgressPage() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    class: "",
    age: "",
  });
  const [stats, setStats] = useState({
    testsGiven: 0,
    testsPassed: 0,
    testsFailed: 0,
    lessonsTaken: 0,
  });
  const [editMode, setEditMode] = useState({
    name: false,
    class: false,
    age: false,
  });
  const [tempData, setTempData] = useState({
    name: "",
    class: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user info and stats on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("No user found");
          return;
        }

        console.log("Logged in user:", user.email);

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        console.log("Fetched profile:", profile);

        const userInfo = {
          id: profile.id || "",
          name: profile.name || "",
          email: profile.email || user.email,
          class: profile.class || "",
          age: profile.age ? String(profile.age) : "",
        };

        setUserData(userInfo);
        setTempData({
          name: userInfo.name,
          class: userInfo.class,
          age: userInfo.age,
        });

        const { data: testsData, error: testsError } = await supabase
          .from("tests")
          .select("*", { count: "exact" })
          .eq("user_id", profile.id);

        const { data: passedTests, error: passedError } = await supabase
          .from("tests")
          .select("*", { count: "exact" })
          .eq("user_id", profile.id)
          .eq("status", "passed");

        const { data: failedTests, error: failedError } = await supabase
          .from("tests")
          .select("*", { count: "exact" })
          .eq("user_id", profile.id)
          .eq("status", "failed");

        const { data: lessonsData, error: lessonsError } = await supabase
          .from("lessons_taken")
          .select("*", { count: "exact" })
          .eq("user_id", profile.id);

        if (testsError || passedError || failedError || lessonsError) {
          throw testsError || passedError || failedError || lessonsError;
        }

        setStats({
          testsGiven: testsData?.length || 0,
          testsPassed: passedTests?.length || 0,
          testsFailed: failedTests?.length || 0,
          lessonsTaken: lessonsData?.length || 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (field: "name" | "class" | "age") => {
    setEditMode({ ...editMode, [field]: true });
    setMessage("");
  };

  const handleCancel = (field: "name" | "class" | "age") => {
    setEditMode({ ...editMode, [field]: false });
    setTempData({ ...tempData, [field]: userData[field] });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "class" | "age"
  ) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const handleSave = async (field: "name" | "class" | "age") => {
    try {
      setMessage("");
      const { error } = await supabase
        .from("users")
        .update({ [field]: tempData[field] })
        .eq("id", userData.id);

      if (error) throw error;

      setUserData({ ...userData, [field]: tempData[field] });
      setEditMode({ ...editMode, [field]: false });
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    } catch (err) {
      console.log(err);
      setMessage(`Failed to update ${field}.`);
    }
  };

  if (loading) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

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
        <h1 style={titleStyle}>Progress / Profile</h1>

        {message && <p style={messageStyle}>{message}</p>}

        {/* Name Field */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Full Name</label>
          {editMode.name ? (
            <div style={editContainerStyle}>
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handleChange(e, "name")}
                style={inputStyle}
              />
              <div style={buttonGroupStyle}>
                <button onClick={() => handleSave("name")} style={saveButtonStyle}>
                  Save
                </button>
                <button onClick={() => handleCancel("name")} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={staticContainerStyle}>
              <span style={staticTextStyle}>{userData.name || "Not set"}</span>
              <button onClick={() => handleEdit("name")} style={editButtonStyle}>
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Email Field (always static) */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Email</label>
          <div style={staticContainerStyle}>
            <span style={staticTextStyle}>{userData.email}</span>
          </div>
        </div>

        {/* Class Field */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Class</label>
          {editMode.class ? (
            <div style={editContainerStyle}>
              <input
                type="text"
                value={tempData.class}
                onChange={(e) => handleChange(e, "class")}
                style={inputStyle}
              />
              <div style={buttonGroupStyle}>
                <button onClick={() => handleSave("class")} style={saveButtonStyle}>
                  Save
                </button>
                <button onClick={() => handleCancel("class")} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={staticContainerStyle}>
              <span style={staticTextStyle}>{userData.class || "Not set"}</span>
              <button onClick={() => handleEdit("class")} style={editButtonStyle}>
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Age Field */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Age</label>
          {editMode.age ? (
            <div style={editContainerStyle}>
              <input
                type="number"
                value={tempData.age}
                onChange={(e) => handleChange(e, "age")}
                style={inputStyle}
              />
              <div style={buttonGroupStyle}>
                <button onClick={() => handleSave("age")} style={saveButtonStyle}>
                  Save
                </button>
                <button onClick={() => handleCancel("age")} style={cancelButtonStyle}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={staticContainerStyle}>
              <span style={staticTextStyle}>{userData.age || "Not set"}</span>
              <button onClick={() => handleEdit("age")} style={editButtonStyle}>
                Edit
              </button>
            </div>
          )}
        </div>

        <div style={statsContainerStyle}>
          <h3 style={statsHeadingStyle}>Progress Statistics:</h3>
          <div style={statsGridStyle}>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>Tests Given:</span>
              <span style={statValueStyle}>{stats.testsGiven}</span>
            </div>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>Tests Passed:</span>
              <span style={statValueStyle}>{stats.testsPassed}</span>
            </div>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>Tests Failed:</span>
              <span style={statValueStyle}>{stats.testsFailed}</span>
            </div>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>Lessons Taken:</span>
              <span style={statValueStyle}>{stats.lessonsTaken}</span>
            </div>
          </div>
        </div>

        <Link href="/dashboard" style={backLinkStyle}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

const boxStyle = {
  background: "rgba(255,255,255,0.2)",
  padding: "35px",
  borderRadius: "16px",
  maxWidth: "600px",
  width: "100%",
  backdropFilter: "blur(10px)",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "800",
  marginBottom: "25px",
  textAlign: "center" as const,
};

const messageStyle = {
  marginBottom: "15px",
  padding: "10px",
  background: "rgba(168, 255, 188, 0.3)",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const fieldContainerStyle = {
  marginBottom: "20px",
  textAlign: "left" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: "600",
  marginBottom: "6px",
  opacity: 0.9,
};

const staticContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255,255,255,0.15)",
  padding: "12px 16px",
  borderRadius: "8px",
};

const staticTextStyle = {
  fontSize: "1rem",
  fontWeight: "500",
};

const editContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  background: "white",
  color: "#333",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "8px",
};

const editButtonStyle = {
  padding: "6px 16px",
  background: "#a8ffbc",
  border: "none",
  borderRadius: "6px",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#333",
  cursor: "pointer",
};

const saveButtonStyle = {
  flex: 1,
  padding: "10px",
  background: "#a8ffbc",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#333",
  cursor: "pointer",
};

const cancelButtonStyle = {
  flex: 1,
  padding: "10px",
  background: "rgba(255,255,255,0.3)",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "700",
  color: "white",
  cursor: "pointer",
};

const statsContainerStyle = {
  marginTop: "30px",
  padding: "20px",
  background: "rgba(255,255,255,0.15)",
  borderRadius: "12px",
};

const statsHeadingStyle = {
  marginBottom: "15px",
  fontSize: "1.3rem",
  fontWeight: "700",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const statItemStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "4px",
};

const statLabelStyle = {
  fontSize: "0.9rem",
  opacity: 0.9,
};

const statValueStyle = {
  fontSize: "1.5rem",
  fontWeight: "700",
};

const backLinkStyle = {
  display: "inline-block",
  marginTop: "25px",
  color: "#a8ffbc",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "1.1rem",
};