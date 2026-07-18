import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../styles/sid.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import {
  FaUser,
  FaTractor,
  FaFileAlt,
  FaLock,
  FaBell,
  FaLanguage,
  FaSignOutAlt,
  FaCheckCircle,
  FaUpload,
  FaSeedling,
} from "react-icons/fa";

import { setUser, logout } from "../main";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.agri.user);
  const token = useSelector((state) => state.agri.token);
  const demoMode = useSelector((state) => state.agri.demoMode);
  const possessedDocs = useSelector((state) => state.agri.possessedDocs) || [];

  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form States
  const [profileForm, setProfileForm] = useState({
    name: user ? user.name : "Siddharth",
    phone: user ? (user.phone || "") : "9876543210",
    email: user ? user.email : "farmer@agrismart.com",
    district: user ? (user.district || "") : "Coimbatore",
    state: user ? (user.state || "") : "Tamil Nadu"
  });

  // Password Form States
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notifications State
  const [notifSettings, setNotifSettings] = useState({
    emailNotif: true,
    smsNotif: true
  });

  // Soil Health Card Parameters State
  const [soilForm, setSoilForm] = useState(() => {
    const saved = localStorage.getItem("soil_health_parameters");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      nitrogen: "90",
      phosphorus: "30",
      potassium: "50",
      ph: "6.5"
    };
  });

  const handleSoilChange = (e) => {
    setSoilForm({
      ...soilForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSoilSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("soil_health_parameters", JSON.stringify(soilForm));
    toast.success("Soil Health Card parameters saved successfully!");
  };

  // Documents list calculated from possessedDocs
  const checklistDocs = [
    { name: "Aadhaar Card", defaultDate: "12 Jun 2026" },
    { name: "Bank Passbook", defaultDate: "04 Jun 2026" },
    { name: "Land Records", defaultDate: "08 Jun 2026" },
    { name: "Soil Health Card", defaultDate: "10 Jun 2026" },
    { name: "Sowing Certificate", defaultDate: "14 Jun 2026" }
  ];

  const documents = checklistDocs.map(doc => {
    const isUploaded = possessedDocs.includes(doc.name);
    return {
      name: doc.name,
      status: isUploaded ? "Verified" : "Pending",
      uploaded: isUploaded ? doc.defaultDate : "-"
    };
  });

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: profileForm.name,
      phone: profileForm.phone,
      email: profileForm.email,
      district: profileForm.district,
      state: profileForm.state
    };

    try {
      if (!demoMode && token) {
        const res = await fetch("http://localhost:8081/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const updatedUser = await res.json();
          dispatch(setUser(updatedUser));
          toast.success("Profile updated successfully in database!");
          return;
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to update profile.");
          return;
        }
      }
    } catch (err) {
      console.warn("User service offline, updating locally.", err);
    }

    dispatch(setUser({ ...user, ...payload }));
    toast.success("Profile details updated locally (Demo Mode)!");
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    const payload = {
      name: profileForm.name,
      phone: profileForm.phone,
      email: profileForm.email,
      district: profileForm.district,
      state: profileForm.state,
      password: passwordForm.newPassword
    };

    try {
      if (!demoMode && token) {
        const res = await fetch("http://localhost:8081/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          toast.success("Password updated successfully in database!");
          setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
          return;
        } else {
          toast.error("Failed to change password.");
          return;
        }
      }
    } catch (err) {
      console.warn("User service offline. Simulating password change.", err);
    }

    toast.success("Password changed locally (Demo Mode)!");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "US";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const memberSince = user && user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString([], { month: "long", year: "numeric" })
    : "June 2026";

  return (
    <>
      <Navbar />
      <FloatingAI />

      <div className="profilePage">
        <div className="settingsContainer">
          {/* SIDEBAR */}
          <div className="settingsSidebar">
            <h2>Account Settings</h2>
            <button
              className={activeTab === "profile" ? "activeTab" : ""}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /> My Profile
            </button>
            <button onClick={() => navigate("/farm-management")}>
              <FaTractor /> My Farms
            </button>
            <button
              className={activeTab === "documents" ? "activeTab" : ""}
              onClick={() => setActiveTab("documents")}
            >
              <FaFileAlt /> Documents
            </button>
            <button
              className={activeTab === "soil" ? "activeTab" : ""}
              onClick={() => setActiveTab("soil")}
            >
              <FaSeedling /> Soil Health
            </button>
            <button
              className={activeTab === "security" ? "activeTab" : ""}
              onClick={() => setActiveTab("security")}
            >
              <FaLock /> Security
            </button>
            <button
              className={activeTab === "notifications" ? "activeTab" : ""}
              onClick={() => setActiveTab("notifications")}
            >
              <FaBell /> Notifications
            </button>
            <button
              className={activeTab === "language" ? "activeTab" : ""}
              onClick={() => setActiveTab("language")}
            >
              <FaLanguage /> Language
            </button>
            <button className="logoutSide" onClick={handleLogoutClick}>
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* CONTENT */}
          <div className="settingsContent">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="contentCard">
                <h1>My Profile</h1>
                <p>Manage your personal information.</p>
                <div className="profileTop">
                  <div className="avatar">{getInitials(profileForm.name)}</div>
                  <div>
                    <h2>{profileForm.name}</h2>
                    <span className="verified">
                      <FaCheckCircle /> Verified {user ? user.role.toLowerCase() : "farmer"}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleProfileSubmit} className="profileForm">
                  <div className="inputGroup">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>District</label>
                    <input
                      type="text"
                      name="district"
                      value={profileForm.district}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={profileForm.state}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Member Since</label>
                    <input value={memberSince} disabled />
                  </div>
                  <button className="saveBtn" type="submit">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div className="contentCard">
                <div className="sectionHeader" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <h1>Documents</h1>
                    <p>Manage all your uploaded documents.</p>
                  </div>
                  <button className="greenBtn" onClick={() => toast.info("Document upload dialog simulation.")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--primary)", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                    <FaUpload /> Upload Document
                  </button>
                </div>

                <div className="documentTable">
                  <div className="documentHead" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "12px", borderBottom: "2px solid #cbdcd0", fontWeight: "bold" }}>
                    <span>Document</span>
                    <span>Status</span>
                    <span>Uploaded</span>
                  </div>

                  {documents.map((doc, index) => (
                    <div className="documentRow" key={index} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "12px", borderBottom: "1px solid #e2f3e9", alignItems: "center" }}>
                      <div className="documentName" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FaFileAlt style={{ color: "var(--primary)" }} />
                        <strong>{doc.name}</strong>
                      </div>
                      <span className={`govStatusBadge ${doc.status.toLowerCase()}`} style={{ display: "inline-block", width: "fit-content", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", background: doc.status === "Verified" ? "#dcfce7" : "#fef3c7", color: doc.status === "Verified" ? "#16a34a" : "#d97706" }}>
                        {doc.status}
                      </span>
                      <span style={{ fontSize: "13px", color: "gray" }}>{doc.uploaded}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="contentCard">
                <h1>Security</h1>
                <p>Change your account password.</p>
                <form onSubmit={handleSecuritySubmit} className="profileForm">
                  <div className="inputGroup">
                    <label>Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordForm.oldPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button className="saveBtn" type="submit">
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div className="contentCard">
                <h1>Notifications</h1>
                <p>Configure notification preferences.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={notifSettings.emailNotif}
                      onChange={(e) => setNotifSettings({ ...notifSettings, emailNotif: e.target.checked })}
                    />
                    <span>Receive Email alerts for severe weather updates</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={notifSettings.smsNotif}
                      onChange={(e) => setNotifSettings({ ...notifSettings, smsNotif: e.target.checked })}
                    />
                    <span>Receive SMS notifications for newly matching Government Schemes</span>
                  </label>
                  <button className="saveBtn" onClick={() => toast.success("Notification settings updated!")} style={{ marginTop: "10px", width: "fit-content" }}>
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* LANGUAGE TAB */}
            {activeTab === "language" && (
              <div className="contentCard">
                <h1>Language</h1>
                <p>Select your preferred interface language.</p>
                <div style={{ marginTop: "20px" }}>
                  <select style={{ width: "200px", padding: "10px", border: "1px solid #cbdcd0", borderRadius: "8px" }} onChange={(e) => toast.success(`Interface switched to ${e.target.options[e.target.selectedIndex].text}`)}>
                    <option value="en">English (Default)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="pun">ਪੰਜਾਬੀ (Punjabi)</option>
                  </select>
                </div>
              </div>
            )}

            {/* SOIL HEALTH CARD PARAMETERS TAB */}
            {activeTab === "soil" && (
              <div className="contentCard">
                <h1>Soil Health</h1>
                <p>Configure parameters from your physical Soil Health Card for NPK calculations.</p>
                <form onSubmit={handleSoilSubmit} className="profileForm">
                  <div className="inputGroup">
                    <label>Available Nitrogen (N - kg/ha)</label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={soilForm.nitrogen}
                      onChange={handleSoilChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Available Phosphorus (P - kg/ha)</label>
                    <input
                      type="number"
                      name="phosphorus"
                      value={soilForm.phosphorus}
                      onChange={handleSoilChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Available Potassium (K - kg/ha)</label>
                    <input
                      type="number"
                      name="potassium"
                      value={soilForm.potassium}
                      onChange={handleSoilChange}
                      required
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Soil pH level (0 - 14)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="ph"
                      value={soilForm.ph}
                      onChange={handleSoilChange}
                      required
                    />
                  </div>
                  <button className="saveBtn" type="submit">
                    Save Soil Parameters
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}